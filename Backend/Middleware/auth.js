const jwt = require("jsonwebtoken");
const key = process.env.ACCESS_SECRET_TOKEN;

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1]; // Remove 'Bearer'
            const decodedToken = jwt.decode(token); // Decode token for debugging
            //console.log("Decoded Token:", decodedToken);

            const user = jwt.verify(token, key); // Verify the token
            //console.log("Verified User:", user); // Log the verified user

            if (!user.id) {
                return res.status(401).json({ message: "Invalid token, user ID missing" });
            }

            req.userId = user.id; // Assign userId from token
            
        } else {
            return res.status(401).json({ message: "Unauthorized user, token missing" });
        }
        next(); 
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized user, invalid token" });
    }
}

module.exports = auth;

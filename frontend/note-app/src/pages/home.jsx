import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";
import Toast from "../components/Toast";
import EmptyCard from "../components/EmptyCard";

export default function Home() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [toastMsg, setToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      data: noteDetails,
      type: "edit",
    });
  };
  const [isSearch, setIsSearch] = useState(false);
  const showToastmsg = (message, type) => {
    setToastMsg({
      isShown: true,
      message,
      type,
    });
  };
  const handleCloseToast = () => {
    setToastMsg({
      isShown: false,
      message: "",
    });
  };

  // get info of user
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user/getuser");

      if (response.data) {
        setUserInfo(response.data);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all notes calls
  const getAllnotes = async () => {
    try {
      const response = await axiosInstance.get("/note/getnote");
      if (response.data) {
        setAllNotes(response.data);
      }
    } catch (error) {
      console.log("unexpected error:" + error);
    }
  };

  // delete note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/note/deletenote/" + noteId);
      if (response.data) {
        showToastmsg("Note Deleted Successfully", "delete");
        getAllnotes();
      }
    } catch (error) {
      console.log(error);
      setToastMsg({ isShown: true, message: "Something went wrong", type: "error" });
    }
  };

  // Search for notes
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/note/searchnote", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllnotes();
  };

  // Pin/unpin note
  const pinNote = async (note) => {
    try {
      const response = await axiosInstance.put(`/note/updatepin/${note._id}`, {
        isPinned: !note.isPinned,
      });

      if (response.data) {
        showToastmsg(
          `Note ${!note.isPinned ? "Pinned" : "Unpinned"} Successfully`,
          "pin"
        );
        getAllnotes();
      }
    } catch (error) {
      console.error("Error pinning/unpinning note:", error);
      showToastmsg("Failed to update pin status", "error");
    }
  };

  useEffect(() => {
    getAllnotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
        showSearchBar={true}
      />

      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes.map((items) => (
              <NoteCard
                key={items._id}
                title={items.title}
                date={items.createOne}
                content={items.content}
                tags={items.tags}
                isPinned={items.isPinned}
                onEdit={() => handleEdit(items)}
                onDelete={() => deleteNote(items)}
                onPinNote={() => pinNote(items)}
              />
            ))}
          </div>
        ) : (
          // Without image, just message
          <EmptyCard message={"Please add a note"} />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400 hover:bg-pink-500 shadow-lg hover:shadow-xl transition-all duration-300 absolute right-10 bottom-10"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
        aria-label="Add Note"
        title="Add Note"
      >
        <MdAdd className="text-4xl text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        ContentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll "
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          getAllnotes={getAllnotes}
          showToastmsg={showToastmsg}
        />
      </Modal>
      <Toast isShown={toastMsg.isShown} message={toastMsg.message} type={toastMsg.type} onClose={handleCloseToast} />
    </>
  );
}

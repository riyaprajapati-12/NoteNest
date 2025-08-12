
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

export default function NoteCard({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) {
  return (
    <div className="border-2 border-yellow-300 rounded-lg p-4 bg-yellow-50 hover:shadow-lg transition-all ease-in-out ml-3 cartoon-font cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-base font-bold text-yellow-800">{title}</h6>
          <span className="text-xs text-yellow-600">{moment(date).format("Do MMM YYYY")}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn text-2xl cursor-pointer transition-colors ${
            isPinned ? "text-pink-500" : "text-yellow-300 hover:text-pink-400"
          }`}
          onClick={onPinNote}
          title={isPinned ? "Unpin Note" : "Pin Note"}
        />
      </div>
      <p className="text-sm text-yellow-700 mt-3">
        {content?.length > 60 ? content.slice(0, 60) + "..." : content}
      </p>
      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-yellow-500 space-x-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-yellow-200 px-2 py-0.5 rounded-full hover:bg-pink-200 transition">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-yellow-700">
          <MdCreate
            className="icon-btn text-xl cursor-pointer hover:text-green-600 transition"
            onClick={onEdit}
            title="Edit Note"
          />
          <MdDelete
            className="icon-btn text-xl cursor-pointer hover:text-red-500 transition"
            onClick={onDelete}
            title="Delete Note"
          />
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import TagInput from "../components/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../Utils/axiosInstance";

export default function AddEditNotes({ noteData, onClose, type, getAllnotes, showToastmsg }) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // ADD NOTE
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/note/createnote", {
        title,
        content,
        tags,
      });
      if (response.data) {
        showToastmsg("Note Added Successfully");
        getAllnotes();
        onClose();
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again!");
    }
  };

  // EDIT NOTE
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/note/editnote/" + noteId, {
        title,
        content,
        tags,
      });
      if (response.data) {
        showToastmsg("Note Updated Successfully");
        getAllnotes();
        onClose();
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again!");
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative p-6 bg-yellow-50 rounded-lg shadow-lg max-w-lg mx-auto cartoon-font">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 bg-white shadow-md hover:bg-pink-50 transition"
        onClick={onClose}
        aria-label="Close"
      >
        <MdClose className="text-xl text-pink-500" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="text-yellow-700 font-bold text-lg">TITLE</label>
        <input
          type="text"
          className="text-2xl text-yellow-900 outline-none border-2 border-yellow-300 rounded-md px-3 py-2 focus:border-pink-400 shadow-sm transition"
          placeholder="done work at 5 pm"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <label className="text-yellow-700 font-bold text-lg">CONTENT</label>
        <textarea
          className="text-sm text-yellow-900 outline-none bg-yellow-100 p-3 rounded-md border-2 border-yellow-300 focus:border-pink-400 shadow-sm transition resize-none"
          placeholder="Write your note content here..."
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-5">
        <label className="text-yellow-700 font-bold text-lg">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-600 text-sm pt-4">{error}</p>}

      <button
        className="btn-primary mt-6 w-full bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-pink-400 hover:to-yellow-400 text-white font-bold py-3 rounded-full shadow-lg transition"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
}

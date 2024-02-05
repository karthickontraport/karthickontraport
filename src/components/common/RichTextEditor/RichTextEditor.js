// Import necessary dependencies
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-mention";

const RichTextEditor = ({ onChange, initialValue, editorHeight }) => {
  const [editorData, setEditorData] = useState(initialValue);

  const handleEditorChange = (value) => {
    setEditorData(value);

    if (onChange) {
      onChange(value);
    }
  };

  // Define modules for font size and font color
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ header: [1, 2, 3, false] }],
        ["link", "image"],
        [{ color: [] }, { background: [] }], // Font color and background color
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
        ["code-block"],
      ],
    },
  };

  return (
    <div style={{ height: editorHeight }}>
      <ReactQuill
        value={editorData}
        onChange={handleEditorChange}
        style={{ height: "100%", position: "relative" }}
        modules={modules}
      />
    </div>
  );
};

export default RichTextEditor;

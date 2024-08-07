import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor({ value, id, onChange, className, placeholder }) {
    const colors = [
        '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff',
        '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb',
        '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888',
        '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444',
        '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'
    ];
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ color: colors }, { background: colors }],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "align",
        "color",
        "background",
    ];

    return (
        <ReactQuill
            className={`${className || ''} h-full bg-white`}
            id={id}
            placeholder={placeholder}
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={onChange}
        />
    );
}

export default TextEditor;

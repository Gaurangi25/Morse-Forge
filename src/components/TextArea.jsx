import React from "react";

function TextArea({value,onChange,placeholder,readOnly=false}) {
    return (
        <textarea
        className="textArea"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
        rows={5}
        />
    );
}

export default TextArea;
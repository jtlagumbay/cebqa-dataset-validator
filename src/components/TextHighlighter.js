import React, { useState, useEffect, useRef } from "react";

const TextHighlighter = ({ inputText, defaultText, onHighlightChange, defaultStartIndex, defaultEndIndex }) => {
  const [text, setText] = useState(inputText);
  const [highlightedText, setHighlightedText] = useState(defaultText);
  const [startIndex, setStartIndex] = useState(defaultStartIndex);
  const [endIndex, setEndIndex] = useState(defaultEndIndex);
  const textRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.innerText); // Get text content from the editable div
  };

  const handleHighlightText = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText) {
      const start = selection.anchorOffset;
      const end = selection.focusOffset;
      if(start < 0){
        start = 0
      }
      setStartIndex(start);
      setEndIndex(end);
      setHighlightedText(selectedText);
      onHighlightChange({
        "text": selectedText,
        "start_index": start,
        "end_index": end
      }); // Update the highlighted text in the parent
    }
  };

  const highlightSubstring = (text, substring) => {
    const parts = text.split(substring);
    // console.log(parts)
    if (parts.length > 1) {
      return (
        <>
          {parts[0]}
          <span style={{ backgroundColor: "yellow" }}>{substring}</span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  useEffect(() => {
    if (highlightedText) {
      var start = text.indexOf(highlightedText);
      var end = start + highlightedText.length;
      if(start < 0){
        start = 0
      }
      setStartIndex(start);
      setEndIndex(end);
      onHighlightChange({
        "text": highlightedText,
        "start_index": start,
        "end_index": end
      })
    }
  }, [highlightedText, text]);

  return (
    <div>
      <div
        ref={textRef}
        contentEditable={false}
        onInput={handleTextChange}
        onMouseUp={handleHighlightText}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "100px",
          background: "white",
        }}
      >
        {highlightSubstring(text, highlightedText)}
      </div>
      {startIndex !== -1 && endIndex !== -1 && (
        <div>
          <p>
            Highlighted Text: "{highlightedText}"<br />
            Starting Index: {startIndex}<br />
            Ending Index: {endIndex}
          </p>
        </div>
      )}
    </div>
  );
};

export default TextHighlighter;
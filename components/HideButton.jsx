import { useState } from "react";

function HideButton({
  CallbackUpdateText,
  content,
  setContent,
  deletePercent,
  savedContent,
  setSavedContent,
}) {
  function HideContent() {
    var newContent;
    console.log(savedContent);

    if (savedContent.blocks[0].text === "") {
      console.log("content is empty");
      const restoredSavedContent = JSON.parse(JSON.stringify(content));
      setSavedContent(restoredSavedContent);
      newContent = content.blocks;
    } else {
      setContent(savedContent);
      const restoredSavedContent = JSON.parse(JSON.stringify(savedContent));
      setSavedContent(restoredSavedContent);
      newContent = savedContent.blocks;
    }

    var paragraphWords = [];

    for (var i = 0; i < newContent.length; i++) {
      paragraphWords = newContent[i].text.split(" ");
      for (var j = 0; j < paragraphWords.length; j++) {
        //deletePercent / 100
        if (Math.random() < deletePercent / 100) {
          if (j > 0 && j < paragraphWords.length - 1)
            paragraphWords[j] = "_".repeat(paragraphWords[j].length);
        }

        newContent[i].text = paragraphWords.join(" ");
      }
    }

    setContent({ blocks: newContent, entityMap: {} });

    CallbackUpdateText();
  }

  return (
    <div>
      <button
        className="c-button"
        onClick={() => {
          HideContent();
        }}
      >
        Ocultar {deletePercent}%
      </button>
    </div>
  );
}

export default HideButton;

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
    //check if content exists

    if (
      !content ||
      !content.blocks ||
      !content.blocks[0] ||
      !content.blocks[0].text
    )
      return;

    if (savedContent.blocks[0].text === "") {
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
      var currentOffset = 0;
      for (var j = 0; j < paragraphWords.length; j++) {
        //deletePercent / 100
        if (Math.random() < deletePercent / 100) {
          if (j > 0 && j < paragraphWords.length - 1) {
            paragraphWords[j] = " ".repeat(paragraphWords[j].length);

            var wordLength = paragraphWords[j].length;
            newContent[i].inlineStyleRanges.push({
              offset: currentOffset,
              length: wordLength,
              style: "UNDERSCORES",
            });
          }
        }

        currentOffset += paragraphWords[j].length + 1;
      }

      newContent[i].text = paragraphWords.join(" ");
    }

    setContent({ blocks: newContent, entityMap: {} });

    CallbackUpdateText();
  }

  return (
    <button
      className="c-button"
      data-tooltip="Ocultar el numero de palabras especificado"
      onClick={() => {
        HideContent();
      }}
    >
      Ocultar
    </button>
  );
}

export default HideButton;

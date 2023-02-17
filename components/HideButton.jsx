import { useState } from "react";
import { useEffect } from "react";

function HideButton({
  CallbackUpdateText,
  content,
  setContent,
  deletePercent,
  savedContent,
  setSavedContent,
  hiddenContent,
  setHiddenContent,
}) {
  function HideContent() {
    //check if content exists
    var backupContent, newContent;

    if (
      !content ||
      !content.blocks ||
      !content.blocks[0] ||
      !content.blocks[0].text
    )
      return;

    if (savedContent.blocks[0].text === "") {
      const auxContentBackup1 = JSON.parse(JSON.stringify(content));
      const auxContentBackup2 = JSON.parse(JSON.stringify(content));
      setSavedContent(auxContentBackup1);
      newContent = content.blocks;
      backupContent = auxContentBackup2.blocks;
    } else {
      setContent(savedContent);
      const auxContentBackup1 = JSON.parse(JSON.stringify(savedContent));
      const auxContentBackup2 = JSON.parse(JSON.stringify(savedContent));
      setSavedContent(auxContentBackup1);
      newContent = savedContent.blocks;
      backupContent = auxContentBackup2.blocks;
    }

    var paragraphWords = [];

    for (var i = 0; i < newContent.length; i++) {
      paragraphWords = newContent[i].text.split(" ");
      var currentOffset = 0;
      for (var j = 0; j < paragraphWords.length; j++) {
        //deletePercent / 100
        if (Math.random() < deletePercent / 100) {
          if (j > 0 && j < paragraphWords.length - 1) {
            //AddHiddenWord(newContent[i].key, currentOffset, paragraphWords[j]);

            paragraphWords[j] = " ".repeat(paragraphWords[j].length);

            var wordLength = paragraphWords[j].length;
            newContent[i].inlineStyleRanges.push({
              offset: currentOffset,
              length: wordLength,
              style: "UNDERSCORES",
            });

            backupContent[i].inlineStyleRanges.push({
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

    setHiddenContent({ blocks: backupContent, entityMap: {} });
    setContent({ blocks: newContent, entityMap: {} });

    CallbackUpdateText();
  }

  /*
  function AddHiddenWord(blockKey, position, word) {
    setHiddenContent((hiddenContent) => [
      ...hiddenContent,
      { blockKey: blockKey, position: position, word: word },
    ]);
  }
  */

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

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
  var actualHiddenWords = [];

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
    actualHiddenWords = [];

    for (var i = 0; i < newContent.length; i++) {
      paragraphWords = newContent[i].text.split(" ");
      var currentOffset = 0;
      for (var j = 0; j < paragraphWords.length; j++) {
        //deletePercent / 100
        if (Math.random() < deletePercent / 100) {
          if (j > 0 && j < paragraphWords.length - 1) {
            //AddHiddenWord(newContent[i].key, currentOffset, paragraphWords[j]);

            //add the word to the array of hidden words
            actualHiddenWords.push(paragraphWords[j]);

            paragraphWords[j] = " ".repeat(paragraphWords[j].length);

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

    AddHiddenTooltips();
  }

  function AddHiddenTooltips() {
    //wait for the content to be rendered
    setTimeout(() => {
      var spans = document.querySelectorAll("span[data-offset-key]");
      var hidden = 0;
      for (var i = 0; i < spans.length; i++) {
        //remove the tooltip if it exists
        if (spans[i].getAttribute("data-tooltip")) {
          spans[i].removeAttribute("data-tooltip");
        }
        //if the span has a border-bottom style, add the tooltip
        if (spans[i].style.borderBottom) {
          spans[i].setAttribute("data-tooltip", actualHiddenWords[hidden]);
          hidden++;
        }
      }
    }, 100);
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

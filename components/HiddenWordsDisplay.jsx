import React, { useRef, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  ContentBlock,
  DraftHandleValue,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  ContentState,
  RawDraftContentState,
} from "draft-js";

function HiddenWordsDisplay({
  editorState,
  editorRef,
  content,
  hiddenContent,
  showHiddenContent,
}) {
  const blockPositions = [{}];

  /*
  useEffect(() => {
    console.log(hiddenContent);
    for (let i = 0; i < hiddenContent.length; i++) {
      var currentBlock = editorState
        .getCurrentContent()
        .getBlockForKey(hiddenContent[i].blockKey);

      if (currentBlock !== null && currentBlock.getText() !== "") {
        var wordXPos = currentBlock.getText();
      }
      
      if (currentBlock !== null) {
        blockPositions[i] = {
          xPos: props.editorState
            .getCurrentContent()
            .getBlockForKey(props.hiddenContent[i].blockKey)
            .getBoundingClientRect().left,
        };
        console.log(props.content);
      }

    }
  }, [hiddenContent, content]);
  */

  return (
    <>
      {showHiddenContent && hiddenContent.length > 1 && (
        <div>
          {hiddenContent.map((hiddenWord) => (
            //div with custom styling

            <div
              key={`${hiddenWord.blockKey}-${hiddenWord.position}`}
              style={{
                position: "absolute",
                left: "0",
                top: "0",
                backgroundColor: "white",
                zIndex: "100",
              }}
            >
              {hiddenWord.word}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/*
function hiddenContentDisplay(props) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const block = editor.props.editorState.getCurrentContent().getBlockForKey(props.hiddenContent[0].blockKey);
      const blockElement = document.querySelector(`[data-offset-key="${block.getKey()}-0-0"]`);

      const blockRect = blockElement.getBoundingClientRect();

      const words = block.getText().split(/\s+/);

      const gapPositions = words.reduce((positions, word, index) => {
        if (props.hiddenContent.some((hw) => hw.position === index)) {
          positions.push(index);
        }
        return positions;
      }, []);

      const lineHeight = blockRect.height / words.length;

      props.hiddenContent.forEach((hw) => {
        const gapIndex = gapPositions.indexOf(hw.position);
        const gapTop = blockRect.top + lineHeight * gapIndex;
        const gapLeft = blockRect.left;
        const wordElement = document.querySelector(`[data-offset-key="${hw.blockKey}-${hw.position}-0"]`);
        const wordRect = wordElement.getBoundingClientRect();

        const hiddenWordElement = document.createElement("div");
        hiddenWordElement.style.position = "absolute";
        hiddenWordElement.style.left = `${gapLeft + wordRect.left}px`;
        hiddenWordElement.style.top = `${gapTop}px`;
        hiddenWordElement.style.backgroundColor = "white";
        hiddenWordElement.style.zIndex = 100;
        hiddenWordElement.innerText = hw.word;

        document.body.appendChild(hiddenWordElement);
      });
    }
  }, [props.hiddenContent]);

  return (
    <div style={{ display: "none" }}>
      <Editor editorState={EditorState.createWithContent(ContentState.createFromText(props.text))} ref={editorRef} />
    </div>
  );
}
*/

export default HiddenWordsDisplay;

import React, { useState, useRef } from "react";
import { useEffect } from "react";
import HiddenWordsDisplay from "./HiddenWordsDisplay";

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
import "draft-js/dist/Draft.css";

import BlockStyleControls from "./BlockStyleControls";
import InlineStyleControls from "./InlineStyleControls";

const RTEditor = ({
  updateText,
  setUpdateText,
  content,
  setContent,
  savedContent,
  showHiddenContent,
  hiddenContent,
}) => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const hiddenEditorRef = useRef(null);
  const [hiddenEditorState, setHiddenEditorState] = useState(
    EditorState.createEmpty()
  );

  const styleMap = {
    UNDERSCORES: {
      color: "black",
      borderBottom: "2px solid #a3c9e8",
      borderRadius: "3px",
      transition: "all 0.5s ease",
    },
  };

  const hiddenStyleMap = {
    UNDERSCORES: {
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.45)",
      transition: "all 0.5s ease",
      outline: "3px solid rgba(0, 0, 0, 0.45)",
      borderRadius: "3px",
      top: "0",
    },
  };

  useEffect(() => {
    //grab content from savedContent and put it in the hiddenEditor
    if (hiddenContent !== null) {
      let newState = convertFromRaw(hiddenContent);
      let newEditorState = EditorState.createWithContent(newState);

      setHiddenEditorState(newEditorState);
    }
  }, [hiddenContent]);

  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (updateText === true && content !== null) {
      let newState = convertFromRaw(content);
      let newEditorState = EditorState.createWithContent(newState);
      setEditorState(newEditorState);
      setUpdateText(false);
    }
  }, [updateText]);

  const onChange = (state) => {
    setEditorState(state);
    setContent(convertToRaw(state.getCurrentContent()));
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      SkipGap();
      e.preventDefault();
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command, editorState, eventTimeStamp) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  function SkipGap(currentBlock = null) {
    const currentSelection = editorState.getSelection();

    if (currentBlock === null) {
      currentBlock = editorState
        .getCurrentContent()
        .getBlockForKey(currentSelection.getStartKey());
    } else {
      currentBlock = editorState
        .getCurrentContent()
        .getBlockForKey(currentBlock.getKey());
    }

    const currentBlockText = currentBlock.getText();
    const currentBlockKey = currentBlock.getKey();

    const currentBlockLength = currentBlock.getLength();
    const currentBlockSelection = currentSelection.getAnchorOffset();

    //get the next underscore position
    let nextUnderscorePosition = currentBlockText.indexOf(
      " ",
      currentBlockSelection
    );
    console.log(nextUnderscorePosition);

    if (nextUnderscorePosition !== -1) {
      //if there is an underscore in this block, move to it

      if (currentBlockSelection === nextUnderscorePosition) {
        var underscore_length = 0;
        var currentLetter;
        do {
          currentLetter = currentBlockText.charAt(
            nextUnderscorePosition + underscore_length
          );
          underscore_length++;
        } while (currentLetter === " " || currentLetter === " ");

        nextUnderscorePosition = currentBlockText.indexOf(
          " ",
          currentBlockSelection + underscore_length - 2
        );

        if (nextUnderscorePosition === -1) {
          CheckInOtherBlocks(currentBlockKey, currentSelection);
          return;
        }
      }

      var underscore_length = 0;
      var currentLetter;
      do {
        currentLetter = currentBlockText.charAt(
          nextUnderscorePosition + underscore_length
        );
        underscore_length++;
      } while (currentLetter === " " || currentLetter === " ");

      CreateSelection(
        currentSelection,
        nextUnderscorePosition,
        nextUnderscorePosition + underscore_length - 2
      );
    } else {
      CheckInOtherBlocks(currentBlockKey, currentSelection);
    }
  }

  function CheckInOtherBlocks(currentBlockKey, currentSelection) {
    //if there is no underscore in this block then
    //if there are more blocks, move to the next block
    const nextBlock = editorState
      .getCurrentContent()
      .getBlockAfter(currentBlockKey);

    if (nextBlock) {
      CreateSelection(
        currentSelection,
        0,
        0,
        nextBlock.getKey(),
        nextBlock.getKey()
      );
    } else {
      //else if there are no more blocks, move back to the first block
      const firstBlock = editorState
        .getCurrentContent()
        .getFirstBlock()
        .getKey();

      CreateSelection(currentSelection, 0, 0, firstBlock, firstBlock);
    }
  }
  function CreateSelection(
    currentSelection,
    start,
    end,
    anchorKey = null,
    focusKey = null
  ) {
    const newSelection = currentSelection.merge({
      anchorOffset: start,
      focusOffset: end,
      anchorKey: anchorKey ? anchorKey : currentSelection.getAnchorKey(),
      focusKey: focusKey ? focusKey : currentSelection.getFocusKey(),
    });

    SaveNewSelection(newSelection);
  }

  function SaveNewSelection(newSelection) {
    const newEditorState = EditorState.forceSelection(
      editorState,
      newSelection
    );

    onChange(newEditorState);
  }

  function PrintEditor() {
    return (
      <>
        {/*}
        <div
          className={`RichEditor-editor--floating RichEditor-editor ${
            showHiddenContent ? "RichEditor-editor--editing" : ""
          }  `}
        >
          {showHiddenContent && (
            <Editor
              ref={hiddenEditorRef}
              editorState={hiddenEditorState}
              placeholder="Escribe el tema que quieres memorizar..."
              blockStyleFn={(block) => getBlockStyle(block)}
              keyBindingFn={(e) => mapKeyToEditorCommand(e)}
              onChange={onChange}
              spellCheck={true}
              handleKeyCommand={handleKeyCommand}
              customStyleMap={hiddenStyleMap}
            />
          )}
        </div>
        */}

        <div
          className={`RichEditor-editor ${
            showHiddenContent ? "RichEditor-editor--editing" : ""
          }  `}
        >
          <Editor
            ref={editorRef}
            editorState={editorState}
            placeholder="Escribe el tema que quieres memorizar..."
            blockStyleFn={(block) => getBlockStyle(block)}
            keyBindingFn={(e) => mapKeyToEditorCommand(e)}
            onChange={onChange}
            spellCheck={true}
            handleKeyCommand={handleKeyCommand}
            customStyleMap={styleMap}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {/*
      <HiddenWordsDisplay
        editorState={editorState}
        editorRef={editorRef}
        content={content}
        savedContent={savedContent}
        showHiddenContent={showHiddenContent}
      />

    */}

      <div className="RichEditor-control-parent o-container o-container--fluid">
        <div className="o-container">
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
          />
        </div>
      </div>

      <div className="RichEditor-root">{PrintEditor()}</div>
    </>
  );
};

export default RTEditor;

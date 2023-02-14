import React, { useState, useRef } from "react";
import { useEffect } from "react";

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

const RTEditor = ({ updateText, setUpdateText, content, setContent }) => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

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
    //reset the content
    //setContent({ blocks: [], entityMap: {} });
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
      console.log("aaa");
      currentBlock = editorState
        .getCurrentContent()
        .getBlockForKey(currentBlock.getKey());
    }

    const currentBlockText = currentBlock.getText();
    const currentBlockKey = currentBlock.getKey();

    const currentBlockLength = currentBlock.getLength();
    const currentBlockSelection = currentSelection.getAnchorOffset();

    let nextUnderscorePosition = currentBlockText.indexOf(
      "_",
      currentBlockSelection
    );

    if (currentSelection.getAnchorOffset() === nextUnderscorePosition) {
      nextUnderscorePosition = currentBlockText.indexOf(
        "_",
        currentSelection.getAnchorOffset() + 4
      );
      moveToNextUnderscore(currentSelection, nextUnderscorePosition);
    }

    if (nextUnderscorePosition !== -1) {
      moveToNextUnderscore(currentSelection, nextUnderscorePosition);
    } else {
      //if there are more blocks, move to the next block
      const nextBlock = editorState
        .getCurrentContent()
        .getBlockAfter(currentBlockKey);

      if (nextBlock) {
        //move selection to the first character of the next block
        const newSelection = currentSelection.merge({
          anchorKey: nextBlock.getKey(),
          anchorOffset: 0,
          focusKey: nextBlock.getKey(),
          focusOffset: 0,
        });

        const newEditorState = EditorState.forceSelection(
          editorState,
          newSelection
        );

        onChange(newEditorState);
      } else {
        const firstBlock = editorState
          .getCurrentContent()
          .getFirstBlock()
          .getKey();
        const newSelection = currentSelection.merge({
          anchorKey: firstBlock,
          anchorOffset: 0,
          focusKey: firstBlock,
          focusOffset: 0,
        });

        const newEditorState = EditorState.forceSelection(
          editorState,
          newSelection
        );

        onChange(newEditorState);
      }
    }
  }

  function moveToNextUnderscore(currentSelection, nextUnderscorePosition) {
    const newSelection = currentSelection.merge({
      anchorOffset: nextUnderscorePosition,
      focusOffset: nextUnderscorePosition + 4,
    });

    const newEditorState = EditorState.forceSelection(
      editorState,
      newSelection
    );

    onChange(newEditorState);
  }

  function selectUntilNextUnderscore(currentSelection, nextUnderscorePosition) {
    var startingPosition = currentSelection.getAnchorOffset();
    var length = 0;
    var nextCharacter;

    while (nextCharacter !== "_") {
      nextCharacter = currentSelection.getAnchorOffset() + 1;
    }
  }

  return (
    <>
      <div className="RichEditor-control-parent">
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

      <div className="RichEditor-root">
        <div className="RichEditor-editor">
          <Editor
            ref={editorRef}
            editorState={editorState}
            placeholder="Escribe el tema que quieres memorizar..."
            customStyleMap={styleMap}
            blockStyleFn={(block) => getBlockStyle(block)}
            keyBindingFn={(e) => mapKeyToEditorCommand(e)}
            onChange={onChange}
            spellCheck={true}
            handleKeyCommand={handleKeyCommand}
          />
        </div>
      </div>
    </>
  );
};

export default RTEditor;

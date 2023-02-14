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
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return null;
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

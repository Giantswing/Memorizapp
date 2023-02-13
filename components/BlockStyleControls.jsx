import React from "react";
import { EditorState } from "draft-js";

import StyleButton from "./StyleButton";

const BLOCK_TYPES = [
  { label: "Titulo", style: "header-one" },
  //{ label: "H2", style: "header-two" },
  { label: "Subtitulo", style: "header-three" },
  //{ label: "H4", style: "header-four" },
  //{ label: "H5", style: "header-five" },
  //{ label: "H6", style: "header-six" },
  { label: "Cita", style: "blockquote" },
  { label: "Listado", style: "unordered-list-item" },
  { label: "Lista numérica", style: "ordered-list-item" },
  //{ label: "Code Block", style: "code-block" },
];

const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default BlockStyleControls;

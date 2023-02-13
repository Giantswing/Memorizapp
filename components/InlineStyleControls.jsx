import React from "react";
import PropTypes from "prop-types";
import { EditorState } from "draft-js";
import StyleButton from "./StyleButton";

const INLINE_STYLES = [
  { label: "Negrita", style: "BOLD" },
  { label: "Cursiva", style: "ITALIC" },
  { label: "Subrayado", style: "UNDERLINE" },
  //{ label: "Monospace", style: "CODE" },
];

const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

InlineStyleControls.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default InlineStyleControls;

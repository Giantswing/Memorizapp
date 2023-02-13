import React from "react";

const StyleButton = ({ active, style, label, onToggle }) => {
  const _onToggle = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  const className = "RichEditor-styleButton";

  return (
    <span
      className={className + `${active ? " RichEditor-activeButton" : ""}`}
      onClick={_onToggle}
    >
      {label}
    </span>
  );
};

export default React.memo(StyleButton);

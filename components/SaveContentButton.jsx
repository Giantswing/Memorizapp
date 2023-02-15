import { useState } from "react";

function SaveContentButton(props) {
  return (
    <div>
      <button
        className="c-button"
        data-tooltip="Guardar el texto actual"
        onClick={() => {
          props.UpdateSavedContent();
        }}
      >
        Guardar
      </button>
    </div>
  );
}

export default SaveContentButton;

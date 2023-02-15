import { useState } from "react";

function SaveContentButton({ saveContentCallback }) {
  return (
    <div>
      <button
        className="c-button"
        data-tooltip="Guardar el texto actual"
        onClick={() => {
          saveContentCallback();
        }}
      >
        Guardar
      </button>
    </div>
  );
}

export default SaveContentButton;

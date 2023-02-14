import { useState } from "react";

function SaveContentButton({ saveContentCallback }) {
  return (
    <div>
      <button
        className="c-button"
        onClick={() => {
          saveContentCallback();
        }}
      >
        Guardar Texto
      </button>
    </div>
  );
}

export default SaveContentButton;

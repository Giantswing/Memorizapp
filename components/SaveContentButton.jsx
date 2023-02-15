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
        Guardar
      </button>
    </div>
  );
}

export default SaveContentButton;

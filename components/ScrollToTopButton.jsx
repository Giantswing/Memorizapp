import { useState } from "react";

function ScrollToTopButton() {
  return (
    <div>
      <button
        className="c-button c-button--floating"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        Volver arriba
      </button>
    </div>
  );
}

export default ScrollToTopButton;

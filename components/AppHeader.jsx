import { useState } from "react";

function AppHeader() {
  const [deletePercent, setDeletePercent] = useState(5);

  return (
    <header className="app-header o-container o-container--fluid">
      <h1>Memorizapp</h1>

      <div className="app-header__options">
        <div className="app-header__options__delete-input">
          <input
            id="delete-input"
            type="number"
            value={deletePercent}
            onChange={(e) => setDeletePercent(e.target.value)}
          />
          %
        </div>

        <div className="app-header__options__delete-button">
          <button className="c-button" onClick={() => console.log("Delete")}>
            Ocultar {deletePercent}% de las palabras
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;

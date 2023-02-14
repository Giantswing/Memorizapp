import { useState } from "react";
import HideButton from "components/HideButton";
import SaveContentButton from "components/SaveContentButton";

function AppHeader({
  CallbackUpdateText,
  deletePercent,
  setDeletePercent,
  content,
  setContent,
  saveContentCallback,

  savedContent,
  setSavedContent,

  restoreSavedContentCallback,
}) {
  return (
    <header className="app-header o-container o-container--fluid">
      <div className="o-container">
        <div className="o-grid o-grid--between">
          <h1 className="o-grid__col u-2">Memorizapp</h1>

          <div className="app-header__options o-grid__col u-10">
            <div className="app-header__options__delete-input">
              <input
                id="delete-input"
                type="number"
                value={deletePercent}
                onChange={(e) => setDeletePercent(e.target.value)}
              />
              %
            </div>

            <HideButton
              content={content}
              setContent={setContent}
              deletePercent={deletePercent}
              CallbackUpdateText={CallbackUpdateText}
              saveContentCallback={saveContentCallback}
              savedContent={savedContent}
              setSavedContent={setSavedContent}
            />

            <SaveContentButton saveContentCallback={saveContentCallback} />

            <div>
              <button
                className="c-button"
                onClick={() => {
                  restoreSavedContentCallback();
                }}
              >
                Restaurar Texto
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;

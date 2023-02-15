import { useState } from "react";
import setDeletePercent from "components/HidePercentInput";
import HideButton from "components/HideButton";
import SaveContentButton from "components/SaveContentButton";
import HidePercentInput from "components/HidePercentInput";

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
        </div>
      </div>
    </header>
  );
}

export default AppHeader;

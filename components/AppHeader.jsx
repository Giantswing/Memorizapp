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
  const { version } = require("/package.json");
  return (
    <header className="app-header o-container o-container--fluid">
      <div className="o-container">
        <h1>
          Memorizapp <span>v{version}</span>
        </h1>
      </div>
    </header>
  );
}

export default AppHeader;

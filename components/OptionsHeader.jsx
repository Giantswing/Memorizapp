import { useState } from "react";
import HideButton from "components/HideButton";
import SaveContentButton from "components/SaveContentButton";
import HidePercentInput from "components/HidePercentInput";
import RestoreContentButton from "components/RestoreContentButton";

function OptionsHeader(props) {
  return (
    <div className="c-options o-container o-container--fluid">
      <div className="o-container">
        <HidePercentInput
          deletePercent={props.deletePercent}
          setDeletePercent={props.setDeletePercent}
        />
        <HideButton
          content={props.content}
          setContent={props.setContent}
          deletePercent={props.deletePercent}
          CallbackUpdateText={props.CallbackUpdateText}
          saveContentCallback={props.saveContentCallback}
          savedContent={props.savedContent}
          setSavedContent={props.setSavedContent}
        />

        <SaveContentButton saveContentCallback={props.saveContentCallback} />
        <RestoreContentButton
          restoreSavedContentCallback={props.restoreSavedContentCallback}
        />
      </div>
    </div>
  );
}

export default OptionsHeader;

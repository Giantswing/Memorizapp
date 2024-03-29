import { useState } from "react";
import HideButton from "components/HideButton";
import SaveContentButton from "components/SaveContentButton";
import HidePercentInput from "components/HidePercentInput";
import RestoreContentButton from "components/RestoreContentButton";
import CompareButton from "/components/CompareButton";
import InputCheckbox from "/components/InputCheckbox";

function OptionsHeader(props) {
  return (
    <div className="c-options o-container o-container--fluid">
      <div className="o-container">
        <HidePercentInput {...props} />
        <HideButton {...props} />
        <InputCheckbox {...props} />

        <span className="u-barely-visible">|</span>
        <SaveContentButton {...props} />
        <RestoreContentButton {...props} />
        <CompareButton {...props} />
      </div>
    </div>
  );
}

export default OptionsHeader;

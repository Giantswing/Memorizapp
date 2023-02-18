import { useState, useEffect } from "react";

function PopUpMessage(props) {
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    if (props.popUpMessageContent.text !== "") setShowPopUp(true);

    setTimeout(() => {
      setShowPopUp(false);
    }, 3500);
  }, [props.popUpMessageContent.forceUpdate]);

  return (
    <div
      className={`c-popup-message c-popup-message--${
        showPopUp ? "visible" : "hidden"
      } c-popup-message--${props.popUpMessageContent.type}`}
    >
      <div className="c-popup-message__text">
        {props.popUpMessageContent.text}
      </div>
    </div>
  );
}

export default PopUpMessage;

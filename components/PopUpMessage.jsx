import { useState, useEffect } from "react";

function PopUpMessage(props) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    let timeoutId;
    let shakeTimeoutId;
    if (props.popUpMessageContent.text !== "") {
      setShowPopUp(true);
      timeoutId = setTimeout(() => {
        setShowPopUp(false);
      }, 5000);
    }

    if (props.popUpMessageContent.type === "negative") {
      setIsShaking(true);
      shakeTimeoutId = setTimeout(() => {
        setIsShaking(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(shakeTimeoutId);
    };
  }, [props.popUpMessageContent.forceUpdate]);

  return (
    <div
      className={`c-popup-message c-popup-message--${
        showPopUp ? "visible" : "hidden"
      } c-popup-message--${props.popUpMessageContent.type} ${
        isShaking ? "c-popup-message--shake" : ""
      }`}
    >
      <div className="c-popup-message__text">
        {props.popUpMessageContent.text}
      </div>
    </div>
  );
}

export default PopUpMessage;

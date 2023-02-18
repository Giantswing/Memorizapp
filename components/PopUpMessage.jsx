import { useState, useEffect } from "react";

function PopUpMessage(props) {
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (props.popUpMessageContent.text !== "") {
      setShowPopUp(true);
      timeoutId = setTimeout(() => {
        setShowPopUp(false);
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
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

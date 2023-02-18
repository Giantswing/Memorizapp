import { useState, useEffect } from "react";

function InputCheckbox({ title, hideOptions, setHideOptions }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const index = hideOptions.findIndex((input) => input.title === title);
    setIsChecked(hideOptions[index].value);
  }, [hideOptions, title]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    const index = hideOptions.findIndex((input) => input.title === title);
    setHideOptions((prevState) => {
      const newState = [...prevState];
      newState[index].value = !isChecked;
      return newState;
    });
  };

  return (
    <div className="c-form-check">
      <input
        type="checkbox"
        className="c-form-check-input"
        name={title}
        id={title}
        checked={isChecked}
        onChange={handleOnChange}
      />
      <label className="c-form-check-label" htmlFor={title}>
        {hideOptions.find((input) => input.title === title)?.description}
      </label>
    </div>
  );
}

export default InputCheckbox;

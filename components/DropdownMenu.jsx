import { useState } from "react";

function DropdownMenu({ title, children, ...props }) {
  //a: `

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="c-dropdown-menu" {...props}>
      <button
        className="c-button"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        data-tooltip="Configuración de cómo se ocultan las palabras"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>

      <div
        className={`c-dropdown-menu__content c-dropdown-menu__content${
          isOpen ? "--visible" : "--hidden"
        }`}
      >
        {children}
      </div>

      {isOpen && (
        <div
          className="c-dropdown-menu__bg"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default DropdownMenu;

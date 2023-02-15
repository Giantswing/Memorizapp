function CompareButton(props) {
  return (
    <button
      data-tooltip="Comparar el texto actual con el texto guardado previamente"
      className="c-button"
      onClick={props.CompareContent}
    >
      Comparar
    </button>
  );
}

export default CompareButton;

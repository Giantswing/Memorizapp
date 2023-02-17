function CompareButton(props) {
  return (
    <button
      data-tooltip="Comparar el texto actual con el texto guardado previamente"
      className={`c-button ${
        props.showHiddenContent ? "c-button--toggle" : ""
      } `}
      onClick={() => {
        props.CompareContent();
        console.log(props.hiddenContent);
      }}
    >
      Comparar
    </button>
  );
}

export default CompareButton;

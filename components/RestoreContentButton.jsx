function RestoreContentButton(props) {
  return (
    <button
      className="c-button"
      data-tooltip="Restaurar texto guardado previamente"
      onClick={() => props.RestoreSavedContent()}
    >
      Restaurar
    </button>
  );
}

export default RestoreContentButton;

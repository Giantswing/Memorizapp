function RestoreContentButton(props) {
  return (
    <button
      className="c-button"
      onClick={() => props.restoreSavedContentCallback()}
    >
      Restaurar
    </button>
  );
}

export default RestoreContentButton;

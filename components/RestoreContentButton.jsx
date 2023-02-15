function RestoreContentButton(props) {
  return (
    <button
      className="c-button"
      onClick={() => props.restoreSavedContentCallback()}
    >
      Restaurar Texto
    </button>
  );
}

export default RestoreContentButton;

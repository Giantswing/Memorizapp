function HidePercentInput(props) {
  return (
    <div className="c-delete-input">
      <input
        id="delete-input"
        type="number"
        value={props.deletePercent}
        onChange={(e) => props.setDeletePercent(e.target.value)}
      />
      %
    </div>
  );
}

export default HidePercentInput;

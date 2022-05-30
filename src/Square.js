const Square = ({ id, value, onClick }) => {
  return (
    <button className="square" onClick={onClick} id={id}>
      {value}
    </button>
  );
};

export default Square;

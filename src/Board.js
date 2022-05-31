import { useState } from "react";

import Square from "./Square";

const Board = () => { 

  const [currentBoard, setCurrentBoard] = useState(Array(9).fill(null));
  const [nextPlayerIsX, setNextPlayerIsX] = useState(true);

  const determineWinner = (board) => {
    const winCases = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < winCases.length; i++) {
        let [a, b, c] = winCases[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]){
            winCases[i].forEach((id) => document.getElementById(id).style.color = 'green')       
            return board[a];
        }
    }
    return null;
}

  let winner = determineWinner(currentBoard);


  const handleClick = (id, e) => {
    if (winner || currentBoard[id]) return;
    e.target.value = nextPlayerIsX ? 'X' : 'O';
    let tempBoard = [...currentBoard]
    tempBoard[id] = e.target.value;
    setCurrentBoard(tempBoard);
    setNextPlayerIsX(!nextPlayerIsX)
  }

  const renderSquare = (i) => {
    return (
      <Square
        id={i}
        value={currentBoard[i]}
        onClick={(e) => handleClick(e.target.id, e)}
      />
    );
  };

  const gameIsADraw = () => {
    let isDraw = true
    currentBoard.forEach((square) => {
      if (!square) isDraw = false;
    })
    return isDraw
  }


  return (

    <div className='game'>
        <div className='game-info'> 
            {winner ? `${winner} wins!` : gameIsADraw() ? 'It\'s a draw' : nextPlayerIsX ? 'Next Player: X' : 'Next Player: O'}
        </div>
        <table className="game-board">
        <tbody>
            <tr className="board-row">
            <td> {renderSquare(0)} </td>
            <td> {renderSquare(1)} </td>
            <td> {renderSquare(2)} </td>
            </tr>
            <tr className="board-row">
            <td> {renderSquare(3)} </td>
            <td> {renderSquare(4)} </td>
            <td> {renderSquare(5)} </td>
            </tr>
            <tr className="board-row">
            <td> {renderSquare(6)} </td>
            <td> {renderSquare(7)} </td>
            <td> {renderSquare(8)} </td>
            </tr>
        </tbody>
        </table>
    </div>
  );
};

export default Board;
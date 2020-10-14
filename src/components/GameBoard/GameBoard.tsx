import React from 'react'
import { IGameBoard, ICoordinates } from '../../types'

import './GameBoard.styles.css' 

type IProps = {
  gameBoard: IGameBoard
  hitAttempt: (crd: ICoordinates) => void
}

const Square = (p: {
  status?: 'miss' | 'hit'
  coordinates: ICoordinates
  hitAttempt: (x: ICoordinates) => void
}) => {
  const handleClick = () => {
    if (!p.status) {
      p.hitAttempt(p.coordinates)
    }
  }

  return (
    <div className="GameBoard__square" onClick={handleClick}>
      {p.status}
    </div>
  )
}

export default function (p: IProps) {
  return (
    <div className="GameBoard">
      {p.gameBoard.map((row, y) => (
        <div className="GameBoard__row" key={y}>
          {row.map((square, x) => (
            <Square
              key={`${x}-${y}`}
              status={square.status}
              hitAttempt={p.hitAttempt}
              coordinates={[x, y]}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

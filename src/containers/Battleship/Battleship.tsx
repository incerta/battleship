import React, { useState } from 'react'
import { mapLayoutData, makePlayerInitState } from '../../battleship-api'
import layoutData from '../../fixtures/layout-data'
import GameBoard from '../../components/GameBoard/GameBoard'
import './Battleship.styles.css'

import { ICoordinates } from '../../types'

const MOCK_PLAYER_INIT_STATE = makePlayerInitState(mapLayoutData(layoutData))

export default function () {
  const [state, setState] = useState(MOCK_PLAYER_INIT_STATE)
  const hitAttempt = (crd: ICoordinates) => {}

  return (
    <div className="Battleship">
      <GameBoard gameBoard={state.gameBoard} hitAttempt={hitAttempt} />
    </div>
  )
}

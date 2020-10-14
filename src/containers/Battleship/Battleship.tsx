import React, { useState } from 'react'
import * as api from '../../battleship-api'
import layoutData from '../../fixtures/layout-data'

import GameBoard from '../../components/GameBoard/GameBoard'
import ScoreArea from '../../components/ScoreArea/ScoreArea'
import ShipInfoArea from '../../components/ShipInfoArea/ShipInfoArea'

import './Battleship.styles.css'

import { ICoordinates } from '../../types'

const MOCK_PLAYER_INIT_STATE = api.makePlayerInitState(api.mapLayoutData(layoutData))

export default function () {
  const [state, setState] = useState(MOCK_PLAYER_INIT_STATE)

  const hitAttempt = (crd: ICoordinates) => {
    const updatedState = api.hitAttempt(state, crd)
    setState(updatedState)
  }

  if (state.isWin) {
    return <div>You won!</div>
  }

  return (
    <div className="Battleship">
      <div>
        <ScoreArea score={state.score} />
        <ShipInfoArea ships={state.ships} />
      </div>
      
      <GameBoard gameBoard={state.gameBoard} hitAttempt={hitAttempt} />
    </div>
  )
}

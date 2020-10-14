import React, { useState } from 'react'
import * as api from '../../battleship-api'
import layoutData from '../../fixtures/layout-data'

import GameBoard from '../../components/GameBoard/GameBoard'
import ScoreArea from '../../components/ScoreArea/ScoreArea'

import './Battleship.styles.css'

import { ICoordinates } from '../../types'

const MOCK_PLAYER_INIT_STATE = api.makePlayerInitState(api.mapLayoutData(layoutData))

export default function () {
  const [state, setState] = useState(MOCK_PLAYER_INIT_STATE)

  const hitAttempt = (crd: ICoordinates) => {
    const updatedState = api.hitAttempt(state, crd)
    setState(updatedState)
  }

  return (
    <div className="Battleship">
      <ScoreArea score={state.score} />
      <GameBoard gameBoard={state.gameBoard} hitAttempt={hitAttempt} />
    </div>
  )
}

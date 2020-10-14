import React from 'react'
import './ScoreArea.styles.css'

type IProps = {
  score: number
}

const Player = (p: { name: string; score: number; bgColor?: string }) => {
  return (
    <div style={{ backgroundColor: p.bgColor }} className="ScoreArea__player">
      <div className="ScoreArea__score">{p.score}</div>
      <div className="ScoreArea__name">{p.name}</div>
    </div>
  )
}

export default function (p: IProps) {
  return (
    <div className="ScoreArea">
      <Player name="player 1" score={p.score} />
      <Player name="player 2" score={0} />
    </div>
  )
}

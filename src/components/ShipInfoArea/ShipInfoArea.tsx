import React from 'react'
import './ShipInfoArea.styles.css'

import { IShip } from '../../types'

const ShipDamageIndicator = (p: { damage: boolean[] }) => {
  return (
    <div className="DamageIndicator">
      {p.damage.map((isDamaged, idx) => (
        <div className="DamageIndicator__item" key={idx}>
          {isDamaged ? 'X' : '0'}
        </div>
      ))}
    </div>
  )
}

const Ship = (p: IShip) => {
  const damage = p.parts.map(({ damaged }) => damaged)

  return (
    <div className="Ship">
      <div className="Ship__img">{p.type}</div>
      <div className="Ship__damage-indicator">
        <ShipDamageIndicator damage={damage} />
      </div>
    </div>
  )
}

export default function (p: { ships: IShip[] }) {
  return (
    <div className="ShipInfoArea">
      {p.ships.map((ship, idx) => (
        <Ship {...ship} key={idx} />
      ))}
    </div>
  )
}

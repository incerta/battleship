import { IShip, IPlayerState, ILayoutDataDTO, ICoordinates, IGameBoard } from './types'

export const mapLayoutData = (data: ILayoutDataDTO): IShip[] =>
  data.layout.map((s, shipIdx) => ({
    type: s.ship,
    parts: s.positions.map((crd) => ({ crd, shipIdx, damaged: false })),
  }))

const compareCoordinates = (left: ICoordinates, right: ICoordinates): boolean =>
  left[0] === right[0] && left[1] === right[1]

const INITIAL_BOARD = Array.from({ length: 10 }).map(() =>
  Array.from({ length: 10 }, () => undefined)
)

export const makePlayerInitState = (ships: IShip[]): IPlayerState => {
  const allShipParts = ships.map(({ parts }) => parts).flat()
  const gameBoard = INITIAL_BOARD.map((row, y) =>
    row.map((_, x) => {
      const shipIdx = allShipParts.find(({ crd }) => compareCoordinates(crd, [x, y]))?.shipIdx
      return { shipIdx }
    })
  ) as IGameBoard

  return {
    gameBoard,
    ships,
    score: 0,
    isWin: false,
  }
}

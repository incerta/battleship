import {
  IShip,
  IPlayerState,
  ILayoutDataDTO,
  ICoordinates,
  IGameBoard,
  IShipPart,
} from './types'

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
      const shipIdx = allShipParts.find(({ crd }) => compareCoordinates(crd, [x, y]))
        ?.shipIdx
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

const getHitShipIdx = (ships: IShip[], c: ICoordinates): undefined | number => {
  const allShipParts = ships.map(({ parts }) => parts).flat()
  return allShipParts.find(({ crd }) => compareCoordinates(crd, c))?.shipIdx
}

const applyGameBoardSquareStatus = (
  board: IGameBoard,
  c: ICoordinates,
  status: 'hit' | 'miss'
): IGameBoard => {
  return board.map((row, y) => {
    return row.map((square, x) => {
      const isTargetSquare = compareCoordinates(c, [x, y])

      if (!isTargetSquare) {
        return square
      }

      return { ...square, status }
    })
  }) as IGameBoard
}

const applyShipDamage = (
  enemyShips: IShip[],
  shipIdx: number,
  c: ICoordinates
): IShip[] => {
  const damagedPartIdx = enemyShips[shipIdx].parts.findIndex(({ crd }) =>
    compareCoordinates(crd, c)
  )

  const applyPartDamage = (parts: IShipPart[]): IShipPart[] =>
    parts.map((p, idx) => (idx === damagedPartIdx ? { ...p, damaged: true } : p))

  return enemyShips.map((ship, idx) =>
    shipIdx !== idx ? ship : { ...ship, parts: applyPartDamage(ship.parts) }
  )
}

export const checkWinGameCondition = (enemyShips: IShip[], score: number) => {
  const requiredWinScore = enemyShips.map((s) => s.parts).length
  return score >= requiredWinScore
}

export const hitAttempt = (state: IPlayerState, c: ICoordinates): IPlayerState => {
  const shipIdx = getHitShipIdx(state.ships, c)
  const gameBoard = applyGameBoardSquareStatus(
    state.gameBoard,
    c,
    shipIdx ? 'hit' : 'miss'
  )

  if (!shipIdx) {
    return { ...state, gameBoard }
  }

  const score = state.score + 1
  const ships = applyShipDamage(state.ships, shipIdx, c)
  const isWin = checkWinGameCondition(ships, score)

  return { gameBoard, score, ships, isWin }
}

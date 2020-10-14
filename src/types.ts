export type IShipType = 'aircraft' | 'battleship' | 'carrier' | 'cruiser' | 'submarine'
export type ICoordinates = Readonly<[number, number]>

export type ILayoutDataDTO = {
  shipTypes: {[k in IShipType]?: { size: number, count: number }}
  layout: Array<{ ship: IShipType, positions: ICoordinates[] }>
}

export type IGameSquare = Readonly<{ status?: 'miss' | 'hit'; shipIdx?: number }>
type X = IGameSquare
type Y = [X, X, X, X, X, X, X, X, X, X]
export type IGameBoard = [Y, Y, Y, Y, Y, Y, Y, Y, Y, Y]

export type IShipPart = Readonly<{ crd: ICoordinates, damaged: boolean, shipIdx: number }>

export type IShip = Readonly<{
  type: IShipType
  parts: IShipPart[]
}>

export type IPlayerState = Readonly<{
  ships: IShip[]
  score: number 
  gameBoard: IGameBoard
  isWin: boolean
}>

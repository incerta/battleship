export type IShipType = 'aircraft' | 'battleship' | 'carrier' | 'cruiser' | 'submarine'
export type ICoordinates = Readonly<[number, number]>

export type ILayoutDataDTO = {
  shipTypes: {[k in IShipType]?: { size: number, count: number }}
  layout: Array<{ ship: IShipType, positions: ICoordinates[] }>
}

export type IGameSquare = Readonly<{ status?: 'miss' | 'hit'; shipIdx?: number }>
type X = IGameSquare
type Y = Readonly<[X, X, X, X, X, X, X, X, X, X]>
export type IGameBoard = Readonly<[Y, Y, Y, Y, Y, Y, Y, Y, Y, Y]>

export type IShipPart = Readonly<{ crd: ICoordinates, damaged: boolean }>

export type IShip = Readonly<{
  type: IShipType
  parts: IShipPart[]
}>

export type PlayerState = Readonly<{
  ships: IShip[]
  score: number 
  gameBoard: IGameBoard
  isWin: boolean
}>

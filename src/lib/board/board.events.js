import {
  board,
  Grid
} from './board'
import {render} from '../../index'


export const boardMousemove = event => {
  let newMouseHex = Grid.pointToHex(event.layerX, event.layerY)

  if (
    newMouseHex.x !== board.mouseHex.x ||
    newMouseHex.y !== board.mouseHex.y
  ) {
    Object.assign(board.mouseHex, newMouseHex)
    requestAnimationFrame(render)
  }
}

export const boardClick = event => {
  const clickHex = board.grid.get(Grid.pointToHex(event.layerX, event.layerY))
  // if (clickHex) {
  //   const point = clickHex.toPoint()
  //   // const corners = clickHex.corners().map(corner => corner.add(point))
  //   console.log('clickHex:', clickHex/*, clickHex && corners*/)
  // }

  if (
    !clickHex ||
    !board.scenario.hexes.find(wHex => wHex.x === clickHex.x && wHex.y === clickHex.y)
  ) {
    return
  }

  board.playerHex = (
    board.playerHex &&
    clickHex.x === board.playerHex.x &&
    clickHex.y === board.playerHex.y
  )
    ? null
    : clickHex

  requestAnimationFrame(render)
}
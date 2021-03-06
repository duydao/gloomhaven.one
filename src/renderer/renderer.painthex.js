import {drawHex}    from './renderer.functions'
import {board}      from '../board/board'
import {isInSight}  from '../lib/isInSight'


export const paintMouseHex = ctx => {
  if (board.mouseHex && board.mouseHex.x) {
    drawHex(board.mouseHex)

    const style = board.style
    const isScenarioHex = board.scenario.hexes.has(board.mouseHex)

    if (isScenarioHex && style.hexHover) {
      ctx.fillStyle = style.hexHover
    } else if (style.noHexHover) {
      ctx.fillStyle = style.noHexHover
    }

    ctx.fill()
  }
}

export const paintPlayer = ctx => {
  if (board.playerHex) {
    drawHex(board.playerHex)
    ctx.fillStyle = '#00f8'
    ctx.fill()

    board.linesToHover = isInSight(board.playerHex, board.mouseHex, true)
  }
}

export const paintFocusHexes = ctx => {
  if (
    board.focusInfo &&
    board.focusInfo.focusHexesVisible
  ) {
    ctx.fillStyle = '#ff04'

    board.focusInfo.focusHexes.forEach(hex => {
      drawHex(hex)
      ctx.fill()
    })
  }
}

export const paintMoveHexes = ctx => {
  if (
    board.focusInfo &&
    board.focusInfo.moveHexesVisible
  ) {
    ctx.fillStyle = '#0f03'

    board.focusInfo.moveHexes.forEach(hex => {
      drawHex(hex)
      ctx.fill()
    })
  }
}

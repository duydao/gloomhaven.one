import {
  board,
  cornersCoordinates,
}                 from '../board/board'
import {hexSize}  from '../board/board.constants'
import {
  gridGet,
  toPoint
}                 from './hexUtils'


export const getCornerOffset = (x, y, c) => {
  let hex = gridGet({x, y}, board.grid)
  let point = toPoint(hex)
  let corners = cornersCoordinates.map(c => c.add(point))

  let centerx = 0
  let centery = 0

  corners.forEach(c => {
    centerx += c.x
    centery += c.y
  })

  centerx /= 6
  centery /= 6

  const extraWallDistance = hexSize / 30

  let dx = centerx - corners[c].x
  let dy = centery - corners[c].y
  let hypotenuseExtended = Math.sqrt(dx ** 2 + dy ** 2) + extraWallDistance

  let nx
  let ny
  let offsetX = hypotenuseExtended * Math.sin(Math.PI / 6) / Math.sin(Math.PI / 2)
  let offsetY = hypotenuseExtended * Math.sin(Math.PI / 3) / Math.sin(Math.PI / 2)

  switch (c) {
    case 0:
      nx = corners[c].x + extraWallDistance
      ny = centery
      break
    case 1:
      nx = centerx + offsetX
      ny = centery + offsetY
      break
    case 2:
      nx = centerx - offsetX
      ny = centery + offsetY
      break
    case 3:
      nx = corners[c].x - extraWallDistance
      ny = centery
      break
    case 4:
      nx = centerx - offsetX
      ny = centery - offsetY
      break
    case 5:
      nx = centerx + offsetX
      ny = centery - offsetY
      break
  }
  return {x: nx, y: ny}
}

import {joinAsNames}    from './monsters.focus.functions'
import {monsterValues}  from '../monsters.controls'
import {
  genders,
  playerNames
}                       from '../monsters.items'
import {board}          from '../../board/board'
import {getPath}        from '../../lib/getPath'


export const filterInShortestPaths = (monster, focus, paths, players) => {
  let message = ''

  if (paths[0].hasTraps) {
    let trapCount = paths[0].filter(hex => hex.isTrap).length
    message += `There are no safe paths to ${
      players.length === 1
        ? 'the enemy'
        : 'enemies'
    }. By travelling through ${
      trapCount === 1
        ? 'a single trap'
        : `${trapCount}&nbsp;traps`
    }, `
  }

  message += `I have path to <a href="#" id="fih">${
    paths.length === 1
      ? 'a single hex'
      : `${paths.length}&nbsp;hexes`
  }</a> where I could make an attack.`

  focus.messages.push(message)

  if (paths.length > 1) {
    const shortestDistance = paths.reduce(((previousValue, currentPathArray) => (
      !previousValue || currentPathArray.pathLength < previousValue
        ? currentPathArray.pathLength
        : previousValue
    )), false)

    const allPathsLength = paths.length
    const shortestPaths = paths.filter(p => p.pathLength === shortestDistance)
    paths.length = 0
    paths.push(...shortestPaths)

    board.focusInfo.paths = paths
    board.focusInfo.pathStart = monster.ch

    if (allPathsLength === paths.length) {
      focus.messages.push(
        `<a href="#" id="fip">${
          allPathsLength === 2
            ? 'Both'
            : 'All'
        } of these paths</a> takes the same amount of movement points.`
      )
    } else {
      focus.messages.push(
        `<a href="#" id="fip">The shortest ${
          paths.length === 1
            ? 'path'
            : `${paths.length} paths`
        }</a> requires ${shortestDistance}&nbsp;movement point${
          shortestDistance > 1 ? 's' : ''
        }.`
      )
    }
  }
}

export const checkTargetsFromPaths = (monster, focus, paths, proximities) => {
  let pathTargets = new Set()
  paths.forEach(path => {
    path.targets.forEach(pathTarget => pathTargets.add(pathTarget))
  })

  if (pathTargets.size === 1) {
    focus.player = paths[0].targets[0]
    focus.messages.push(`The focus is the ${playerNames[focus.player.color]}.`)
    return
  }

  focus.messages.push(`${
    paths.length === 1
      ? 'This path'
      : 'These paths'
  } takes me ${
    monsterValues.range ? 'within range' : ''
  } to the ${joinAsNames([...pathTargets])}.`)

  let shortestProxPath = 999

  pathTargets.forEach(pathTarget => {
    let proxPath = getPath(monster.ch, pathTarget.ch, [], true)
    proximities.push({
      distance: proxPath.length,
      target: pathTarget
    })

    if (proxPath.length < shortestProxPath) {
      shortestProxPath = proxPath.length
    }
  })

  const proximitiesBefore = proximities.length
  const shortestProximities = proximities.filter(p => p.distance === shortestProxPath)

  proximities.length = 0
  proximities.push(...shortestProximities)

  if (proximities.length === 1) {
    focus.player = proximities[0].target
    focus.messages.push(`The focus is the ${
      playerNames[focus.player.color]
    } because ${
      genders[focus.player.color]
    } is the closest target.`)
    return
  }

  focus.messages.push(`${
    proximities.length === proximitiesBefore
      ? proximitiesBefore === 2
        ? 'Both'
        : 'All'
      : proximities.length
  } of them are at equally close in proximity.`)
}

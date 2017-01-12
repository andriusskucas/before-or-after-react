import { combineReducers } from 'redux'
import leaderboardReducer from './leaderboard-reducer'
import gameReducer from './game-reducer'
import appReducer from './app-reducer'

const combinedReducers = combineReducers({
    leaderboardState: leaderboardReducer,
    gameState: gameReducer,
    appState: appReducer,
})

export default combinedReducers
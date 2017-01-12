import * as appActions  from './app-actions'

export function loadGame(){
    return {
        type: 'GAME_LOAD_START'
    }
}

export function initGame(responseData){
    return {
        type: 'GAME_INIT',
        payload: responseData
    }
}

export function waitToStart(){
    return {
        type: 'CHANGE_STATUS',
        payload: 'WAITING_TO_START'
    }
}

export function startGame(){

    return function (dispatch) {
        dispatch(gameReduceTime())
        dispatch(gameNextQuestion())
        dispatch({
            type: 'CHANGE_STATUS',
            payload: 'IN_PROGRESS'
        })
    }
}

export function saveAnswer(id, answer){
    return {
        type: 'GAME_SAVE_ANSWER',
        payload: {id, answer}
    }
}

export function gameNextQuestion(){
    return {
        type: 'GAME_NEXT_QUESTION'
    }
}

export function gameReduceTime(){
    return {
        type: 'GAME_REDUCE_TIME'
    }
}

export function gameFinish(){

    return (dispatch) => {
        dispatch({
            type: 'CHANGE_STATUS',
            payload: 'FINISHED'
        })
        dispatch(appActions.turnLoaderOn('Skaičiuojamas rezultatas'))
        dispatch(appActions.loadAppScreen('END'))
    }
}

export function gameQuit(){
    return {
        type: 'GAME_QUIT'
    }
}

export function loadLeaderboard(){
    return {
        type: 'LOAD_LEADERBOARD_START'
    }
}

export function openLeaderboard(responseData){

    return {
        type: 'LOAD_LEADERBOARD_FINISH',
        payload: responseData
    }
}

export function closeLeaderboard(){
    return {
        type: 'CLOSE_LEADERBOARD'
    }
}
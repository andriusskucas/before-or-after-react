import initialState from '../app-state'

export default function leaderboardReducer(state = initialState.leaderboardState
    , action) {

    switch (action.type) {
        case 'LOAD_LEADERBOARD_START': {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                loadingMessage: 'Kraunamas turnyrinės lentelės turinys.'
            })
            break
        }

        case 'LOAD_LEADERBOARD_FINISH': {
            return Object.assign({}, state, {
                displayLeaderboard: true,
                leaders: action.payload.leaders
            })
            break
        }

        case 'CLOSE_LEADERBOARD': {
            return Object.assign({}, state, {
                displayLeaderboard: false,
            })
            break
        }

        default:
            return state;
    }
}
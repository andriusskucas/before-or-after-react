import initialState from '../app-state'

export default function gameReducer(state = initialState.gameState
    , action) {

    switch (action.type) {
        case 'GAME_INIT': {
            return Object.assign({}, state,
                action.payload
            )
            break
        }

        case 'CHANGE_STATUS': {
            return Object.assign({}, state,
                { gameStatus: action.payload }
            )
            break
        }

        case 'GAME_REDUCE_TIME': {

            let timeLeft = state.timeLeft === null ? state.time : state.timeLeft - 1


            return Object.assign({}, state, {
                timeLeft: timeLeft,
            })
            break
        }

        case 'GAME_NEXT_QUESTION': {

            let currentQuestion = state.currentQuestion === 0 ? 1 : state.currentQuestion + 1
            let questionsCount = state.questions.length
            let currentQuestionName = state.questions[currentQuestion - 1].name

            return Object.assign({}, state, {
                currentQuestion,
                questionsCount,
                currentQuestionName,
            }, action.payload)
            break
        }

        case 'GAME_SAVE_ANSWER' :{

            const answers = state.answers.concat([action.payload])
            return Object.assign({}, state, {
                answers
            }, action.payload)
            break
        }

        default:
            return state;
    }
}
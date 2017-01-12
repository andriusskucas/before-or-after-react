import initialState from '../app-state'

export default function appReducer(state = initialState.appState
    , action) {

    switch (action.type) {
        case 'OPEN_APP_SCREEN': {
            return Object.assign({}, state, {
                window: action.payload
            })
            break
        }

        case 'TURN_LOADER_ON': {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                loadingMessage: action.payload
            })
            break
        }

        case 'TURN_LOADER_OFF': {
            return Object.assign({}, state, {
                loading: false,
                loadingMessage: '',
            })
            break
        }

        case 'MODAL_OPEN': {
            return Object.assign({}, state, {
                openModal: true,
                modalToOpen: action.payload
            })
            break
        }

        case 'MODAL_CLOSE': {
            return Object.assign({}, state, {
                openModal: false,
            })
            break
        }

        default:
            return state;
    }
}
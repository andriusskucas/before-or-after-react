export function loadAppScreen (screen){
    return {
        type: 'OPEN_APP_SCREEN',
        payload: screen
    }
}

export function turnLoaderOn (loadingText){
    return {
        type: 'TURN_LOADER_ON',
        payload: loadingText
    }
}


export function turnLoaderOff (){
    return {
        type: 'TURN_LOADER_OFF'
    }
}


export function openModal (modal){
    return {
        type: 'MODAL_OPEN',
        payload: modal
    }
}

export function closeModal (){
    return {
        type: 'MODAL_CLOSE'
    }
}


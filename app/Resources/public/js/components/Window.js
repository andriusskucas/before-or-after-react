import React from 'react'
import WindowIntro from './windows/WindowIntro'
import WindowGame from './windows/WindowGame'

export default function Window(props) {

    switch (props.window) {
        case 'INTRO':

            return <WindowIntro />

        case 'GAME':

            return <WindowGame />
        default:
            return <WindowIntro />
    }
}
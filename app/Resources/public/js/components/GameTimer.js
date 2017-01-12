import React from 'react'

class GameTimer extends React.Component {

    render() {
        return (
            <div className="timer">
                <span className="time-icon"></span>
                <span className="timer-content">{ this.props.timeleft }s</span>
            </div>
        )
    }

}

export default GameTimer
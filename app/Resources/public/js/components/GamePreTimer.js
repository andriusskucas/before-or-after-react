import React from 'react'
import store from '../app-store'
import * as gameActions  from '../actions/game-actions'

class GamePreTimer extends React.Component {

    constructor(props) {
        super(props)

        this.timer = null;


        this.state = {
            timeleft: 3
        }

        this.startGame = this.startGame.bind(this)
    }


    componentWillMount() {
        this.recalculateTime()
    }

    recalculateTime() {

        clearTimeout(this.timer);

        if (this.state.timeleft > 0) {
            this.setState({
                timeLeft: this.state.timeleft--
            })

            this.timer = setTimeout(() => {
                this.recalculateTime()
            }, 1000)
        }else{
            store.dispatch(gameActions.startGame())
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    startGame(e){
        clearTimeout(this.timer);
        store.dispatch(gameActions.startGame())
    }

    render() {

        const visible = this.props.visible == 'WAITING_TO_START' ? 'block' : 'none'

        return (
            <div className="game-starting-overlay" onClick={ this.startGame } style={{display: visible}}>
                <div className="game-starting-overlay--counting" >
                    { this.state.timeleft }
                </div>
            </div>
        )
    }

}

export default GamePreTimer
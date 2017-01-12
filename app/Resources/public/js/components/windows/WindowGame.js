import React from 'react'
import GameTimer from '../GameTimer'
import GamePreTimer from '../GamePreTimer'
import store from '../../app-store'
import * as gameActions  from '../../actions/game-actions'

class WindowGame extends React.Component{

    constructor (props){
        super(props)

        this.timer = null
        this.timerIsRunning = false

        this.state = store.getState().gameState
    }

    componentWillMount() {


        this.unsubscribe = store.subscribe(() => {

                this.setState(store.getState().gameState)

                if(this.state.timeLeft == this.state.time && this.timer === null && !this.timerIsRunning){
                    this.recalculateTimeLeft()
                }
            }
        )

    }

    componentDidMount(){
        store.dispatch(gameActions.waitToStart())
    }

    giveAnswer(e, answer){
        e.preventDefault()

        store.dispatch(gameActions.saveAnswer(
            this.state.questions[this.state.currentQuestion - 1].id,
            answer == this.state.questions[this.state.currentQuestion - 1].is_before
        ))
        if(this.state.currentQuestion < this.state.questionsCount){
            store.dispatch(gameActions.gameNextQuestion())
        }else{
            store.dispatch(gameActions.gameFinish())
        }
    }

    recalculateTimeLeft() {

        this.timerIsRunning = true
        clearTimeout(this.timer);



        if (this.state.timeLeft > 0) {
            this.timer = setTimeout(() => {
                store.dispatch(gameActions.gameReduceTime())
                this.recalculateTimeLeft()
            }, 1000)
        }else{
            store.dispatch(gameActions.gameFinish())
        }
    }

    componentWillUnmount() {
        this.unsubscribe()
        clearTimeout(this.timer)

    }

        render() {
        return (
            <div className="screen screen--game">
                <div className="screen-inner">
                    <div className="top-section">
                        <div className="game-status">
                            <GameTimer timeleft= { this.state.timeLeft }/>
                            <div className="question-count">
                                { this.state.currentQuestion } / { this.state.questionsCount }
                            </div>
                        </div>
                        <div className="main-fact-section">
                            <div className="main-fact">
                                { this.state.root.name }
                            </div>
                        </div>
                    </div>
                    <div className="bottom-wrapper">
                        <div className="bottom-wrapper__content">
                            <div className="socondary-fact">
                                { this.state.currentQuestionName }
                            </div>
                            <div className="bottom-buttons">
                                <a href="" className="btn btn--before" onClick={ (e) => this.giveAnswer(e, true) }>Anksčiau</a>
                                <a href="" className="btn btn--after" onClick={ (e) => this.giveAnswer(e, false) }>Vėliau</a>
                            </div>
                        </div>
                    </div>

                    <GamePreTimer visible = { this.state.gameStatus }/>

                </div>
            </div>
        )
    }

}

export default WindowGame
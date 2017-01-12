import React from 'react'
import store from '../../app-store'


class LederboardModal extends React.Component{

    constructor (){
        super()

    }

    componentWillMount (){
        this.setState(store.getState().leaderboardState)

        let unsubscribe = store.subscribe(() => {

                this.setState(store.getState().leaderboardState)


            }
        )

        console.log(this.state);
        //this.leaders = this.state.leaderboardData.leaders

    }

    componentWillUnmount (){
        unsubscribe()
    }

    render (){

        let leaderNum = 1

        return (
            <ul className="leaderboard">
                <li className="header">
                    <span className="leaderboard--place">Vieta</span>
                    <span className="leaderboard--username">Vardas</span>
                    <span className="leaderboard--score">Surinko taškų</span>
                </li>

                {
                    this.state.leaders.map((leader, i) => {
                        return (
                            <li key = { i }>
                                <span className="leaderboard--place">{ leaderNum++ }</span>
                                <span className="leaderboard--username">{ leader.username }</span>
                                <span className="leaderboard--score">{ leader.score }</span>
                            </li>
                        )
                    })
                }

            </ul>
        )
    }

}

export default LederboardModal
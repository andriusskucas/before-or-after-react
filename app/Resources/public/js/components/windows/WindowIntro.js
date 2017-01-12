import React from 'react'
import * as API from '../../actions/api'
import * as leaderBoardActions from '../../actions/leaderboard-actions'
import * as appActions  from '../../actions/app-actions'
import * as gameActions  from '../../actions/game-actions'
import store from '../../app-store'

class WindowIntro extends React.Component {

    constructor(props){
        super(props);

        this.startGame = this.startGame.bind(this)
        this.showLeaderBoard = this.showLeaderBoard.bind(this)
    }

    startGame(e){
        e.preventDefault();

        store.dispatch((dispatch) => {
            dispatch(appActions.turnLoaderOn('Kraunamas žaidimo turinys.'))

            API.loadGameData().then((response) => {
                    console.log(response.data)

                    dispatch(gameActions.initGame(response.data))
                    dispatch(appActions.turnLoaderOff())
                    dispatch(appActions.loadAppScreen('GAME'))
                }
            )

        })

    }

    showLeaderBoard(e){
        e.preventDefault();

        store.dispatch((dispatch) => {
           dispatch(appActions.turnLoaderOn('Kraunamas turnyrinės lentelės turinys.'))
            API.getLeaderboard().then((response) => {
                    console.log(response.data)

                    dispatch(leaderBoardActions.openLeaderboard(response.data))
                    dispatch(appActions.openModal('LEADERBOARD'))
                    dispatch(appActions.turnLoaderOff())
                }
            )
        })
    }

    render() {
        return (
            <div className="screen screen--start">
                <div className="screen-inner">
                    <div className="top-section">
                        <div className="logo"><img src={require('../../../img/logo.png')} alt="" /></div>
                        <div className="rules">
                            "Prieš ar po" - žaidimas skirtas pasitikrinti savo istorijos žinias.
                            <p><strong>Taisyklės:</strong>
                                <br/><small>Pradžioje Jums bus pateiktas vienas istorinis įvykis. Pagalvokite kada jis įvyko ir pasiruoškite žaidimui.
                                    Prasidejus žaidimui lango apačioje paeiliui bus rodoma  istorinių įvykių ir Jums reikės atsakyti kada tai įvyko lyginant su viršuje rodomu įvykiu.
                                    Tam Jūs turite  sekundžių. Sėkmės!</small></p>
                        </div>
                    </div>

                    <div className="bottom-wrapper">
                        <div className="bottom-wrapper__content">
                            <div>
                                <a href="#" onClick={this.startGame} className="btn btn--start-game">Pradėti</a>
                            </div>
                            <div>
                                <a href="#" onClick={this.showLeaderBoard} className="btn btn--show-leaderboard">
                                    <span className="icon icon-leader"></span>Žiūrėti geriausius
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WindowIntro
import React from 'react'
import Window from './Window'
import Modal from './Modal'
import LoaderOverlay from './Loaderoverlay'
import store from '../app-store'

class AppContainer extends React.Component {

    constructor(props){
        super(props);


    }

    componentWillMount (){
        let unsubscribe = store.subscribe(() => {

                this.setState(store.getState())
            console.log(this.state)
            }
        )

        this.setState(store.getState())
        console.log(store.getState())
        console.log(this.state)
    }

    render()
    {
        return (
            <div className="main-wrapper">
                <header>
                    <a href="#" className="back-arrow"><span></span></a>
                </header>
                <Window window={ this.state.appState.window }  />
                <Modal visible={ this.state.appState.openModal } modaltoopen = { this.state.appState.modalToOpen }/>
                <LoaderOverlay text={this.state.appState.loadingMessage} visible={this.state.appState.loading} />
            </div>
        )
    }
}

export default AppContainer
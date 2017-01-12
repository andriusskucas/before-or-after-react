import React from 'react'
import LeaderboardModal from './modals/LederboardModal'
import * as appActions  from '../actions/app-actions'
import store from '../app-store'

function ModalContent(props) {

    switch (props.modaltoopen) {
        case 'LEADERBOARD':

            return <LeaderboardModal />

        case 'GAME':

        //return <WindowGame />
        default:
            return null
    }
}

class Modal extends React.Component {

    constructor(props) {
        super(props)

        this.closeModal = this.closeModal.bind(this)
    }

    closeModal (e){
        e.preventDefault();
        store.dispatch(appActions.closeModal())
    }




    render() {

        const visible = this.props.visible ? 'block' : 'none'
        const modalToOpen = this.props.modaltoopen

        return (
            <div className="modal modal--leaderboard" style={{display: visible}}>
                <a href="" onClick={ this.closeModal } className="close-modal">&times;</a>
                <div className="modal-content">
                    <ModalContent modaltoopen = { modalToOpen } />
                </div>
            </div>
        )
    }

}

export default Modal
import React from 'react'

class LoaderOverlay extends React.Component {



    render() {
        const visible = this.props.visible ? 'block' : 'none'
        return (
            <div className="loader" style={{display: visible}} >
                <div className="loader-elem">
                    <span className="load-circle"></span><span className="load-circle"></span><span className="load-circle"></span>
                    <div className="loader-text">{ this.props.text }</div>
                </div>
            </div>
        )
    }

}

export default LoaderOverlay
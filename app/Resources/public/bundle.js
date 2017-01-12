import './styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './js/components/AppContainer';

import store from './js/app-store'

import { Provider } from 'react-redux'



ReactDOM.render(
    <Provider store={ store } >
        <AppContainer />
    </Provider>,
    document.getElementById('main-block')
);

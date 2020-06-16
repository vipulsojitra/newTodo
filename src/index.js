import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './api/index.js'
import App from './app'

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
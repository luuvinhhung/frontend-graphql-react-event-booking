import React from 'react'
import './App.css'

import Root from './pages'

import { ApolloProvider } from 'react-apollo'
import client from './tools/apollo'

import { Provider } from 'mobx-react'
import store from './tools/mobx/index'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Root />
        </ApolloProvider>
      </Provider>
    )
  }
}

export default App

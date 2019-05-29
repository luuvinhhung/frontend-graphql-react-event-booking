import React from 'react'
import './App.css'
import { ApolloProvider } from 'react-apollo'
import client from './utils/ApolloClient'
import Root from './pages/root'

class App extends React.Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>
    )
  }
}

export default App

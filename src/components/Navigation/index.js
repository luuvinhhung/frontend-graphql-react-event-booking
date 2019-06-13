import React, { Component } from 'react'
import './MainNavigation.scss'

import { inject, observer } from 'mobx-react'

import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo'

import { Button } from 'antd'

@inject('store')
@observer

class mainNavigation extends Component {
  constructor (props) {
    super(props)
    this.token = window.localStorage.getItem('access-token')
  }
  logoutHandler = () => {
    this.props.store.authStore.logout(() => {
      this.props.history.push('/login')
      // this.props.client.resetStore()
    })
  }
  render () {
    return (
      <>
        {
          <header className='main-navigation'>
            <div className='main-navigation__logo'>
              <h1>EasyEvent</h1>
            </div>
            <nav className='main-navigation__items'>
              {this.token && (
                <Button onClick={this.logoutHandler}>Logout</Button>
              )}
            </nav>
          </header>
        }
      </>
    )
  }
}

export default withApollo(withRouter(mainNavigation))

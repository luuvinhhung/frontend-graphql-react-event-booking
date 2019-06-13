import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { routes } from '../routes'
import withLoadable from '../tools/loadable'
import Main from './apps/MainContent'

function Root (props) {
  const { isAuth } = props.store.authStore
  return (
    <Router>
      <Switch>
        {routes &&
          routes.map((route, i) =>
            route.private ? (
              // Private
              <Main key={i}>
                <Route
                  {...route}
                  component={props => {
                    const MyComponent = withLoadable(
                      import(`./${route.component}`)
                    )
                    return isAuth ? (
                      <MyComponent {...props} {...route} />
                    ) : (
                      <Redirect to='/login' />
                    )
                  }}
                />
              </Main>
            ) : (
              // Not private
              <Route
                key={i}
                {...route}
                component={props => {
                  const MyComponent = withLoadable(
                    import(`./${route.component}`)
                  )
                  return !isAuth ? (
                    <MyComponent {...props} {...route} />
                  ) : (
                    <Redirect to='/' />
                  )
                }}
              />
            )
          )}
        <Redirect to='/login' />
      </Switch>
    </Router>
  )
}

export default inject('store')(observer(Root))

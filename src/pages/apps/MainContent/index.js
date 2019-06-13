import React, { Component } from 'react'
import SiderLayout from '../SiderLayout'
import MainNavigation from '../../../components/Navigation'

import { Layout } from 'antd'

const { Header, Content } = Layout
class MainContent extends Component {
  render () {
    return (
      <>
        <Layout>
          <SiderLayout />
          <Layout style={{ height: '100vh' }}>
            <Header style={{ padding: 0 }}>
              {/* <Icon
                  className='trigger'
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                /> */}
              <MainNavigation />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 480
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </>
    )
  }
}
export default MainContent

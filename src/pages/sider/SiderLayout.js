import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import './SliderLayout.scss'
import { Link, withRouter } from 'react-router-dom'
import { siderRoutes } from '../../routes'

const { Sider } = Layout

class SiderLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      currentRoute: '/'
    }
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  // HACK: onClick menu set lai current bang key de tô background item da chọn
  selectedOnClickHandler = e => {
    // console.log(e.key)
    this.setState({
      current: e.key
    })
  }
  render () {
    const { location } = this.props
    return (
      <Sider
        width={200}
        theme='light'
        trigger={null}
        breakpoint='lg'
        // onBreakpoint={broken => {
        //   console.log(broken)
        // }}
        collapsible
        collapsed={this.state.collapsed}
      >
        <Menu
          theme='light'
          mode='inline'
          defaultSelectedKeys={[location.pathname]}
          justify='center'
          align='left'
          onClick={this.selectedOnClickHandler}
        >
          <div
            style={{
              height: 60,
              paddingTop: 20,
              fontSize: 20,
              textAlign: 'center',
              justifyItems: 'center'
            }}
          >
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </div>
          {/* tao item trong menu tu router click chuyen trang /home/events(/bookings) */}
          {/* // WARNING: su dung path url lam key phai setState current de hien thi background selected
          can fix moi lan chon se reset lai trang */}
          {siderRoutes &&
            siderRoutes.map((siderRoute, i) => (
              <Menu.Item key={siderRoute.path}>
                <Link to={siderRoute.path}>
                  <Icon
                    style={{ fontSize: '1rem' }}
                    type={siderRoute.icon}
                    theme='twoTone'
                  />
                  {siderRoute.label.toUpperCase()}
                </Link>
              </Menu.Item>
            ))}
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(SiderLayout)

import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import { login } from '../../graphql/queries/loginQueries'
import { Button, Input, Row, Col, Form, Icon, Typography } from 'antd'

// import './Login.scss'

import Auth from '../../context/Authentication'

const { Title } = Typography

class Login extends Component {
  state = {
    email: 'hung@gmail.com',
    password: '123'
  }
  // componentWillMount () {
  //   const token = window.localStorage.getItem('access-token')
  //   if (token) {
  //     this.props.history.push('/home')
  //   }
  // }
  submitHandle = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
      }
      const { email, password } = values
      this.props.client
        .query({
          query: login,
          variables: {
            email: email,
            password: password
          }
        })
        .then(resData => {
          // console.log(resData)
          if (resData.data.login.token) {
            Auth.authenticate(() => {
              window.localStorage.setItem(
                'access-token',
                resData.data.login.token
              )
              window.localStorage.setItem('userId', resData.data.login.userId)
              this.props.history.push('/home')
              // this.setState({ loading: false, spin: false })
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <>
        <Row id='layout-login'>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 16, offset: 8 }}
            md={{ span: 14, offset: 10 }}
            lg={{ span: 12, offset: 12 }}
            xl={{ span: 7, offset: 17 }}
          >
            <div>
              <Form onSubmit={this.submitHandle} className='login-form'>
                <div className='login-form-header'>
                  <Title level={1}>LOGIN</Title>
                </div>
                <Form.Item>
                  {getFieldDecorator('email', {
                    valuePropName: 'defaultValue',
                    initialValue: this.state.email,
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!'
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type='mail'
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder='your@email.com'
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    valuePropName: 'defaultValue',
                    initialValue: this.state.password,
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Password!'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type='lock'
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type='password'
                      placeholder='Password'
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType='submit'
                    type='primary'
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}
export default withApollo(Form.create({ name: 'normal_login' })(Login))

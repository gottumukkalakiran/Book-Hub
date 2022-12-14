import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    showPassword: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state

    const fieldType = showPassword ? 'text' : 'password'

    return (
      <>
        <label className="input-label" htmlFor="password">
          Password*
        </label>
        <input
          type={fieldType}
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          Username*
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  onToggleCheckbox = event => {
    this.setState({
      showPassword: event.target.checked,
    })
  }

  renderCheckbox = () => (
    <div className="checkbox-input-container">
      <input
        id="checkboxInput"
        type="checkbox"
        className="checkbox-input-field"
        onChange={this.onToggleCheckbox}
      />
      <label className="input-label checkbox-label" htmlFor="checkboxInput">
        Show Password
      </label>
    </div>
  )

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <div className="login-desktop-img-container">
          <img
            className="login-desktop-img"
            src="https://res.cloudinary.com/dinhpbueh/image/upload/v1662553915/LoginImageDesktop_w3keid.png"
            alt=""
          />
        </div>
        <div className="form-container">
          <img
            className="login-mobile-img"
            src="https://res.cloudinary.com/dinhpbueh/image/upload/v1662553670/Ellipse_99_gsgnqs.png"
            alt="website login"
          />
          <img
            className="login-website-logo"
            src="https://res.cloudinary.com/dinhpbueh/image/upload/v1662553813/BookHub_qnzptf.png"
            alt="login website logo"
          />
          <form className="form" onSubmit={this.submitForm}>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <div className="input-container">{this.renderCheckbox()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm

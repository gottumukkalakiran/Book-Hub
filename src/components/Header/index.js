import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {HiSun, HiMoon} from 'react-icons/hi'
import './index.css'
import NavItem from '../NavItem'
import HeaderContext from '../../context/HeaderContext'

const navItems = [
  {
    id: 1,
    displayText: 'Home',
    pathText: '',
  },
  {
    id: 2,
    displayText: 'Bookshelves',
    pathText: 'shelf',
  },
  {
    id: 3,
    displayText: 'Favorites',
    pathText: 'favorites',
  },
]

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderMobileNavIconsContainer = () => (
    <HeaderContext.Consumer>
      {value => {
        const {updateActiveNavId, onClose, isDarkTheme, onToggleTheme} = value

        const darkThemeCloseColor = isDarkTheme ? '#ffffff' : '#000000'
        const darkThemeNavMenu = isDarkTheme ? 'dark-theme-mobile-nav-menu' : ''

        const navIcon = isDarkTheme ? (
          <HiSun size={25} color="#ffffff" />
        ) : (
          <HiMoon size={25} color="#64748b" />
        )

        const onChangeTheme = () => {
          onToggleTheme()
        }

        return (
          <div className={`nav-menu-mobile ${darkThemeNavMenu}`}>
            <ul className="nav-menu-list-mobile">
              {navItems.map(eachItem => (
                <NavItem
                  key={eachItem.id}
                  navItemDetails={eachItem}
                  updateActiveNavId={updateActiveNavId}
                />
              ))}
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
              <button
                type="button"
                className="theme-button"
                onClick={onChangeTheme}
              >
                {navIcon}
              </button>
              <button type="button" className="close-button" onClick={onClose}>
                <AiFillCloseCircle size={25} color={darkThemeCloseColor} />
              </button>
            </ul>
          </div>
        )
      }}
    </HeaderContext.Consumer>
  )

  renderDesktopNavMenu = () => (
    <HeaderContext.Consumer>
      {value => {
        const {updateActiveNavId, isDarkTheme, onToggleTheme} = value

        const onClickWebsiteLogo = () => {
          updateActiveNavId(navItems[0].id)
        }

        const navIcon = isDarkTheme ? (
          <HiSun size={25} color="#ffffff" />
        ) : (
          <HiMoon size={25} color="#64748b" />
        )

        const onChangeTheme = () => {
          onToggleTheme()
        }

        return (
          <div className="nav-bar-large-container">
            <Link to="/">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/gottumukkala/image/upload/v1670324059/Book%20Hub%20Mini%20Project/Group_7731logo_fegx8c.png"
                alt="website logo"
                onClick={onClickWebsiteLogo}
              />
            </Link>
            <ul className="nav-menu">
              {navItems.map(eachItem => (
                <NavItem
                  key={eachItem.id}
                  navItemDetails={eachItem}
                  updateActiveNavId={updateActiveNavId}
                />
              ))}
            </ul>
            <button
              type="button"
              className="logout-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="theme-button"
              onClick={onChangeTheme}
            >
              {navIcon}
            </button>
          </div>
        )
      }}
    </HeaderContext.Consumer>
  )

  render() {
    return (
      <HeaderContext.Consumer>
        {value => {
          const {
            showNavIcons,
            onToggleIcon,
            updateActiveNavId,
            isDarkTheme,
          } = value

          const onClickWebsiteLogo = () => {
            updateActiveNavId(navItems[0].id)
          }

          const headerDarkThemeBg = isDarkTheme ? 'header-dark-theme-bg' : ''
          const darkThemeHamburger = isDarkTheme ? '#ffffff' : '#000000'

          return (
            <nav className={`nav-header ${headerDarkThemeBg}`}>
              <div className="nav-content">
                <div className="nav-bar-mobile-logo-container">
                  <Link to="/">
                    <img
                      className="website-logo"
                      src="https://res.cloudinary.com/gottumukkala/image/upload/v1670324059/Book%20Hub%20Mini%20Project/Group_7731logo_fegx8c.png"
                      alt="website logo"
                      onClick={onClickWebsiteLogo}
                    />
                  </Link>

                  <button
                    type="button"
                    className="nav-mobile-btn"
                    onClick={onToggleIcon}
                  >
                    <GiHamburgerMenu size={25} color={darkThemeHamburger} />
                  </button>
                </div>

                {this.renderDesktopNavMenu()}
              </div>
              {showNavIcons ? this.renderMobileNavIconsContainer() : null}
            </nav>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default withRouter(Header)

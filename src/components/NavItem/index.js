import {NavLink} from 'react-router-dom'
import HeaderContext from '../../context/HeaderContext'
import './index.css'

const NavItem = props => {
  const {navItemDetails, updateActiveNavId} = props
  const {id, displayText, pathText} = navItemDetails

  const onClickNavItem = () => {
    updateActiveNavId(id)
  }

  return (
    <HeaderContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const navLinkDarkThemeText = isDarkTheme ? 'header-dark-theme-text' : ''

        return (
          <li className="nav-menu-item" onClick={onClickNavItem}>
            <NavLink
              exact
              to={`/${pathText}`}
              className={`nav-link ${navLinkDarkThemeText}`}
            >
              {displayText}
            </NavLink>
          </li>
        )
      }}
    </HeaderContext.Consumer>
  )
}

export default NavItem

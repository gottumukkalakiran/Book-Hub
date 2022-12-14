import {Link} from 'react-router-dom'
import HeaderContext from '../../context/HeaderContext'

import './index.css'

const EmptyFavoritesView = () => (
  <HeaderContext.Consumer>
    {value => {
      const {isDarkTheme, updateActiveNavId} = value
      const darkThemeHeading = isDarkTheme
        ? 'no-favorites-dark-heading-text'
        : ''
      const onClickFindBooks = () => {
        updateActiveNavId(2)
      }
      return (
        <div className="favorites-empty-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            className="favorites-empty-img"
            alt="favorites empty"
          />
          <h1 className={`favorites-empty-heading ${darkThemeHeading}`}>
            No Favorite Books
          </h1>

          <Link to="/shelf">
            <button
              type="button"
              className="find-books-btn"
              onClick={onClickFindBooks}
            >
              Find Books
            </button>
          </Link>
        </div>
      )
    }}
  </HeaderContext.Consumer>
)

export default EmptyFavoritesView

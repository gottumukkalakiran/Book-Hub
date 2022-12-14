import {Link} from 'react-router-dom'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'
import HeaderContext from '../../context/HeaderContext'

const FavoriteItem = props => (
  <HeaderContext.Consumer>
    {value => {
      const {removeFavorites, isDarkTheme} = value
      const {cartItemDetails} = props
      const {id, title, authorName, readStatus, coverPic} = cartItemDetails

      const onRemoveCartItem = () => {
        removeFavorites(id)
      }

      const closeIconColor = isDarkTheme ? '#d3d3d3' : '#616E7C'
      const darkThemeHeading = isDarkTheme ? 'favorite-item-dark-heading' : ''
      const darkThemeDescription = isDarkTheme
        ? 'favorite-item-dark-description'
        : ''
      const darkThemeBg = isDarkTheme ? 'favorite-item-dark-theme-bg' : ''

      return (
        <Link to={`/books/${id}`} className="favorite-book-item-nav-link">
          <li className={`favorite-item ${darkThemeBg}`}>
            <img
              className="favorite-product-image"
              src={coverPic}
              alt={title}
            />
            <div className="favorite-item-details-container">
              <div className="favorite-product-title-brand-container">
                <p className={`favorite-product-title ${darkThemeHeading}`}>
                  {title}
                </p>
                <p className={`favorite-product-brand ${darkThemeDescription}`}>
                  by {authorName}
                </p>
              </div>

              <div className="total-price-remove-container">
                <p
                  className={`favorite-book-status-text ${darkThemeDescription}`}
                >
                  Status:{' '}
                  <span className="favorite-book-status">{readStatus}</span>
                </p>
                <button
                  className={`remove-button ${darkThemeDescription}`}
                  type="button"
                  onClick={onRemoveCartItem}
                >
                  Remove
                </button>
              </div>
            </div>
            <button
              className="delete-button"
              type="button"
              onClick={onRemoveCartItem}
              testid="remove"
            >
              <AiFillCloseCircle color={`${closeIconColor}`} size={20} />
            </button>
          </li>
        </Link>
      )
    }}
  </HeaderContext.Consumer>
)

export default FavoriteItem

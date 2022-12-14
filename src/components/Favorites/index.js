import {Component} from 'react'
import HeaderContext from '../../context/HeaderContext'
import EmptyFavoritesView from '../EmptyFavoritesView'
import FavoritesList from '../FavoritesList'
import Header from '../Header'

import './index.css'

class Favorites extends Component {
  render() {
    return (
      <HeaderContext.Consumer>
        {value => {
          const {favoritesList, removeAllFavorites, isDarkTheme} = value
          const favoritesListLength = favoritesList.length
          const showEmptyView = favoritesListLength === 0
          const bookText = favoritesListLength === 1 ? 'Book' : 'Books'

          const darkThemeHeading = isDarkTheme
            ? 'favorites-dark-heading-text'
            : ''

          const onClickRemoveAllBtn = () => {
            removeAllFavorites()
          }
          return (
            <>
              <Header />
              <div className="favorites-container">
                {showEmptyView ? (
                  <EmptyFavoritesView />
                ) : (
                  <div className="favorites-content-container">
                    <h1 className={`favorites-heading ${darkThemeHeading}`}>
                      My Favorites
                    </h1>
                    <button
                      type="button"
                      className="remove-all-btn"
                      onClick={onClickRemoveAllBtn}
                    >
                      Remove {favoritesListLength} {bookText}
                    </button>
                    <FavoritesList />
                  </div>
                )}
              </div>
            </>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default Favorites

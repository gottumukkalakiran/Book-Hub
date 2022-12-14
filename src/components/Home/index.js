import {Link} from 'react-router-dom'
import Header from '../Header'
import TopRatedBooks from '../TopRatedBooks'
import HeaderContext from '../../context/HeaderContext'
import './index.css'

const Home = () => (
  <HeaderContext.Consumer>
    {value => {
      const {updateActiveNavId, isDarkTheme} = value
      const onClickFindBooks = () => {
        updateActiveNavId(2)
      }

      const darkHeadingText = isDarkTheme ? 'home-dark-heading-text' : ''
      const darkDescriptionText = isDarkTheme
        ? 'home-dark-description-text'
        : ''

      return (
        <>
          <Header />
          <div className="home-container">
            <div className="home-content">
              <h1 className={`home-heading ${darkHeadingText}`}>
                Find Your Next Favorite Books?
              </h1>
              <p className={`home-description ${darkDescriptionText}`}>
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
              <Link to="/shelf">
                <button
                  type="button"
                  className="find-books-mobile-btn"
                  onClick={onClickFindBooks}
                >
                  Find Books
                </button>
              </Link>
            </div>
            <TopRatedBooks />
          </div>
        </>
      )
    }}
  </HeaderContext.Consumer>
)

export default Home

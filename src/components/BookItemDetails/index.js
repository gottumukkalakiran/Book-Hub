import Cookies from 'js-cookie'
import {Component} from 'react'
import {AiFillHeart} from 'react-icons/ai'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'
import Footer from '../Footer'
import HeaderContext from '../../context/HeaderContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    bookData: {},
    isFavoriteBook: false,
  }

  componentDidMount() {
    this.getBookData()
  }

  getUpdatedData = data => ({
    aboutAuthor: data.about_author,
    aboutBook: data.about_book,
    authorName: data.author_name,
    coverPic: data.cover_pic,
    id: data.id,
    rating: data.rating,
    readStatus: data.read_status,
    title: data.title,
  })

  getBookData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const bookDetailsApiUrl = `https://apis.ccbp.in/book-hub/books/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(bookDetailsApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = this.getUpdatedData(fetchedData.book_details)
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getBookData()
  }

  renderFailureView = () => (
    <HeaderContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const darkThemeDescription = isDarkTheme
          ? 'book-item-details-dark-description-text'
          : ''

        return (
          <div className="book-details-failure-view">
            <img
              className="book-details-failure-view-image"
              src="https://res.cloudinary.com/gottumukkala/image/upload/v1670324059/Book%20Hub%20Mini%20Project/Group_7522_cza4zl.png"
              alt="failure view"
            />
            <p
              className={`book-details-failure-view-description ${darkThemeDescription}`}
            >
              Something went wrong, Please try again.
            </p>
            <button
              type="button"
              className="try-again-btn"
              onClick={this.onClickTryAgain}
            >
              Try Again
            </button>
          </div>
        )
      }}
    </HeaderContext.Consumer>
  )

  renderSuccessView = () => {
    const {bookData, isFavoriteBook} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      id,
      title,
      readStatus,
    } = bookData

    return (
      <HeaderContext.Consumer>
        {value => {
          const {
            isDarkTheme,
            removeFavorites,
            addFavorites,
            favoritesList,
          } = value
          const darkThemeColor = isDarkTheme ? '#d3d3d3' : '#475569'
          const bookObject = favoritesList.find(eachBook => eachBook.id === id)
          const isFavorite = bookObject !== undefined

          const favoriteIcon = isFavorite ? (
            <AiFillHeart size={25} color="#ff0b37" />
          ) : (
            <AiFillHeart size={25} color={`${darkThemeColor}`} />
          )

          const bookItemsDetailsBg = isDarkTheme
            ? 'book-item-details-dark-bg'
            : ''
          const darkThemeHeading = isDarkTheme
            ? 'book-item-details-dark-heading-text'
            : ''
          const darkDescription = isDarkTheme
            ? 'book-item-details-dark-description-text'
            : ''

          const onClickFavorite = () => {
            // eslint-disable-next-line no-unused-expressions
            isFavoriteBook
              ? removeFavorites(id)
              : addFavorites({...bookData, isFavorite: true})
            this.setState(prevState => ({
              isFavoriteBook: !prevState.isFavoriteBook,
            }))
          }

          return (
            <div className={`details-container ${bookItemsDetailsBg}`}>
              <div className="cover-pic-and-info-container">
                <img
                  className="book-details-cover-pic"
                  src={coverPic}
                  alt={title}
                />
                <div className="info-container">
                  <h1 className={`book-details-title ${darkThemeHeading}`}>
                    {title}
                  </h1>
                  <p className={`book-details-author-name ${darkDescription}`}>
                    {authorName}
                  </p>
                  <div className="rating-container">
                    <p className={`rating-text ${darkDescription}`}>
                      Avg Rating
                    </p>
                    <BsFillStarFill color="#FBBF24" size={18} />
                    <p className={`book-details-rating ${darkDescription}`}>
                      {rating}
                    </p>
                  </div>
                  <p className={`book-details-status-text ${darkDescription}`}>
                    Status:
                    <span className="book-details-status"> {readStatus}</span>
                  </p>
                  <button
                    type="button"
                    className={`add-to-favorites-button ${darkDescription}`}
                    onClick={onClickFavorite}
                  >
                    Add To Favorites {favoriteIcon}
                  </button>
                </div>
              </div>
              <hr className="horizontal-line" />
              <h1 className={`about-author-heading ${darkThemeHeading}`}>
                About Author
              </h1>
              <p className={`about-author-description ${darkDescription}`}>
                {aboutAuthor}
              </p>
              <h1 className={`about-book-heading ${darkThemeHeading}`}>
                About Book
              </h1>
              <p className={`about-book-description ${darkDescription}`}>
                {aboutBook}
              </p>
            </div>
          )
        }}
      </HeaderContext.Consumer>
    )
  }

  renderBookDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="book-details-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <Header />
        <div className="book-details-container">{this.renderBookDetails()}</div>
        {apiStatus === apiStatusConstants.success && <Footer />}
      </>
    )
  }
}

export default BookItemDetails

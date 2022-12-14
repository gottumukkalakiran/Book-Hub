import {Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'
import Footer from '../Footer'
import HeaderContext from '../../context/HeaderContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class TopRatedBooks extends Component {
  state = {apiStatus: apiStatusConstants.initial, topRatedBooksList: []}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getUpdatedData = data => ({
    authorName: data.author_name,
    coverPic: data.cover_pic,
    id: data.id,
    title: data.title,
  })

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const topRatedBooksApiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(topRatedBooksApiUrl, options)
    //  const response = await fetch(topRatedBooksApiUrl);
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(eachBook =>
        this.getUpdatedData(eachBook),
      )
      this.setState({
        apiStatus: apiStatusConstants.success,
        topRatedBooksList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTopRatedBooksHeader = () => (
    <HeaderContext.Consumer>
      {value => {
        const {updateActiveNavId, isDarkTheme} = value
        const onClickFindBooks = () => {
          updateActiveNavId(2)
        }

        const darkHeadingText = isDarkTheme
          ? 'top-rated-books-dark-heading-text'
          : ''

        return (
          <div className="top-rated-books-header-container">
            <h1 className={`top-rated-books-heading ${darkHeadingText}`}>
              Top Rated Books
            </h1>
            <Link to="/shelf">
              <button
                type="button"
                className="find-books-desktop-btn"
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

  renderSlider = () => {
    const {topRatedBooksList} = this.state
    return (
      <HeaderContext.Consumer>
        {value => {
          const {updateActiveNavId, isDarkTheme} = value
          const onClickBook = () => {
            updateActiveNavId('')
          }

          const darkHeadingText = isDarkTheme
            ? 'top-rated-books-dark-heading-text'
            : ''
          const darkDescriptionText = isDarkTheme
            ? 'top-rated-books-dark-description-text'
            : ''
          return (
            <Slider {...settings}>
              {topRatedBooksList.map(eachBook => {
                const {id, authorName, coverPic, title} = eachBook
                return (
                  <Link
                    to={`books/${id}`}
                    className="slider-nav-link"
                    key={id}
                    onClick={onClickBook}
                  >
                    <div className="slick-item" key={id}>
                      <img
                        className="cover-pic"
                        src={coverPic}
                        alt="company logo"
                      />
                      <h1 className={`book-title ${darkHeadingText}`}>
                        {title}
                      </h1>
                      <p className={`book-author-name ${darkDescriptionText}`}>
                        {authorName}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </Slider>
          )
        }}
      </HeaderContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getTopRatedBooks()
  }

  renderFailureView = () => (
    <HeaderContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const darkDescriptionText = isDarkTheme
          ? 'top-rated-books-dark-description-text'
          : ''

        return (
          <div className="top-rated-books-failure-view">
            <img
              className="failure-view-image"
              src="https://res.cloudinary.com/gottumukkala/image/upload/v1670324059/Book%20Hub%20Mini%20Project/Group_7522_cza4zl.png"
              alt="failure view"
            />
            <p
              className={`top-rated-books-failure-view-description ${darkDescriptionText}`}
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

  renderSuccessView = () => (
    <div className="slick-container">{this.renderSlider()}</div>
  )

  renderTopRatedBooksSection = () => {
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

  render() {
    const {apiStatus} = this.state
    return (
      <HeaderContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const TopRatedBooksDarkBg = isDarkTheme
            ? 'top-rated-books-dark-bg'
            : ''
          return (
            <>
              <div
                className={`top-rated-books-container ${TopRatedBooksDarkBg}`}
              >
                {this.renderTopRatedBooksHeader()}
                {this.renderTopRatedBooksSection()}
              </div>
              {apiStatus === apiStatusConstants.success && <Footer />}
            </>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default TopRatedBooks

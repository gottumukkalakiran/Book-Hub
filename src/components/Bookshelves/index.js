import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ShelfItem from '../ShelfItem'
import './index.css'
import Footer from '../Footer'
import BookItem from '../BookItem'
import HeaderContext from '../../context/HeaderContext'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    searchInput: '',
    activeShelf: bookshelvesList[0].value,
    apiStatus: apiStatusConstants.initial,
    booksData: [],
  }

  componentDidMount() {
    this.getBooksData()
  }

  getUpdatedBookData = eachBook => ({
    authorName: eachBook.author_name,
    coverPic: eachBook.cover_pic,
    id: eachBook.id,
    rating: eachBook.rating,
    readStatus: eachBook.read_status,
    title: eachBook.title,
  })

  getBooksData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeShelf, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const booksApiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeShelf}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(booksApiUrl, options)
    //  const response = await fetch(booksApiUrl);
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(eachBook =>
        this.getUpdatedBookData(eachBook),
      )

      this.setState({
        apiStatus: apiStatusConstants.success,
        booksData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updatedActiveShelf = activeShelf => {
    this.setState({activeShelf}, this.getBooksData)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getBooksData()
    }
  }

  onClickSearchBtn = () => {
    this.getBooksData()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state

    return (
      <HeaderContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const darkThemeContainer = isDarkTheme
            ? 'dark-search-input-container'
            : ''
          const darkThemeSearchInput = isDarkTheme ? 'dark-search-input' : ''
          const darkSearchButton = isDarkTheme ? 'dark-search-button' : ''
          const darkSearchIcon = isDarkTheme ? 'dark-search-icon' : ''

          return (
            <div className={`search-input-container ${darkThemeContainer}`}>
              <input
                value={searchInput}
                type="search"
                className={`search-input ${darkThemeSearchInput}`}
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                className={`search-button ${darkSearchButton}`}
                type="button"
                value="searchButton"
                testid="searchButton"
                onClick={this.onClickSearchBtn}
              >
                <BsSearch className={`search-icon ${darkSearchIcon}`} />
              </button>
            </div>
          )
        }}
      </HeaderContext.Consumer>
    )
  }

  renderShelves = () => {
    const {activeShelf} = this.state

    return (
      <HeaderContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const darkThemeHeading = isDarkTheme
            ? 'bookshelves-dark-heading-text'
            : ''
          const darkThemeShelvesBg = isDarkTheme ? 'bookshelves-dark-bg' : ''

          return (
            <div className={`shelves-container ${darkThemeShelvesBg}`}>
              <div className="mobile-search-input-container">
                {this.renderSearchInput()}
              </div>
              <h1 className={`bookshelves-text ${darkThemeHeading}`}>
                Bookshelves
              </h1>
              <ul className="shelf-items-container">
                {bookshelvesList.map(eachShelfItem => (
                  <ShelfItem
                    key={eachShelfItem.id}
                    shelfItemDetails={eachShelfItem}
                    isActive={eachShelfItem.value === activeShelf}
                    updatedActiveShelf={this.updatedActiveShelf}
                  />
                ))}
              </ul>
            </div>
          )
        }}
      </HeaderContext.Consumer>
    )
  }

  renderBookShelfHeader = () => {
    const {activeShelf} = this.state
    const {label} = bookshelvesList.find(
      eachShelfItem => activeShelf === eachShelfItem.value,
    )
    return (
      <HeaderContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const darkThemeHeading = isDarkTheme
            ? 'bookshelves-dark-heading-text'
            : ''

          return (
            <div className="book-shelf-header-container">
              <h1 className={`header-heading ${darkThemeHeading}`}>
                {label} Books
              </h1>
              <div className="desktop-search-input-container">
                {this.renderSearchInput()}
              </div>
            </div>
          )
        }}
      </HeaderContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div className="book-shelves-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getBooksData()
  }

  renderFailureView = () => (
    <HeaderContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const darkThemeDescription = isDarkTheme
          ? 'bookshelves-dark-description-text'
          : ''

        return (
          <div className="book-shelves-failure-view">
            <img
              className="book-shelves-failure-view-image"
              src="https://res.cloudinary.com/gottumukkala/image/upload/v1670324059/Book%20Hub%20Mini%20Project/Group_7522_cza4zl.png"
              alt="failure view"
            />
            <p
              className={`book-shelves-failure-view-description ${darkThemeDescription}`}
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

  renderBooks = booksList => (
    <ul className="book-items-details-container">
      {booksList.map(eachBook => (
        <BookItem key={eachBook.id} bookDetails={eachBook} />
      ))}
    </ul>
  )

  renderNoBooksView = () => {
    const {searchInput} = this.state

    return (
      <HeaderContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const darkThemeDescription = isDarkTheme
            ? 'bookshelves-dark-description-text'
            : ''

          return (
            <div className="no-books-view-container">
              <img
                className="no-books-view-image"
                src="https://res.cloudinary.com/gottumukkala/image/upload/v1670324059/Book%20Hub%20Mini%20Project/Asset_1_1_khdwtq.png"
                alt="no books"
              />
              <p
                className={`no-books-view-description ${darkThemeDescription}`}
              >
                Your search for {searchInput} did not find any matches.
              </p>
            </div>
          )
        }}
      </HeaderContext.Consumer>
    )
  }

  renderSuccessView = () => {
    const {booksData} = this.state
    const booksLength = booksData.length
    const halfIndex = Math.floor((booksLength + 1) / 2)
    const leftSideBooksList = booksData.slice(0, halfIndex)
    const rightSideBooksList = booksData.slice(halfIndex)
    const showNoBooksView = booksLength === 0
    return (
      <>
        {showNoBooksView ? (
          this.renderNoBooksView()
        ) : (
          <>
            <div className="all-books-container">
              <div className="left-side-books-container">
                {this.renderBooks(leftSideBooksList)}
              </div>
              <div className="right-side-books-container">
                {this.renderBooks(rightSideBooksList)}
              </div>
            </div>
            <Footer />
          </>
        )}
      </>
    )
  }

  renderAllBooksSection = () => {
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

  renderHeaderAndBooksSection = () => (
    <div className="header-and-books-container">
      {this.renderBookShelfHeader()}
      {this.renderAllBooksSection()}
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="bookshelves-container">
          {this.renderShelves()}
          {this.renderHeaderAndBooksSection()}
        </div>
      </>
    )
  }
}

export default Bookshelves

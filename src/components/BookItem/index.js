import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import HeaderContext from '../../context/HeaderContext'
import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {id, title, coverPic, authorName, rating, readStatus} = bookDetails

  return (
    <HeaderContext.Consumer>
      {value => {
        const {updateActiveNavId, isDarkTheme} = value

        const onClickSlickItem = () => {
          updateActiveNavId('')
        }

        const darkThemeHeading = isDarkTheme
          ? 'book-item-details-dark-heading-text'
          : ''
        const darkThemeDescription = isDarkTheme
          ? 'book-item-details-dark-description-text'
          : ''

        return (
          <Link
            to={`/books/${id}`}
            className="book-item-nav-link"
            onClick={onClickSlickItem}
          >
            <div className="book-item-cover-pic-info-container">
              <img className="book-item-cover-pic" src={coverPic} alt={title} />
              <div className="book-item-info-container">
                <h1 className={`book-item-title ${darkThemeHeading}`}>
                  {title}
                </h1>
                <p className={`book-item-author-name ${darkThemeDescription}`}>
                  {authorName}
                </p>
                <div className="book-item-rating-container">
                  <p
                    className={`book-item-rating-text ${darkThemeDescription}`}
                  >
                    Avg Rating
                  </p>
                  <BsFillStarFill color="#FBBF24" size={15} />
                  <p className={`book-item-rating ${darkThemeDescription}`}>
                    {rating}
                  </p>
                </div>
                <p className={`book-item-status-text ${darkThemeDescription}`}>
                  Status:
                  <span className="book-item-status"> {readStatus}</span>
                </p>
              </div>
            </div>
          </Link>
        )
      }}
    </HeaderContext.Consumer>
  )
}

export default BookItem

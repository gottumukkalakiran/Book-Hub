import HeaderContext from '../../context/HeaderContext'
import FavoriteItem from '../FavoriteItem'
import './index.css'

const FavoritesList = () => (
  <HeaderContext.Consumer>
    {value => {
      const {favoritesList} = value

      return (
        <ul className="favorites-list">
          {favoritesList.map(eachItem => (
            <FavoriteItem key={eachItem.id} cartItemDetails={eachItem} />
          ))}
        </ul>
      )
    }}
  </HeaderContext.Consumer>
)

export default FavoritesList

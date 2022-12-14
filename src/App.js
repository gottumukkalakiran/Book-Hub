import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import BookItemDetails from './components/BookItemDetails'
import Bookshelves from './components/Bookshelves'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import HeaderContext from './context/HeaderContext'
import Favorites from './components/Favorites'
import './App.css'

class App extends Component {
  state = {
    showNavIcons: false,
    activeNavId: '',
    isDarkTheme: false,
    favoritesList: [],
  }

  updateActiveNavId = navId => {
    this.setState({activeNavId: navId})
  }

  onToggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  onToggleIcon = () => {
    this.setState(prevState => ({
      showNavIcons: !prevState.showNavIcons,
    }))
  }

  onClose = () => {
    this.setState({showNavIcons: false})
  }

  removeAllFavorites = () => {
    this.setState({favoritesList: []})
    localStorage.setItem('favorites_list', [])
  }

  addFavorites = book => {
    const {favoritesList} = this.state
    const bookObject = favoritesList.find(eachBook => eachBook.id === book.id)
    if (bookObject === undefined) {
      this.setState(prevState => ({
        favoritesList: [...prevState.favoritesList, book],
      }))
    }
  }

  removeFavorites = id => {
    const {favoritesList} = this.state
    const updatedFavoritesList = favoritesList.filter(
      eachItem => eachItem.id !== id,
    )

    this.setState({favoritesList: updatedFavoritesList})
  }

  render() {
    const {showNavIcons, activeNavId, isDarkTheme, favoritesList} = this.state
    const appBg = isDarkTheme ? 'dark-theme' : 'light-theme'
    return (
      <HeaderContext.Provider
        value={{
          showNavIcons,
          activeNavId,
          updateActiveNavId: this.updateActiveNavId,
          onToggleIcon: this.onToggleIcon,
          onClose: this.onClose,
          isDarkTheme,
          onToggleTheme: this.onToggleTheme,
          favoritesList,
          removeAllFavorites: this.removeAllFavorites,
          removeFavorites: this.removeFavorites,
          addFavorites: this.addFavorites,
        }}
      >
        <div className={`app-container ${appBg}`}>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/shelf" component={Bookshelves} />
            <ProtectedRoute
              exact
              path="/books/:id"
              component={BookItemDetails}
            />
            <ProtectedRoute exact path="/favorites" component={Favorites} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </div>
      </HeaderContext.Provider>
    )
  }
}

export default App

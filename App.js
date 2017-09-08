import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import { Font } from 'expo'
import { AsyncStorage } from 'react-native'
import Main from './components/Main'
import Song from './components/Song'
import Favorites from './components/Favorites'
import LoadingView from './components/LoadingView'


class App extends Component {
  state = {
    fontsAreLoaded: false,
    favorites: [],
  }

  async componentWillMount () {
    await AsyncStorage.removeItem('favorites') // Used for debug purposes
    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    })

    this.setState({ fontsAreLoaded: true })
  }

  render () {
    if (!this.state.fontsAreLoaded) {
      return <LoadingView />
    }

    return (
      <Main {...this.props} />
    )
  }
}

const Navigator = StackNavigator({
  Main: { screen: App },
  Song: { screen: Song },
  Favorites: { screen: Favorites },
}, {
  headerMode: 'none',
  cardStyle: {
    backgroundColor: '#232323',
    opacity: 1,
  },
})

export default Navigator

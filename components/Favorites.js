import React, { Component } from 'react'
import propTypes from 'prop-types'
import { AsyncStorage, View } from 'react-native'
import { ListView } from '@shoutem/ui'
import Swipeout from 'react-native-swipeout'
import NavigationBar from './ui/NavigationBar'
import BackButton from './ui/BackButton'
import SongListItem from './ui/SongListItem'
import Empty from './Empty'

const wrapperStyle = {
  backgroundColor: '#232323',
  flex: 1,
}

class Favorites extends Component {
  state = {
    loading: true,
    favorites: [],
  }

  static navigationOptions = {
    title: 'Favoriter',
  }

  async componentWillMount () {
    const data = await AsyncStorage.getItem('favorites')
    if (data !== null) {
      this.setState({ loading: false, favorites: JSON.parse(data) })
    } else {
      this.setState({ loading: false })
    }
  }

  _goBack = () => {
    this.props.navigation.goBack()
  }

  _navigateToSong = song => this.props.navigation.navigate('Song', { song })


  render () {
    return (
      <View style={wrapperStyle}>
        { !this.state.loading &&
          <View style={wrapperStyle}>
            <NavigationBar
              leftComponent={<BackButton onPress={this._goBack} />}
              title="Favoriter"
            />
            { this.state.favorites.length > 0
              ? <ListView
                data={this.state.favorites}
                renderRow={this._renderRow}
              />
              : <Empty text="Inga favoriter sparade" />
            }
          </View>
        }
      </View>
    )
  }

  _deleteRow = async (song) => {
    const list = this.state.favorites.filter(s => s.index !== song.index)
    await AsyncStorage.setItem('favorites', JSON.stringify(list))
    this.setState({ favorites: list })
  }

  _renderRow = (song) => {
    const swipeBtns = [{
      text: 'Radera',
      backgroundColor: '#990000',
      underlayColor: 'rgba(0, 0, 0, 0.6)',
      onPress: () => { this._deleteRow(song) }
    }]

    return (
      <Swipeout right={swipeBtns}
        autoClose={true}
        style={{ backgroundColor: '#333' }}
      >
        <SongListItem
          title={song.title}
          subtitle={song.melodyTitle}
          onPress={() => this._navigateToSong(song)}
        />
      </Swipeout>
    )
  }
}

Favorites.propTypes = {
  navigation: propTypes.object.isRequired,
}

export default Favorites


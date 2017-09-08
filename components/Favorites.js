import React, { Component } from 'react'
import propTypes from 'prop-types'
import { AsyncStorage, View } from 'react-native'
import { ListView } from '@shoutem/ui'
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
          <View style={{ paddingBottom: 75 }}>
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

  _renderRow = song => (
    <SongListItem
      title={song.title}
      subtitle={song.melodyTitle}
      onPress={() => this._navigateToSong(song)}
    />
  )
}

Favorites.propTypes = {
  navigation: propTypes.object.isRequired,
}

export default Favorites


import React, { Component } from 'react'
import propTypes from 'prop-types'
import { View } from 'react-native'
import SearchBar from 'react-native-searchbar'
import { ListView, Icon, Text } from '@shoutem/ui'
import LoadingView from './LoadingView'
import Empty from './Empty'
import NavigationBar from './ui/NavigationBar'
import SearchButton from './ui/SearchButton'
import FavButton from './ui/FavButton'
import SongListItem from './ui/SongListItem'


class SongList extends Component {
  state = {
    normalizedSongs: [],
    searchSongs: [],
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.songs.length > 0) {
      const normalizedSongs = nextProps.songs.map(({
        index, title, melodyTitle, categoryTitle,
      }) => ({
        index, title, melodyTitle, categoryTitle,
      }))
      this.setState({
        normalizedSongs,
        searchSongs: normalizedSongs,
      })
    }
  }

  render () {
    return (
      <View>
        <SearchBar
          ref={ref => this.searchBar = ref} // eslint-disable-line
          data={this.state.normalizedSongs}
          handleResults={this._handleResults}
          handleChangeText={this._handleChange}
          onBack={this._handleBack}
          backButton={<Icon name="back" style={{ paddingTop: 7, color: '#fff' }} />}
          closeButton={<Icon name="close" style={{ paddingTop: 7, color: '#fff' }} />}
          style={{ zIndex: 10 }}
          allDataOnEmptySearch
          keyboardAppearance="dark"
          autoCorrect={false}
          backgroundColor="#333"
          placeholder="Sök..."
          placeholderTextColor="#666"
          fontSize={18}
          fontFamily="Rubik-Regular"
          iconColor="#fff"
          textColor="#ccc"
        />

        <NavigationBar
          leftComponent={<SearchButton onPress={() => this.searchBar.show()} />}
          rightComponent={<FavButton onPress={this._navigateToFavorites} active />}
          title="Sångboken"
        />

        {
          this.props.loading || this.state.searching ? <LoadingView /> :
            <ListView
              data={this.state.searchSongs}
              renderRow={this._renderRow}
            />
        }

        {
          !this.props.loading && !this.state.searching && this.state.searchSongs.length === 0 &&
          <Empty text="Inga sånger hittade" />
        }
      </View>
    )
  }

  _navigateToSong = (song) => {
    this.props.navigation.navigate('Song', { song: this.props.songs[song.index] })
  }

  _navigateToFavorites = () => {
    this.props.navigation.navigate('Favorites')
  }

  _handleResults = (searchSongs) => {
    this.setState({ searchSongs, searching: false })
  }

  _handleChange = () => {
    this.setState({ searching: true })
  }

  _handleBack = () => {
    this.setState({ searchSongs: this.state.normalizedSongs })
    this.searchBar.hide()
  }

  /* Unused for now, a bug preventing it from being usable */
  _getSectionHeaderId = (song) => {
    const { title } = song

    // If the first character is a letter, return it
    if (title[0].toUpperCase() !== title[0].toLowerCase()) {
      return title[0]
    } else if (!isNaN(title[0])) { // eslint-disable-line

      // If it's a number, return '#'
      return '#'
    }

    // If it's not a letter/number, return '@'
    return '@'
  }

  /* Unused for now, a bug preventing it from being usable */
  _renderSectionHeader = letter => (
    <View style={{ backgroundColor: '#333', paddingLeft: 15, padding: 3 }} >
      <Text style={{ color: '#ccc' }}>{ letter }</Text>
    </View>
  )

  _renderRow = song => (
    <SongListItem
      title={song.title}
      subtitle={song.melodyTitle}
      onPress={() => this._navigateToSong(song)}
    />
  )
}

SongList.propTypes = {
  navigation: propTypes.object.isRequired,
  loading: propTypes.bool.isRequired,
  songs: propTypes.array.isRequired,
}

export default SongList

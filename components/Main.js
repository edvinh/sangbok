import React, { Component } from 'react'
import propTypes from 'prop-types'
import { View } from '@shoutem/ui'
import he from 'he'
import SongList from './SongList'
import * as API from '../api'

const wrapperStyle = {
  flex: 1,
  backgroundColor: '#232323',
}

class Main extends Component {
  state = {
    songs: [],
    loading: true,
  }

  static navigationOptions = {
    title: 'Sångboken',
  }

  componentWillMount () {
    this._getSongs()
  }

  _getSongs = async () => {
    if (this.state.songs.length > 0) {
      this.setState({ loading: false })
      return
    }

    const res = await API.getSongs()

    // Convert from Object to array and add the id & index to each object
    let songs = Object.keys(res).map((key) => {
      const el = res[key]

      // Decode HTML chars
      el.lyrics = el.lyrics && he.decode(el.lyrics)
      el.title = el.title && he.decode(el.title)
      el.melodyTitle = el.melodyTitle && he.decode(el.melodyTitle)
      return { ...el, id: key }
    })

    // Sort the songs in alphabetical order
    songs = songs.sort((a, b) => {
      if (a.title === b.title) { return 0 }
      return a.title < b.title ? -1 : 1
    })

    // Add the index to the object (used for easier searching)
    songs = songs.map((song, index) => ({ ...song, index }))
    this.setState({ songs, loading: false })
  }

  render () {
    return (
      <View style={wrapperStyle}>
        <SongList
          navigation={this.props.navigation}
          loading={this.state.loading}
          songs={this.state.songs}
        />
      </View>
    )
  }
}

Main.propTypes = {
  navigation: propTypes.object.isRequired,
}

export default Main

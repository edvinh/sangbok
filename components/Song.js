import React, { Component } from 'react'
import propTypes from 'prop-types'
import { AsyncStorage, ScrollView } from 'react-native'
import { Subtitle, Text, Divider, View } from '@shoutem/ui'
import Toast, { DURATION } from 'react-native-easy-toast'
import NavigationBar from './ui/NavigationBar'
import FavButton from './ui/FavButton'
import BackButton from './ui/BackButton'

const scrollViewStyle = {
  marginTop: 10,
  paddingBottom: 50,
  alignItems: 'center',
  paddingLeft: 10,
  paddingRight: 10,
}

const wrapperStyle = {
  backgroundColor: '#232323',
  flex: 1,
}

const toastStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  borderRadius: 50,
  padding: 15,
}

const lyricsStyle = {
  color: '#ccc',
  textAlign: 'center',
  fontSize: 18,
  lineHeight: 25,
}

const melodyStyle = { color: '#999' }

class Song extends Component {
  constructor (props) {
    super(props)

    this.state = {
      song: props.navigation.state.params.song,
      favorite: false,
    }
  }

  async componentWillMount () {
    const data = await AsyncStorage.getItem('favorites')
    let list = []
    if (data !== null) {
      list = JSON.parse(data)
    }

    if (list.length > 0) {
      const el = list.find(i => i.index === this.state.song.index)

      // Found as a favorite in store
      if (el) {
        this.setState({ favorite: true })
      }
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.song.title,
  })

  _goBack = () => {
    this.props.navigation.goBack()
  }

  _handleFavorite = async () => {
    const data = await AsyncStorage.getItem('favorites')
    let list = []
    if (data !== null) {
      list = JSON.parse(data)
    }

    // If the song is not a favorite, add it
    if (!this.state.favorite) {
      list.push(this.state.song)
      await AsyncStorage.setItem('favorites', JSON.stringify(list))
      this.toast.show('Tillagd i favoriter.', DURATION.LENGTH_LONG)
      return this.setState({ favorite: true })
    }

    // else, remove it
    list = list.filter(i => i.index !== this.state.song.index)
    await AsyncStorage.setItem('favorites', JSON.stringify(list))
    this.toast.show('Borttagen från favoriter.', DURATION.LENGTH_LONG)
    return this.setState({ favorite: false })
  }

  render () {
    const {
      lyrics, title, melodyTitle,
    } = this.state.song

    return (
      <View style={wrapperStyle}>
        <NavigationBar
          leftComponent={<BackButton onPress={this._goBack} />}
          rightComponent={<FavButton active={this.state.favorite} onPress={this._handleFavorite}/>}
          title={title}
        />

        <ScrollView contentContainerStyle={scrollViewStyle}>
          <Subtitle style={melodyStyle}>Mel. { melodyTitle }</Subtitle>
          <Divider />
          <Text style={lyricsStyle}>{ lyrics }</Text>
        </ScrollView>

        <Toast ref={(ref) => { this.toast = ref }} style={toastStyle} />
      </View>
    )
  }
}

Song.propTypes = {
  navigation: propTypes.object.isRequired,
}

export default Song


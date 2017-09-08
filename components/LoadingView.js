import React, { Component } from 'react'
import { View } from 'react-native'
import { DangerZone } from 'expo'
import loadingAnim from '../assets/animations/loading.json'
import Dimensions from 'Dimensions' // eslint-disable-line

const { Lottie } = DangerZone

const { width, height } = Dimensions.get('window')

const wrapperStyle = {
  flex: 1,
  backgroundColor: '#232323',
}

const animationStyle = {
  backgroundColor: '#232323',
  width: 200,
  height: 200,
  marginTop: ((height / 2) - 100) / 3,
  marginLeft: ((width / 2) - 100) / 2,
}

export default class LoadingView extends Component {
  state = {
    animation: loadingAnim,
  }

  componentDidMount () {
    this.animation.play()
  }

  render () {
    return (
      <View style={wrapperStyle}>
        {
          this.state.animation &&
          <Lottie
            ref={(animation) => {
              this.animation = animation
            }}
            loop
            speed={1.5}
            style={animationStyle}
            source={this.state.animation}
          />
        }
      </View>
    )
  }
}

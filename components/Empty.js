import React from 'react'
import { View } from 'react-native'
import { Text } from '@shoutem/ui'
import propTypes from 'prop-types'

const viewStyle = {
  paddingTop: 75,
  backgroundColor: '#232323',
  alignItems: 'center',
  justifyContent: 'center',
}

const intTextStyle = {
  color: '#ccc',
  fontSize: 18,
  paddingTop: 20,
}

const emojiTextStyle = {
  fontSize: 58,
  color: '#666',
  paddingTop: 50,
}

const emojis = ['(ಥ_ಥ)', '(ಥ﹏ಥ)', 'ლ(ಠ益ಠლ)', '╰(ಥдಥ)ノ', '(ノಠ益ಠ)ノ', '(︺︹︺)']

const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)]

const Empty = ({ text, containerStyle, textStyle }) => (
  <View style={{ ...viewStyle, ...containerStyle }}>
    <Text style={emojiTextStyle}>{ randomEmoji() }</Text>
    <Text style={{ ...intTextStyle, ...textStyle }}>{text}</Text>
  </View>
)

Empty.propTypes = {
  text: propTypes.string.isRequired,
  containerStyle: propTypes.object,
  textStyle: propTypes.object,
}

Empty.defaultProps = {
  containerStyle: {},
  textStyle: {},
}

export default Empty

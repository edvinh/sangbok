
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Subtitle, Title, Tile, Divider, Row, Icon } from '@shoutem/ui'
import Dimensions from 'Dimensions' // eslint-disable-line
import propTypes from 'prop-types'

const { width } = Dimensions.get('window')

const wrapperStyle = {
  backgroundColor: '#232323',
}

const rowStyle = {
  backgroundColor: '#232323',
  padding: 0,
}

const tileStyle = {
  backgroundColor: '#232323',
  padding: 16,
  minWidth: width - 40,
  maxWidth: width - 40,
}

const titleStyle = { color: '#bbb' }
const subtitleStyle = { color: '#888' }
const iconStyle = { color: '#fff' }
const dividerStyle = { borderColor: '#333' }

const SongListItem = ({ title, subtitle, onPress }) => (
  <View style={wrapperStyle}>
    <TouchableOpacity onPress={onPress}>
      <Row style={rowStyle}>
        <Tile style={tileStyle}>
          <Title style={titleStyle} >{ title }</Title>
          <Subtitle style={subtitleStyle} >{ subtitle }</Subtitle>
        </Tile>
        <Icon style={iconStyle} styleName="disclosure" name="right-arrow" />
      </Row>
      <Divider styleName="line" style={dividerStyle} />
    </TouchableOpacity>
  </View>
)

SongListItem.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  onPress: propTypes.func,
}

SongListItem.defaultProps = {
  title: '',
  subtitle: '',
  onPress: () => {},
}

export default SongListItem

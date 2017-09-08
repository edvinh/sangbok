import React from 'react'
import { Icon, Button } from '@shoutem/ui'
import propTypes from 'prop-types'

const iconStyle = {
  paddingLeft: 10,
  color: '#fff',
}

const FavButton = ({ onPress, active }) => (
  <Button styleName="clear" onPress={onPress}>
    <Icon name={active ? "add-to-favorites-on" : "add-to-favorites-off"} style={iconStyle} />
  </Button>
)

FavButton.propTypes = {
  onPress: propTypes.func,
  active: propTypes.bool,
}

FavButton.defaultProps = {
  onPress: () => {},
  active: false,
}

export default FavButton

import React from 'react'
import { Icon, Button } from '@shoutem/ui'
import propTypes from 'prop-types'

const iconStyle = {
  paddingLeft: 10,
  color: '#fff',
}

const BackButton = ({ onPress }) => (
  <Button styleName="clear" onPress={onPress}>
    <Icon name="back" style={iconStyle} />
  </Button>
)

BackButton.propTypes = {
  onPress: propTypes.func,
}

BackButton.defaultProps = {
  onPress: () => {},
}

export default BackButton

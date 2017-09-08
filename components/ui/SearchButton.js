import React from 'react'
import { Icon, Button } from '@shoutem/ui'
import propTypes from 'prop-types'

const iconStyle = {
  paddingLeft: 10,
  color: '#fff',
}

const SearchButton = ({ onPress }) => (
  <Button styleName="clear" onPress={onPress}>
    <Icon name="search" style={iconStyle} />
  </Button>
)

SearchButton.propTypes = {
  onPress: propTypes.func,
}

SearchButton.defaultProps = {
  onPress: () => {},
}

export default SearchButton

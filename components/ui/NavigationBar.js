import React from 'react'
import { NavigationBar, Title } from '@shoutem/ui'
import propTypes from 'prop-types'

const navbarStyle = {
  container: {
    backgroundColor: '#232323',
    borderBottomColor: '#232323',
    borderColor: '#232323',
    zIndex: 1,
  },
}

const titleStyle = {
  textAlign: 'center',
  color: '#fff',
}

const NavBar = ({
  leftComponent, rightComponent, title, navStyle,
}) => (
  <NavigationBar
    styleName="inline"
    style={{ ...navbarStyle, ...navStyle }}
    leftComponent={leftComponent}
    rightComponent={rightComponent}
    centerComponent={<Title numberOfLines={2} style={titleStyle}>{ title.toUpperCase() }</Title>}
  />
)

NavBar.propTypes = {
  title: propTypes.string,
  leftComponent: propTypes.element,
  rightComponent: propTypes.element,
  navStyle: propTypes.object,
}

NavBar.defaultProps = {
  title: '',
  leftComponent: null,
  rightComponent: null,
  navStyle: {},
}

export default NavBar

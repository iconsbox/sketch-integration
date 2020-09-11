import React from 'react';
import PropTypes from 'prop-types';

const PackIcons = ({ icons }) => Object.keys(icons).map(icon => {
  const Icon = icons[icon];
  return (
    <Icon
      style={{
        height: 46,
        width: 46,
        margin: 4,
        backgroundColor: '#fff',
        color: '#fff',
        padding: 8,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }} name={icon} width={30} height={30} key={icon} />
  )});

PackIcons.propTypes = {
  icons: PropTypes.object,
};

export default PackIcons;

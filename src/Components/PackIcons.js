import React from 'react';
import PropTypes from 'prop-types';

const PackIcons = ({ icons }) => Object.keys(icons).map(icon => {
  const Icon = icons[icon];
  return (
    <Icon
      style={{
        margin: 12,
        borderRadius: 5,
      }} stroke="#fff" name={icon} width={30} height={30} key={icon} />
  )});

PackIcons.propTypes = {
  icons: PropTypes.object,
};

export default PackIcons;

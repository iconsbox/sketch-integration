import React from 'react';
import { Page, Artboard} from 'react-sketchapp';

import PackageIcons from './PackIcons';
import * as Icons from '../../IconBox/index';

const getTableCount = count => {
  const width = Math.ceil(Math.sqrt(count));
  const height = Math.ceil(count / width);

  return {width, height};
};

const Document = () =>
  <Page name="IconBox">
    {Object.keys(Icons).map(packName => {
      const Pack = Icons[packName];
      const table = getTableCount(Object.keys(Pack).length);
      return <Artboard
        name={packName}
        style={{
          backgroundColor: '#000',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 150,
          width: table.width * 54,
          height: table.height * 54,
        }}
      >
        <PackageIcons name="eva" icons={Pack} table={table}/>
      </Artboard>})}
  </Page>;

export default Document;


/*
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { render, Artboard, Text, View } from 'react-sketchapp';
import chroma from 'chroma-js';

// take a hex and give us a nice text color to put over it
const textColor = (hex) => {
  const vsWhite = chroma.contrast(hex, 'white');
  if (vsWhite > 4) {
    return '#FFF';
  }
  return chroma(hex).darken(3).hex();
};

const Swatch = ({ name, hex }) => (
  <View
    name={`Swatch ${name}`}
    style={{
      height: 96,
      width: 96,
      margin: 4,
      backgroundColor: hex,
      padding: 8,
    }}
  >
    <Text
      name="Swatch Name"
      style={{ color: textColor(hex), fontWeight: 'bold', fontFamily: 'Helvetica' }}
    >
      {name}
    </Text>
    <Text name="Swatch Hex" style={{ color: textColor(hex) }}>
      {hex}
    </Text>
  </View>
);

const Color = {
  hex: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Swatch.propTypes = Color;

const Document = ({ colors }) => (
  <Artboard
    name="Swatches"
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: (96 + 8) * 4,
    }}
  >
    {Object.keys(colors).map((color) => (
      <Swatch name={color} hex={colors[color]} key={color} />
    ))}
  </Artboard>
);


 */

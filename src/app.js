import * as React from 'react';
import { render } from 'react-sketchapp';
import Document from './Components/Document';

/**
 * Render entire apps
 */
export default () => {
  // eslint-disable-next-line no-undef
  render(<Document />, context.document.currentPage());
};

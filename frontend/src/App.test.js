import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'

import App from './App';

describe('App component', () => {

  test('should render app ', () => {
    render(
      <App />,{wrapper: BrowserRouter}
    )
  })

});
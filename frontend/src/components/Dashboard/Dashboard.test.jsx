import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { Dashboard } from './Dashboard';

describe('Test the Dashboard Component', () => {
  test('Renders without crashing', () => {
    render(<Dashboard />);
  });
});

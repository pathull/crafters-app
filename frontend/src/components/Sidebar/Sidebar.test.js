import { Sidebar } from "./Sidebar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';

describe('Sidebar component', () => {

  test('should include logout button when logged in', () => {
    render(
      <Sidebar />, { wrapper: BrowserRouter }
    )
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
  })


  test('it should hide titles on toggle click', async () => {

    const { getByTestId } = render(
      <Sidebar />, { wrapper: BrowserRouter }
    )
    const toggleButton = getByTestId('toggle-button');
    const profileButton = screen.getByText('Profile');

    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(toggleButton).toHaveClass('rotate-180');
      expect(profileButton).toHaveClass('hidden');

    })
  })
})
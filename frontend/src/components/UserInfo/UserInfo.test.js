import { render } from "@testing-library/react";
import { UserInfo } from "./UserInfo";
import { expect } from '@jest/globals';
import { screen } from '@testing-library/react';
import { UserContext } from '../../context/UserContext';
import { userMock, contextUserMock } from '../../mocks/UserMock';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

describe('UserInfo component', () => {
  test('it should render the component with an Edit profile Button', () => {
    const userData = contextUserMock;
    const user = userMock;
    const postNumber = 5;
    const numberOfFavs = 5;
    render(
      <UserContext.Provider value={{ userData }}>
        <UserInfo user={user} postNumber={postNumber} numberOfFavs={numberOfFavs}/>
      </UserContext.Provider>, {wrapper: BrowserRouter}
    )
    expect(screen.getByText('Edit profile')).toBeInTheDocument();
    expect(screen.getByText('favs')).toBeInTheDocument();
    expect(screen.getByText('posts')).toBeInTheDocument();
  })

  test('it should change pages on button click', async () => {
    const userData = contextUserMock;
    const user = userMock;
    const postNumber = 5;
    const numberOfFavs = 5;

    const component =  renderer.create(
      <MemoryRouter>
        <UserContext.Provider value={{ userData }}>
          <UserInfo user={user} postNumber={postNumber} numberOfFavs={numberOfFavs}/>
        </UserContext.Provider>
      </MemoryRouter>
    ).toJSON();

    expect(component).toMatchSnapshot();

  })
});
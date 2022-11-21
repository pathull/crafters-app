import { PostLists } from './PostLists';
import { mockPostList } from '../../mocks/PostListMocks';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, useLocation } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import { MemoryRouter } from 'react-router-dom';

describe('PostList component', () => {

  test('should render the postsList', async () => {
    const mockPosts = mockPostList;
    const context = jest.fn();

    const { getByAltText } = await render(
      <UserContext.Provider value={{ context }}>
        <PostLists postsList={mockPosts} />
      </UserContext.Provider>, { wrapper: BrowserRouter }
    )
    const image = getByAltText('a palm tree');
    expect(image).toBeInTheDocument();
  })

  test('should render text from empty wish list page', () => {
    const emptyMockPosts = [];
    render(
      <PostLists postsList={emptyMockPosts} />, { wrapper: BrowserRouter }
    )
    expect(screen.getByText('No posts inserted yet')).toBeInTheDocument();
  })

  // jest.mock("react-router-dom", () => ({
  //   ...jest.requireActual("react-router-dom"),
  //   useLocation: () => ({
  //     pathname: "/profile"
  //   })
  //}));
  test('it should render the create post button from empty profile page', () => {
    const emptyMockPosts = [];

    render(
      <MemoryRouter initialEntries={[{ pathname: '/profile' }]}>
        <PostLists postsList={emptyMockPosts} />
      </MemoryRouter>
    )
    expect(screen.getByText('Create Post')).toBeInTheDocument();
  })
});

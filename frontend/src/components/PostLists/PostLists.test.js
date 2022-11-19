import { PostLists } from './PostLists';
import { mockPostList } from '../../mocks/PostListMocks';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';

describe('PostList component', () => {

  test('should render the postsList', () => {
    const mockPosts = mockPostList;
    const context = jest.fn();
    render(
    <UserContext.Provider value={{ context }}>
      <PostLists postsList={mockPosts}/>
    </UserContext.Provider> , {wrapper: BrowserRouter}
    )
  })

  test('should render text when list is empty', () => {
    const emptyMockPosts = [];
    render(
      <PostLists postsList={emptyMockPosts}/>, {wrapper: BrowserRouter}
    )
    expect(screen.getByText('No posts inserted yet')).toBeInTheDocument();
  })
});

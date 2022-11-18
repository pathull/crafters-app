import { PostLists } from './PostLists';
import { mockWishList } from '../../mocks/WishListMocks';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';

describe('PostList component', () => {

  test('should render the wishlist', () => {
    const postList = mockWishList;
    const context = jest.fn();
    render(
    <UserContext.Provider value={{ context }}>
      <PostLists postsList={postList}/>
    </UserContext.Provider> , {wrapper: BrowserRouter}
    )
  })

});

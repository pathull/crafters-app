
import { WishList } from './WishList';
import { mockWishList } from '../../mocks/WishListMocks';

import { test, expect } from '@jest/globals';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserContext } from '../../context/UserContext';
import { BrowserRouter } from 'react-router-dom';
// jest.mock('../../services/fetchWishList', () => ({
//   getListWishListByUser: () => (mockWishList)
// }));

describe('Wishlist component', () => {

  it('should get wishlist from proper user', async () => {
    const user = {id: 1}
    render(
      <UserContext.Provider value={{ user }}>
        <WishList/>
      </UserContext.Provider>, {wrapper: BrowserRouter}
    )


  })

});


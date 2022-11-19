
import { WishList } from './WishList';
import nock from 'nock';
import { env } from '../../helpers/env';
import { mockPostList } from '../../mocks/PostListMocks';

import { expect } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { UserContext } from '../../context/UserContext';
import { BrowserRouter } from 'react-router-dom';

describe('Wishlist component', () => {

  it('should get wishlist without crashing', async () => {

    nock(`${env.urlBase}`)
    .persist()
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .get(`/wishlist/1`)
    .reply(200, mockPostList);

    const user = {id: 1}
    render(
      <UserContext.Provider value={{ user }}>
        <WishList/>
      </UserContext.Provider>, {wrapper: BrowserRouter}
    )

    await waitFor(()=> {
      expect(screen.findByAltText('a palm tree')
      ).toBeDefined();
    });
  });

});


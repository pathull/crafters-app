
import { SinglePost } from "./SinglePost";
import { singleMock, singleMockNew, mockInfoOnWishlist } from '../../mocks/SinglePostMock';
import { MockPostListNew } from '../../mocks/PostListMocks';
import nock from 'nock';
import { env } from '../../helpers/env';
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";

//renders single post/wish
nock(`${env.urlBase}`)
  .persist()
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
  })
  .get(`/wishlist/user/1/post/2`)
  .reply(200, mockInfoOnWishlist);

//post/delete a wish
nock(`${env.urlBase}`)
  .persist()
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
  })
  .post(`/wishlist/`)
  .reply(201, mockInfoOnWishlist);

nock(`${env.urlBase}`)
  .persist()
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
  })
  .delete(`/wishlist/user/1/post/99`)
  .reply(202, {wishList: false});

//get updates wishlist
nock(`${env.urlBase}`)
  .persist()
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
  })
  .get(`/wishlist/user/1/`)
  .reply(200, MockPostListNew);

describe('Single post component', () => {
  it('should be added to the wishlist on star is active', async () => {
    const userData = {id: 1};
    const post = singleMock;
    render(
      <UserContext.Provider value={{ userData }}>
        <SinglePost post={post}/>
      </UserContext.Provider>, {wrapper: BrowserRouter}
    )
    await waitFor(()=> {
      expect(screen.getByAltText('Verve')).toBeDefined();
    });
  })

  // it('should be removed from the wishlist on star is not active', async () => {
  //   const userData = {id: 1};
  //   const post = singleMockNew;
  //   render(
  //     <UserContext.Provider value={{ userData }}>
  //       <SinglePost post={post}/>
  //     </UserContext.Provider>, {wrapper: BrowserRouter}
  //   )
  //   await waitFor(()=> {
  //     expect(screen.getByText('')).toBeDefined();
  //   });
  // })

});
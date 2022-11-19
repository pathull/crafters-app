
import { SinglePost } from "./SinglePost";
import { singleMock, mockInfoNotOnWishlist, mockInfoOnWishlist } from '../../mocks/SinglePostMock';
import userEvent from '@testing-library/user-event'
import nock from 'nock';
import { env } from '../../helpers/env';
import { getByTestId, render, screen, waitFor, expect } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";


//addPostToWishList
// nock(`${env.urlBase}`)
//   .persist()
//   .defaultReplyHeaders({
//     'access-control-allow-origin': '*',
//   })
//   .post(`/wishlist`)
//   .reply(201, mockInfoOnWishlist);

// //deleteWish
// nock(`${env.urlBase}`)
//   .persist()
//   .defaultReplyHeaders({
//     'access-control-allow-origin': '*',
//   })
//   .delete(`/wishlist/user/1/post/2`)
//   .reply(202, {wishList: false});

// //getListWishListByUser
// nock(`${env.urlBase}`)
//   .persist()
//   .defaultReplyHeaders({
//     'access-control-allow-origin': '*',
//   })
//   .get(`/wishlist/user/1/`)
//   .reply(200, MockPostListNew);

describe('Single post component', () => {
  it('should not be added to the wishlist on star is not active', async () => {
    const userData = {id: 1};
    const post = singleMock;
    //Mock API call
    nock(`${env.urlBase}`)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get(`/wishlist/user/${userData.id}/post/${singleMock.id}`)
      .reply(200, mockInfoNotOnWishlist);

    render(
      <UserContext.Provider value={{ userData }}>
        <SinglePost post={post}/>
      </UserContext.Provider>, {wrapper: BrowserRouter}
    )
    await waitFor(()=> {
      //userEvent.click(screen.getByRole('button'));
      const wishButton = screen.getByTestId('wish-button');
      expect(wishButton).toHaveClass('wishListStar ');
    });
  })

  //getSingleWish
  // nock(`${env.urlBase}`)
  // .defaultReplyHeaders({
  //   'access-control-allow-origin': '*',
  // })
  // .get(`/wishlist/user/1/post/2`)
  // .reply(200, mockInfoOnWishlist);

  // it('should be added to the wishlist on star is not active', async () => {
  //   const userData = {id: 1};
  //   const post = singleMock;
  //   render(
  //     <UserContext.Provider value={{ userData }}>
  //       <SinglePost post={post}/>
  //     </UserContext.Provider>, {wrapper: BrowserRouter}
  //   )
  //   await waitFor(()=> {
  //     expect(screen.getByAltText('a beautiful post')).not.toBeDefined();
  //   });
  // })

});
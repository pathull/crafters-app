import { SinglePost } from "./SinglePost";
import { singleMock, mockInfoNotOnWishlist, mockInfoOnWishlist } from '../../mocks/SinglePostMock';
import userEvent from '@testing-library/user-event'
import nock from 'nock';
import { env } from '../../helpers/env';
import { render, screen, waitFor } from "@testing-library/react";
import { expect } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";


describe('Single post component', () => {
  it('should not be added to the wishlist on star is not active', async () => {
    const userData = { id: 1 };
    const post = singleMock;
    //Mock API call
    nock(`${env.urlBase}`)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get(`/wishlist/user/${userData.id}/post/${singleMock.id}`)
      .reply(200, mockInfoNotOnWishlist);

    const { getByTestId } = render(
      <UserContext.Provider value={{ userData }}>
        <SinglePost post={post} />
      </UserContext.Provider>, { wrapper: BrowserRouter }
    )
    await waitFor(() => {
      //userEvent.click(screen.getByRole('button'));
      const wishButton = screen.getByTestId('wish-button');
      expect(wishButton).toHaveClass('wishListStar ');
      expect(wishButton).not.toHaveClass('wishListStar isActive', { exact: true });
    });
  })

  test('should be added to the wishlist on star is not active', async () => {
    const userData = { id: 1 };
    const post = singleMock;
    //getSingleWish
    nock(`${env.urlBase}`)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get(`/wishlist/user/${userData.id}/post/${singleMock.id}`)
      .reply(200, mockInfoOnWishlist);

    const { getByTestId } = render(
      <UserContext.Provider value={{ userData }}>
        <SinglePost post={post} />
      </UserContext.Provider>, { wrapper: BrowserRouter }
    )
    await waitFor(() => {
      const wishButton = getByTestId('wish-button-star');
      expect(wishButton).not.toHaveClass('wishListStar ', { exact: true });
      expect(wishButton).toHaveClass('wishListStar isActive');
    });
  })

  test('class should change on button click', async () => {
    const userData = { id: 1 };
    const post = singleMock;
    //Mock API calls
    //GetSingleWish
    nock(`${env.urlBase}`)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get(`/wishlist/user/${userData.id}/post/${singleMock.id}`)
      .reply(200, mockInfoNotOnWishlist);

    //addPostToWishList
    nock(`${env.urlBase}`)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .post(`/wishlist`)
      .reply(201, mockInfoOnWishlist);

    const { getByTestId } = render(
      <UserContext.Provider value={{ userData }}>
        <SinglePost post={post} />
      </UserContext.Provider>, { wrapper: BrowserRouter }
    )

    userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(true).toBe(false);
      //update test after refactor
    })

  })

});
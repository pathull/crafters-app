
import { SinglePost } from "./SinglePost";
import { singleMock, singleMockNew } from '../../mocks/SinglePostMock';
import nock from 'nock';
import { env } from '../../helpers/env';
import { render } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";

//renders single post/wish
nock(`${env.urlBase}`)
  .persist()
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
  })
  .get(`/wishlist/user/1/post/2`)
  .reply(200, singleMock);

//post/delete a wish
nock(`${env.urlBase}`)
  .persist()
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
  })
  .post(`/wishlist/`)
  .reply(201, singleMockNew);

nock(`${env.urlBase}`)
  .persist()
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
  })
  .delete(`/wishlist/user/1/post/99`)
  .reply(200, singleMockNew);

//get updates wishlist
nock(`${env.urlBase}`)
  .persist()
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
  })
  .delete(`/wishlist/user/1/post/2`)
  .reply(200, singleMock);

describe('Single post component', () => {
  it('should be removed/added to the wishlist on star click', () => {
    const userData = {id: 1};
    const post = {id: 2};
    render(
      <UserContext.Provider value={{ userData }}>
        <SinglePost post={post}/>
      </UserContext.Provider>, {wrapper: BrowserRouter}
    )

  })

})
import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from '@jest/globals';
import nock from 'nock';
import '@testing-library/jest-dom';
import { mockPostList } from '../../mocks/PostListMocks';
import { DetailsPost } from './DetailsPost';
import { BrowserRouter } from 'react-router-dom';
import { env } from '../../helpers/env';
import { UserContext } from '../../context/UserContext';

describe('DetailsPost testing', () => {
  nock(env.urlBase)
    .persist()
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .get(`/posts/single-post/${1}`)
    .reply(200, mockPostList);

  test('Should render post picture', async () => {
    const userData = { id: 1 };
    render(
      <UserContext.Provider value={{ userData }}>
        <DetailsPost />, ;
      </UserContext.Provider>,
      { wrapper: BrowserRouter }
    ) >
      (await waitFor(() => {
        expect(screen.findByAltText('a palm tree')).toBeDefined();
      }));
  });
});

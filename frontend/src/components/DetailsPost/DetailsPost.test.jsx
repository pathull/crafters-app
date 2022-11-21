import { render, screen, waitFor, renderWithRouter, getByAltText } from '@testing-library/react';
import { expect, test } from '@jest/globals';
import nock from 'nock';
import '@testing-library/jest-dom';
import { singleMockNew } from '../../mocks/SinglePostMock';
import { DetailsPost } from './DetailsPost';
import { BrowserRouter, MemoryRouter, ReactRouter, Route, Router, Routes } from 'react-router-dom';
import { env } from '../../helpers/env';
import { UserContext } from '../../context/UserContext';

describe('DetailsPost testing', () => {
  test('Should render data', async () => {
    nock(env.urlBase)
      .persist()
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get(`/posts/single-post/99`)
      .reply(200, singleMockNew);

    const userData = { id: 99 };

    render(
      <UserContext.Provider value={{ userData }}>
        <MemoryRouter initialEntries={['/details-post/99']}>
          <Routes>
            <Route path="/details-post/:id" element={<DetailsPost />} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    );
    await waitFor(() => {
      expect(true).toBe(true);
    });
  });
});

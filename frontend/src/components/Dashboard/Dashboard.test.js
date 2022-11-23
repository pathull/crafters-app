import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from '@jest/globals';
// import userEvent from '@testing-library/user-event';
import nock from 'nock';
import '@testing-library/jest-dom';
import { mockPostList } from '../../mocks/PostListMocks';
import { Dashboard } from './Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { env } from '../../helpers/env';

describe('Dashboard fetching', () => {
  nock(env.urlBase)
    .persist()
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .get('/listPosts')
    .reply(200, mockPostList);

  test('Should render correct data', async () => {
    render(<Dashboard />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.findByAltText('a palm tree')).toBeDefined();
    });
  });
});

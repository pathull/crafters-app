import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommentInput } from './CommentInput';

describe('Test the CommentInput Component', () => {
  test('Renders without crashing', () => {
    render(<CommentInput idUser={''} idPost={''} setComments={Function} />);
  });

  test('Render single button and button is disabled by default', async () => {
    render(<CommentInput idUser={''} idPost={''} setComments={Function} />);
    expect(await screen.findByRole('button')).toBeDisabled();
    const button = await screen.findAllByRole('button');
    expect(button).toHaveLength(1);
  });

  test('Text area allows input and button then enables', async () => {
    render(<CommentInput idUser={''} idPost={''} setComments={Function} />);
    userEvent.type(screen.getByPlaceholderText(/Add a comment.../i), 'test');
    expect(await screen.findByRole('button')).toBeEnabled();
  });
});

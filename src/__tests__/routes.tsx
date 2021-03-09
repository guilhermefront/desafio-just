import { screen } from '@testing-library/react';
import { Header } from 'components';
import { renderWithRouter } from 'test-util';

test('if header links work correctly', () => {
  renderWithRouter(<Header />);

  expect(screen.getByRole('link', { name: 'cart' })).toHaveAttribute(
    'href',
    '/buy'
  );
});

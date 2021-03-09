import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { ComponentType, ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import productsReducer, { State } from 'slices/products-slice';
import { render as rtlRender } from '@testing-library/react';

export const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

export function renderRedux(
  ui: ReactElement,
  {
    initialState,
    store = configureStore({
      reducer: { products: productsReducer },
      preloadedState: initialState,
    }),
    ...renderOptions
  }: {
    initialState?: { products: State };
    store?: any;
  } = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper as ComponentType, ...renderOptions });
}

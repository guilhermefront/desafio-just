import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from 'types';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(
      'https://api-desafio-front.justdigital.com.br/'
    );
    const data = await response.json();
    return data;
  }
);

export interface State {
  productsList: ProductType[];
  fetchProductsState: 'fulfilled' | 'pending' | 'rejected' | null;
}

const initialState: State = {
  productsList: [],
  fetchProductsState: null,
};

const products = createSlice({
  name: 'productsReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.fetchProductsState = 'pending';
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, { payload }: PayloadAction<{ products: ProductType[] }>) => {
        state.productsList = payload.products;
        state.fetchProductsState = 'fulfilled';
      }
    );
    builder.addCase(fetchProducts.rejected, (state) => {
      state.fetchProductsState = 'rejected';
    });
  },
});

// export {} from products.actions;

export default products.reducer;

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
  total: number;
  cartProductsId: { id: number; qty: number }[];
}

const initialState: State = {
  productsList: [],
  fetchProductsState: null,
  total: 0,
  cartProductsId: [],
};

const products = createSlice({
  name: 'productsReducer',
  initialState,
  reducers: {
    setCartProducts(
      state,
      action: PayloadAction<{
        edit: 'add' | 'remove' | 'reset' | 'qty';

        id?: number;
      }>
    ) {
      const { payload } = action;
      // lógica de adicionar/remover/resetar produtos. Se já existe um produto no estado, ele só acrescenta a quantidade.
      if (payload.edit === 'add' && payload.id) {
        const cartExists = state.cartProductsId.some(
          (product) => product.id === payload.id
        );
        if (cartExists) {
          state.cartProductsId = state.cartProductsId.map((product) =>
            product.id === payload.id
              ? { id: product.id, qty: product.qty + 1 }
              : product
          );
        } else {
          state.cartProductsId.push({ id: payload.id, qty: 1 });
        }
      } else if (payload.edit === 'remove') {
        state.cartProductsId = state.cartProductsId.filter(
          (product) => product.id !== payload.id
        );
      } else if (payload.edit === 'reset') {
        state.cartProductsId = [];
      }
    },
    setQty(
      state,
      action: PayloadAction<{
        qty?: 'add' | 'less';
        maxQty: number;
        id: number;
      }>
    ) {
      const { payload } = action;

      // lógica de quantidade de produtos. Se o produto já está no limite máximo definido pela API, ele não adiciona mais itens.
      state.cartProductsId = state.cartProductsId.map((product) => {
        let qty = product.qty;
        if (payload.qty === 'add') {
          if (product.qty < payload.maxQty) {
            qty++;
          }
        } else {
          if (product.qty > 1) {
            qty--;
          }
        }

        return product.id === payload.id ? { id: product.id, qty } : product;
      });
    },
  },
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

export const { setCartProducts, setQty } = products.actions;

export default products.reducer;

/* */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('cart/fetchProducts', async () => {
  const response = await fetch('/data/products.json');
  const data = await response.json();
  return data.products;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    increaseQuantity: (state, action) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.map(product => ({
          ...product,
          quantity: 1,
        }));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;

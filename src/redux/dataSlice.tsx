import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  columns: [] as string[],
  data: [] as any[],
  status: 'idle', 
  error: null as string | null,
};

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async ({ apiUrl, limit, skip }: { apiUrl: string; limit: number; skip: number }) => {
    const response = await fetch(`${apiUrl}?limit=${limit}&skip=${skip}`);
    const result = await response.json();
    return result.users || result.products || [];
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.meta.arg.apiUrl === 'https://dummyjson.com/users') {
          state.columns = [
            'FIRST NAME',
            'LAST NAME',
            'MAIDEN NAME',
            'AGE',
            'GENDER',
            'EMAIL',
            'USERNAME',
            'BLOODGROUP',
            'EYECOLOR',
          ];
          state.data = action.payload.map((item: any) => ({
            firstName: item.firstName,
            lastName: item.lastName,
            maidenName: item.maidenName,
            age: item.age,
            gender: item.gender,
            email: item.email,
            username: item.username,
            bloodGroup: item.bloodGroup,
            eyeColor: item.eyeColor,
          }));
        } else if (action.meta.arg.apiUrl === 'https://dummyjson.com/products') {
          state.columns = [
            'CATEGORY',
            'PRICE',
            'RATING',
            'STOCK',
            'BRAND',
            'WARRANTY INFORMATION',
            'AVAILABILITY STATUS',
            'SHIPPING INFORMATION',
          ];
          state.data = action.payload.map((item: any) => ({
            category: item.category,
            price: item.price,
            rating: item.rating,
            stock: item.stock,
            brand: item.brand,
            warrantyInformation: item.warrantyInformation,
            availabilityStatus: item.availabilityStatus,
            shippingInformation: item.shippingInformation,
          }));
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default dataSlice.reducer;

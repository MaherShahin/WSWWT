import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  series: [
    {
      id: 1,
      title: 'Game of Thrones',
      seasons: 8,
      genre: 'Fantasy',
      rating: 9.3,
      image: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
      description: 'Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.'
    }
  ]
};

const seriesSlice = createSlice({
  name: 'series',
  initialState,
  reducers: {
    addSeries: (state, action) => {
      state.series.push(action.payload);
    },
    removeSeries: (state, action) => {
      const index = state.series.findIndex(series => series.id === action.payload.id);
      if (index !== -1) {
        state.series.splice(index, 1);
      }
    }
  }
});

export const { addSeries, removeSeries } = seriesSlice.actions;

export default seriesSlice.reducer;

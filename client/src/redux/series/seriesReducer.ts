import { ADD_SERIES, REMOVE_SERIES } from './actionTypes';
import { ISeries } from '../../interfaces/series/ISeries.interface';
import { SeriesActionTypes } from '../../interfaces/redux/SeriesActions.interface';

export interface SeriesState {
    series: ISeries[],
}

const initialState: SeriesState = {
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
}

const seriesReducer = (state = initialState, action: SeriesActionTypes): SeriesState => {
    switch (action.type) {
      case ADD_SERIES:
        return { ...state, series: [...state.series, action.payload] };
      case REMOVE_SERIES:
        return { ...state, series: state.series.filter((series: { id: number; }) => series.id !== action.payload.id) };
      default:
        return state;
    }
};

export default seriesReducer;

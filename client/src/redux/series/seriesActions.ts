import { ADD_SERIES, REMOVE_SERIES } from './actionTypes';
import { ISeries } from '../../interfaces/series/ISeries.interface';
import { SeriesActionTypes } from '../../interfaces/redux/SeriesActions.interface';

export const addSeries = (series: ISeries): SeriesActionTypes => ({
  type: ADD_SERIES,
  payload: series
});

export const removeSeries = (series: ISeries): SeriesActionTypes => ({
  type: REMOVE_SERIES,
  payload: series
});

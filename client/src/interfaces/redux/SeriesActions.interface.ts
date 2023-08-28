import { ADD_SERIES, REMOVE_SERIES } from '../../redux/series/actionTypes';
import { ISeries }  from '../series/ISeries.interface';

type AddSeriesAction = {
  type: typeof ADD_SERIES;
  payload: ISeries;
};

type RemoveSeriesAction = {
  type: typeof REMOVE_SERIES;
  payload: ISeries;  
};

export type SeriesActionTypes = AddSeriesAction | RemoveSeriesAction;

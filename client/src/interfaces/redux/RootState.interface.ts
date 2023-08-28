import { UserState } from '../../redux/user/userReducer'
import { SeriesState } from '../../redux/series/seriesReducer'

export interface RootState {
    user?: UserState;
    series: SeriesState;
}

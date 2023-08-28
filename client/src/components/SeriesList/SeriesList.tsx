import React from 'react';
import { useSelector } from 'react-redux';
import SeriesBox from '../SeriesBox/SeriesBox';
import { ISeries } from '../../interfaces/series/ISeries.interface';
import { RootState } from '../../interfaces/redux/RootState.interface';

const SeriesList = () => {
  const seriesList = useSelector<RootState, ISeries[]>((state) => state.series.series || []);

  return (
    <div className="series-list">
      {seriesList.map((series) => (
        <SeriesBox key={series.id} series={series} />
      ))}
    </div>
  );
};

export default SeriesList;

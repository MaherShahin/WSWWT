import React from 'react';
import { useSelector } from 'react-redux';
import SeriesBox from '../SeriesBox/SeriesBox';

const SeriesList = () => {
  const seriesList = useSelector((state) => state.series.series || []);

  return (
    <div className="series-list">
      {seriesList.map((series) => (
        <SeriesBox key={series.id} series={series} />
      ))}
    </div>
  );
};

export default SeriesList;

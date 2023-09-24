import React from 'react';
import { useSelector } from 'react-redux';
import SeriesList from '../components/SeriesList/SeriesList';
import { Grid, Stack } from '@mui/material';
import SearchInput from '../components/SearchInput/SearchInput';
import { RootState } from '../redux/store';


const RoomPage = () => {

    const seriesList = useSelector((state) => state.series.series || []);

    const seriesAvailable = (seriesList.length > 0);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ minHeight: '100vh' }}
        >
            <Stack spacing={2} sx={{ margin:'20px', width: '80%' }}>
                <SearchInput />
            </Stack>

            {seriesAvailable && <SeriesList />}
            {!seriesAvailable && <h2>No series added yet.</h2>}

        </Grid>
    );
}

export default RoomPage;
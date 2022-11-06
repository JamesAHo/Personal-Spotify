import {useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Error, Loader, SongCard} from '../components'
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState('');
    const {activeSong, isPlaying} = useSelector((state) => state.player);

    // fetch data from redux enpoints
    const {data, isFetching, error} = useGetSongsByCountryQuery(country);
    console.log(country);

    useEffect(() => {
        // at_4U4cYef04oSqCqM2yPN6sLswtUVjv
        // fetch API
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_4U4cYef04oSqCqM2yPN6sLswtUVjv`)
        .then((res) => setCountry(res?.data?.location?.country))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));

    },[country])
    // apply loader components
    if(isFetching && loading) return <Loader title="Loading..." />
    return (
        <div>

        </div>
    )
}

export default AroundYou;

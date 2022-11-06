// first import the error components
import { useDispatch, useSelector } from 'react-redux'
import { Error, Loader, SongCard } from '../components'
import {genres} from '../assets/constants'
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore'
import { selectGenreListId } from '../redux/features/playerSlice'





const Discover = () => {
    // dispatch => action to store => reducer => genres 
    //use useDispatch
    const dispatch = useDispatch();
    // Passing CAKE slices = state
    const { activeSong, isPlaying, genreListId} = useSelector((state) => state.player)
    // redux hook
    const {data, isFetching, error} = useGetSongsByGenreQuery(genreListId || 'POP');
    
    if(isFetching) return <Loader title="Loading Song..." />

    if(error) return <Error />;
    // console.log(genres) to see data
    
    const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

    return (

        // tailwincss that have flex flex-col
    <div className="flex flex-col">
        <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
            <h2 className='font-bold text-3xl text-white text-left'>Discover {genreTitle}</h2>
            <select
            // onChange handle for music genres
            onChange={(e) => {dispatch(selectGenreListId(e.target.value))}}
            value={genreListId}
            className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 "
            >
                {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
            </select>
        </div>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
            {data?.map((song, i) => (
                <SongCard
                    key={song.key}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    i={i}
                 />
            ))}
        </div>
    </div>
    )

}
export default Discover;

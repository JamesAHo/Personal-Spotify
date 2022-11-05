import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongsRelatedQuery } from "../redux/services/shazamCore";
const SongDetails = () => {
    const dispatch = useDispatch();
    const {songid, id: artistId} = useParams();
    const {activeSong, isPlaying} = useSelector((state) => state.player)
    //

    // fetch data from redux
    // Lyric can be found in songData under sections
    // SongData.sections[1].text
    
    const {data: songData, isFetching: isFetchingSongDetails} = useGetSongDetailsQuery({songid})
    // related Song 
    const {data, isFetching: isFetchingRelatedSongs, error} = useGetSongsRelatedQuery({songid});
    console.log(songData)
    // Handle Pause
    const handlePauseClick = () => {
        dispatch(playPause(false))
      };
      // play Handle
      const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({song,data,i}));
        dispatch(playPause(true));
      };
    
    // Loading Error component while fetching
    if(isFetchingSongDetails || isFetchingRelatedSongs) return <Loader />
    // handle error
    if(error) return <Error />
    return (
        <div className="flex flex-col ">
            <DetailsHeader 
                artistId={artistId}
                songData={songData}
            />
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">
                    Lyric:
                </h2>
                <div className="mt-5 ">
                    {songData?.sections[1].type === "LYRICS" ? songData?.sections[1].text.map((Line, i) => (
                        <p className="text-white text-base my-1">{Line}</p>
                    )) : <p>Sorry, Lyric not found!</p> }
                </div>
            </div>
            <RelatedSongs
            data={data}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
            />
        </div>
    )




}

export default SongDetails;

import { useParams } from "react-router-dom";
import { useSelector} from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery} from "../redux/services/shazamCore";


const ArtistDetails = () => {
    
    const {id: artistId} = useParams();
    const {activeSong, isPlaying} = useSelector((state) => state.player)
   
    
    const {data: artistData, isFetching: isFetchingArtistDetails, error} =  useGetArtistDetailsQuery(artistId);
  
    // Loading Error component while fetching
    if(isFetchingArtistDetails) return <Loader title="Looking.." />
    // handle error
    if(error) return <Error />
    return (
        <div className="flex flex-col ">
            <DetailsHeader 
                artistId={artistId}
                artistData={artistData}
            />
          {/*This is where related song listed */}
            <RelatedSongs
            data={Object.values(artistData?.songs)}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            />
        </div>
    );




};

export default ArtistDetails;


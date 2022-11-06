import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'a4d093f2c8mshd0f29d2261dfba3p19ac50jsnf655ac04c6a0',
//       'X-RapidAPI-Host': ''
//     }
//   };
  
//   fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key','a4d093f2c8mshd0f29d2261dfba3p19ac50jsnf655ac04c6a0');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({query: () => '/charts/world'}),
        // get song by genre
        getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}` }),

        getSongDetails: builder.query({query: ({songid}) => `/tracks/details?track_id=${songid}`}),
        getSongsRelated: builder.query({query: ({songid}) => `/tracks/related?track_id=${songid}`}),
        getArtistDetails: builder.query({ query: (artistId) => `/artists/details?artist_id=${artistId}`}),
        
        //this endpoints will respond country code data
        getSongsByCountry: builder.query({ query: (countryCode) => `/charts/country?country_code=${countryCode}` })
    }),
})

export const { useGetTopChartsQuery, useGetSongDetailsQuery, useGetSongsRelatedQuery,useGetArtistDetailsQuery, useGetSongsByCountryQuery, useGetSongsByGenreQuery} = shazamCoreApi 
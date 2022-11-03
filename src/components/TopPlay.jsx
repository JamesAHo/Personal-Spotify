import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import {FreeMode} from 'swiper';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import 'swiper/css'
import 'swiper/css/free-mode'

// implemented SWIPER
// https://swiperjs.com/get-started

const TopPlay = () => {
  const dispatch = useDispatch();
  const {setActiveSong, isPlaying} = useSelector((state) => state.player);
  const {data} = useGetTopChartsQuery();
  const divRef = useRef(null);
  // pause handle
  const handlePauseClick = () => {
    dispatch(playPause(false))
  };
  // play Handle
  const handlePlayClick = () => {
    dispatch(setActiveSong({song,data,i}));
    dispatch(playPause(true));
  };
}

export default TopPlay;

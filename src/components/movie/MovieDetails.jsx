import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../Api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Circular from "../circular/Circular";
import MovieCast from "./MovieCast";

function MovieDetails() {
  const { id } = useParams();
  const [item, setItem] = useState("");
  useEffect(() => {
    fetchDataFromApi(`/movie/${id}`).then((res) => {
      setItem(res);
    });
  }, [id]);
  const time = (value) => {
    const hours = value / 60;
    const minutes = value % 60;
    return `${Math.floor(hours)}h ${minutes}m`;
  };

  const { url } = useSelector((state) => state.home);
  return (
    <React.Fragment>
      <div className='relative w-full h-auto'>
        <img
          src={url?.poster + item?.backdrop_path}
          alt='logo'
          className='w-full h-[80vh] relative '
        />
        <div className='w-full h-[80vh] absolute  top-0 opacity-80 bg-gray-950  z-10' />
        <div className='absolute top-[10%] flex px-20 space-x-24 z-20'>
          <img
            src={url?.poster + item?.poster_path}
            alt='logo'
            className=' w-[25%] h-[35%]'
          />
          <div>
            <h1>{item?.original_title}</h1>
            <p className='text-md'>{item?.overview}</p>
            <p>
              Genres :{" "}
              <span className='bg-[#DA2F68]'>
                {item?.genres && item?.genres[0]?.name}
              </span>
            </p>
            <p className='mt-2'>
              {" "}
              Release Date : {dayjs(item?.first_air_date).format("MMM D, YYYY")}
            </p>
            <p>
              {" "}
              Last Date : {dayjs(item?.last_air_date).format("MMM D, YYYY")}
            </p>
            {item?.media_type === "tv" && (
              <>
                <p>
                  Seasons:{" "}
                  <span className='font-semibold'>
                    {item?.number_of_seasons}
                  </span>
                </p>
                <p>
                  Episode:{" "}
                  <span className='font-semibold'>
                    {item?.number_of_episodes}
                  </span>
                </p>
              </>
            )}
            {item?.runtime && <p>Runtime : {time(item?.runtime)}</p>}

            <div className=' flex items-center space-x-6'>
              <Circular
                className='w-12 h-12'
                rating={item?.vote_average?.toFixed(1)}
              />
            </div>
          </div>
        </div>
      </div>
      <MovieCast />
    </React.Fragment>
  );
}

export default MovieDetails;

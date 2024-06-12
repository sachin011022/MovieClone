import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Circular from "../components/circular/Circular";
import dayjs from "dayjs";
import { PlayCircleIcon } from "lucide-react";

import { fetchDataFromApi } from "../Api";
import Director from "../components/Director/Director";

function Content() {
  const { id } = useParams();
  const [item, setItem] = useState("");
  useEffect(() => {
    fetchDataFromApi(`/tv/${id}`).then((res) => {
      setItem(res);
    });
  }, [id]);

  const { url } = useSelector((state) => state.home);
  console.log(item);
  return (
    <Fragment>
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
            <h2>{item?.name}</h2>
            <p>{item?.overview}</p>
            {item?.genres?.length > 0 && (
              <p>
                Genres :
                <span className='bg-[#DA2F68] px-1 rounded-sm'>
                  {item?.genres[0]?.name}
                </span>
              </p>
            )}

            <p className='mt-2'>
              {" "}
              Release Date : {dayjs(item?.first_air_date).format("MMM D, YYYY")}
            </p>
            <p>
              {" "}
              Last Date : {dayjs(item?.last_air_date).format("MMM D, YYYY")}
            </p>
            <p>
              Series:{" "}
              <span className='font-semibold'>{item?.number_of_seasons}</span>
            </p>
            <p>
              Episode:{" "}
              <span className='font-semibold'>{item?.number_of_episodes}</span>
            </p>
            <div className=' flex items-center space-x-6'>
              <Circular
                className='w-12 h-12'
                rating={item?.vote_average?.toFixed(1)}
              />
              <PlayCircleIcon size={64} className='hover:text-red-700' />
            </div>
          </div>
        </div>
      </div>
      <Director />
    </Fragment>
  );
}

export default Content;

import React, { Fragment, useEffect, useState } from "react";
import { fetchDataFromApi } from "../../Api";
import { useDispatch, useSelector } from "react-redux";

function Banner() {
  const [trending, setTrending] = useState([]);
  const [background, setBackground] = useState("");
  const { url } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataFromApi("/tv/top_rated")?.then((res) => {
      // console.log(res.results);
      setTrending(res.results);
      // console.log(trending);

      const bg =
        url?.backdrop +
        res?.results?.[Math.floor(Math.random() * trending.length)]
          ?.backdrop_path;
      setBackground(bg);
    });
  }, [background]);

  return (
    <Fragment>
      <div className='h-[80vh] relative'>
        {trending.map((data) => (
          <div key={data?.id}>
            <img
              src={background}
              alt='logo'
              className='absolute object-cover h-full w-full mb-4'
            />
            <h1 className='uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference'>
              Welcome
            </h1>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default Banner;

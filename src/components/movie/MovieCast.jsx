import React from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../Api";
import { useSelector } from "react-redux";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Video from "../video/Video";

function MovieCast() {
  const [movieCast, setMovieCast] = React.useState([]);
  const [slide, setSlide] = React.useState(0);
  const { id } = useParams();
  React.useEffect(() => {
    fetchDataFromApi(`/movie/${id}/credits`).then((res) => {
      setMovieCast(res.cast);
    });
  }, [id]);

  const { url } = useSelector((state) => state.home);
  const rightscroll = () => {
    if (slide == -movieCast.length + 6) return false;
    setSlide(slide - 1);
  };
  const leftscroll = () => {
    if (slide == 0) return false;
    setSlide(slide + 1);
  };
  return (
    <React.Fragment>
      <div className='flex items-center justify-between mt-3 px-4'>
        <h2>Cast</h2>
        <div className='flex space-x-4 cursor-pointer '>
          <ArrowLeftCircle onClick={leftscroll} />
          <ArrowRightCircle onClick={rightscroll} />
        </div>
      </div>
      <div className='w-full p-4 space-x-5  flex   overflow-hidden '>
        {movieCast.map((val) => (
          <div
            className='w-24 h-34 '
            key={val?.id}
            style={{ transform: `translateX(${slide}00%)` }}
          >
            <div className='w-24 h-24'>
              <img
                src={url?.profile + val?.profile_path}
                alt='logo'
                className='w-24 h-24 object-center object-cover rounded-full'
              />
            </div>
            <h2 className=''>{val?.name}</h2>
          </div>
        ))}
      </div>
      <Video />
    </React.Fragment>
  );
}

export default MovieCast;

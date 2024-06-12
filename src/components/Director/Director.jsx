import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchDataFromApi } from "../../Api";
import { ArrowRightCircle, ArrowLeftCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import Video from "../video/Video";
function Director() {
  const { id } = useParams();
  const [createdList, setCreatedList] = useState([]);
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    fetchDataFromApi(`/tv/${id}/credits`).then((res) => {
      setCreatedList(res.cast);
    });
  }, [id]);

  const { url } = useSelector((state) => state.home);

  const rightscroll = () => {
    if (slide == -createdList.length + 6) return false;
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
        {createdList.map((val) => (
          <div
            className='w-24 h-34 '
            style={{ transform: `translateX(${slide}00%)` }}
            key={val?.id}
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

export default Director;

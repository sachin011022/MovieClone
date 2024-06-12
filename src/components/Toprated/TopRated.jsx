import { useEffect, useState } from "react";
import { ArrowRightCircle, ArrowLeftCircle } from "lucide-react";
import { fetchDataFromApi } from "../../Api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function PopularCard() {
  const [cardData, setCardData] = useState([]);
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetchDataFromApi("/movie/top_rated").then((res) => {
      setCardData(res.results);
    });
  }, []);

  const { url } = useSelector((state) => state.home);
  const rightscroll = () => {
    if (slide == -14) return false;
    setSlide(slide - 1);
  };
  const leftscroll = () => {
    if (slide == 0) return false;
    setSlide(slide + 1);
  };
  return (
    <>
      <hr className='mt-6 opacity-85' />
      <div className='mt-4 flex items-center justify-between'>
        <h3 className='mt-3 text-xl'>Top Rated</h3>
        <div className='inline-flex gap-x-3 cursor-pointer'>
          <ArrowLeftCircle size={"2vw"} onClick={leftscroll} />
          <ArrowRightCircle size={"2vw"} onClick={rightscroll} />
        </div>
      </div>
      <div className='w-full h-[40vh] flex p-3 mt-2 bg-[#04152D] rounded-md gap-x-4 overflow-hidden'>
        {cardData.map((item) => (
          <div
            key={item.id}
            className=' w-28 h-[30vh] transition-all duration-100 scroll-smooth'
            style={{ transform: `translateX(${slide}00%)` }}
            onClick={() => {
              navigate(`/movie/${item?.id}`);
            }}
          >
            <div className='w-28 h-full '>
              <img
                src={url?.backdrop + item.backdrop_path}
                alt=''
                className='w-28 h-full object-cover object-center rounded-md'
              />
            </div>
            <h5 className='text-[15px]'>{item.title}</h5>
          </div>
        ))}
      </div>
    </>
  );
}

export default PopularCard;

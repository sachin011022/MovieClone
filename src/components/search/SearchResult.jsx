import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../Api";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/temp.jpg";
import date from "dayjs";
import { useSelector } from "react-redux";

function SearchResult() {
  const [item, setItem] = useState([]);
  const { query } = useParams();
  const [pageNum, setPageNum] = useState(1);
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        console.log(res?.results);
        setItem(res?.results);
      }
    );
  }, [query]);

  const navigation = () => {
    navigate(`/movie/${item?.id}`);
  };

  return (
    <div className='bg-black w-full flex flex-wrap'>
      {item?.map((srchList) => (
        <div
          className='p-2 bg-black w-36 '
          onClick={() => navigate(`/movie/${srchList.id}`)}
          key={srchList?.id}
        >
          <div className=''>
            <img
              src={url?.profile + srchList?.poster_path}
              alt='logo'
              className='w-[24vw] rounded-lg h-48 object-center object-cover'
            />
          </div>
          <h2>{srchList?.original_name}</h2>
          <p>{date(srchList?.release_date).format("MMM DD YYYY")}</p>
        </div>
      ))}
    </div>
  );
}
export default SearchResult;

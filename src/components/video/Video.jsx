import React from "react";
import { fetchDataFromApi } from "../../Api";
import { useParams } from "react-router-dom";
import { Play } from "lucide-react";
import VideoPop from "./VideoPop";

function Video() {
  const { id } = useParams();
  const [video, setVideo] = React.useState([]);

  const [show, setShow] = React.useState(false);
  const [videoId, setVideoId] = React.useState(null);
  React.useEffect(() => {
    fetchDataFromApi(`/movie/${id}/videos`).then((res) => {
      setVideo(res.results);
    });
  }, [id]);
  return (
    <div>
      <div className='flex flex-wrap w-full'>
        {video?.slice(1, 5).map((videoList) => (
          <div
            key={videoList.id}
            className='relative w-full max-w-md mx-auto my-2'
          >
            <img
              className='w-full h-auto'
              onClick={() => {
                setShow(true);
                setVideoId(videoList.key);
              }}
              src={`https://img.youtube.com/vi/${videoList.key}/mqdefault.jpg`}
            />

            <div className='absolute inset-0 flex items-center justify-center'>
              <button
                className='text-white bg-black bg-opacity-50 rounded-full p-4'
                onClick={() => {
                  setShow(true);
                  setVideoId(videoList.key);
                }}
              >
                <Play className='w-12 h-12' onClick={() => setShow(true)} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <VideoPop
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
}

export default Video;

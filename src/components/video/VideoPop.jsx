// VideoPopup.jsx
import ReactPlayer from "react-player/youtube";
import { X } from "lucide-react";

const VideoPop = ({ setShow, setVideoId, show, videoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity z-50 ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className='absolute inset-0 bg-black bg-opacity-25 backdrop-blur-md'
        onClick={hidePopup}
      ></div>
      <div className='relative bg-white p-4 w-full max-w-3xl aspect-video transform transition-transform scale-95'>
        <button
          className='absolute top-2 right-2 text-white'
          onClick={hidePopup}
        >
          <X className='w-6 h-6' />
        </button>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width='100%'
          height='100%'
          playing={show}
        />
      </div>
    </div>
  );
};

export default VideoPop;

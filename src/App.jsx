import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromApi } from "./Api";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { getApiConfiguration } from "./store/homeslice";
import { Footer } from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Content from "./pages/Content";
import SearchResult from "./components/search/SearchResult";
import MovieDetails from "./components/movie/MovieDetails";

function App() {
  const dispatch = useDispatch();

  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")?.then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  return (
    <BrowserRouter>
      <div className='m-auto max-w-[1200px]'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tv/:id' element={<Content />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/search/:query' element={<SearchResult />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

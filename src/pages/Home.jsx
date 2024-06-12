import Banner from "../components/banner/Banner";
import TopRated from "../components/Toprated/TopRated";
import Upcoming from "../components/upComing/Upcoming";
import TvSeries from "../components/TvSeries/TvSeries";
function Home() {
  return (
    <section className=''>
      <Banner />
      <TopRated />
      <Upcoming />
      <TvSeries />
    </section>
  );
}

export default Home;

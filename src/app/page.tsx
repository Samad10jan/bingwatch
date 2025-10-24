
import HeroSection from "./components/hero-section";
import InfoDrawer from "./components/info-drawer";
import MovieCard from "./components/moviecard";

export default async function Home() {

  // const urlHero = 'https://api.rei.my.id/anime?status=ongoing&sort=-score&page=1&limit=5';
  // const urlTv = 'https://api.rei.my.id/anime?type=tv&sort=-score&page=1&limit=5';
  // const urlMovies = 'https://api.rei.my.id/anime?type=movie&sort=-score&page=1&limit=5';
  // const urlUpcoming = 'https://api.rei.my.id/anime?status=upcoming&sort=-score&page=1&limit=5';
  // const url4OVA = 'https://api.rei.my.id/anime?type=ova&sort=-score&page=1&limit=5';

  let result = [];
  try {
    // const response = await fetch(url);
    // const data = await response.json();
    // result = data.data || [];
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="w-full">
      {/* <HeroSection PopularData={result} /> */}
      <div>
        {/* TV  */}
        {/* <CarouselAnime data={data1} /> */}
      </div>
      
       <div>
        {/* Movies */}
        {/* <CarouselAnime data={data2}/> */}
      </div>

       <div>
        {/*  */}
        {/* <CarouselAnime data={data3}/> */}
      </div>

       <div>
        {/* TV */}
        {/* <CarouselAnime data={data4}/> */}
      </div>
      
      Card
      <MovieCard/>
    </div>
  );
}

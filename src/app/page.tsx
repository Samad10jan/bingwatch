export default async function Home() {
const url = 'https://anime-data-scraper-api.p.rapidapi.com/v1/anime/popular';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '3d3dfb0585msh8127fea8bdc6594p11a6f7jsn1e0d8405b0ac',
		'x-rapidapi-host': 'anime-data-scraper-api.p.rapidapi.com'
	}
};

  try {
    // const response = await fetch(url, options);
    // const result = await response.text();
    // console.log(result);
  } catch (error) {
    console.error(error);
  }

  return (
    <div>

      
      {/* Popular Anime matrix of Anime Cards + more button open shadcn drawer that have anime info  */}
      {/* some animation  */}
      {/* TV Anime matrix of Anime Cards  */}
      {/* some animation  */}
      {/* Movies Anime matrix of Anime Cards  */}
      {/* OVA  */}

      

      =
    </div>
  );
}

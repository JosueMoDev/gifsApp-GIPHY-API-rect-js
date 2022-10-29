import { useState, useEffect } from "react";
import { fetchTendringResponse } from "../api";
import { randomizeData } from "../helpers";

export const useGetTrendingResponse = () => { 
  const [trending, setTrending] = useState([]);  
    const getTrendingGiphys = async () => {
      const ApiResponse = await fetchTendringResponse();
      const data = ApiResponse.data.data.map(gifs => gifs);
      const trending = data.map(item => ({
        id: item.id,
        title: item.title,
        url: item.images.downsized.url,
      }));
      
      setTrending(randomizeData(trending));
    };

    useEffect(() => {
      getTrendingGiphys();
    }, [])
  return { trending }
}

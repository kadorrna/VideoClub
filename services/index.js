import axios from 'axios'

const get = async (url) => {
  const response = await axios.get(url)
  return response
}

export const getCategoriesService = async () => {
  const url = `${process.env.API_URL}/genre/movie/list?api_key=${process.env.API_SECRET}&language=en-US`
  return (await get(url)).data.genres
}

export const getMoviesService = async (categoryId, page) => {
  const url = `${process.env.API_URL}/discover/movie?api_key=${process.env.API_SECRET}&with_genres=${categoryId}&language=en-US&page=${page}`
  return (await get(url)).data.results
}
export const findMovieByTitleAction = async (query) => {
  const url = `${process.env.API_URL}/search/movie?api_key=${process.env.API_SECRET}&query=${query}&language=en-US`
  return (await get(url)).data.results
}

export const getMovieDetailsService = async (query) => {
  const url = `${process.env.API_URL}/movie/${query}?api_key=${process.env.API_SECRET}&&language=en-US`
  return (await get(url)).data
}

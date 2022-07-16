import axios from 'axios'

export const getCategoriesService = async (url) => {
  const response = await axios.get(url)
  return response.data.genres
}

export const getMoviesService = async (url) => {
  const response = await axios.get(url)
  return response.data.results
}

export const getMovieDetailsService = async (url) => {
  const response = await axios.get(url)
  return response.data
}

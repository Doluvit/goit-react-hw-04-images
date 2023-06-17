import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const options = new URLSearchParams({
  per_page: 12,
  key: '35750214-c04e148fdca89a66c6114339d',
  image_type: 'photo',
  orientation: 'horizontal',
});

export const getCards = async (searchText, page) => {
  const newSearchText = searchText.slice(String(Date.now()).length + 1);
  const response = await axios.get(
    `${BASE_URL}?q=${newSearchText}&page=${page}&${options}`
  );
  const data = response.data;
  return data;
};

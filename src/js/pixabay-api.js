import axios from 'axios';
import iziToast from 'izitoast';

const API_KEY = '54239914-b8bb815315f9ce22f6479101b';

// query (пошукове слово, яке є рядком) здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.
export const getImagesByQuery = async (query, page) => {
  try {
    const { data } = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });
    console.log('🚀 ~ getImagesByQuery ~ data:', data);
    return data;
  } catch (error) {
    iziToast.error({
      message: `${error}`,
      position: 'topRight',
    });
    throw error;
  }
};

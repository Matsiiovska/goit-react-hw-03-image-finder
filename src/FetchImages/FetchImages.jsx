export const fetchImages = (query, page) => {
  const apiKey = '38631612-cb45d4da8d92e0954f2c2005e';
  const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.hits.length === 0) {
        return { hasMore: false, images: [], loading: false };
      } else {
        return { images: data.hits, hasMore: data.hits.length >= 12 };
      }
    })
    .catch((error) => {
      console.log("Error", error);
      return { error: error.message };
    });
};
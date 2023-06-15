import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { MainContainer } from './App.styled';
import { SearchBar } from './Searchbar/Searchbar';
import { getCards } from 'Servises/getCards';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState(null);
  const [error, setError] = useState(null);

  const prevSearchTextRef = useRef('');

  useEffect(() => {
    if (searchText === '') {
      return;
    }
    async function fetchCards() {
      try {
        setLoading(true);
        const data = await getCards(searchText, pageNumber);
        setQuery(data.hits.length);
        setCollection(prev => prev.concat(data.hits));
        setLoading(false);

        if (data.hits.length === 0) {
          setCollection([]);
          toast.error('Sorry, no images were found for your request!');
        }
      } catch (error) {
        setError(error);
      }
    }

    fetchCards();
  }, [searchText, pageNumber]);

  const handleSearch = searchText => {
    if (searchText !== prevSearchTextRef.current) {
      setSearchText(searchText);
      setCollection([]);
      setPageNumber(1);
    }
  };

  const onLoadMore = () => {
    setPageNumber(prev => prev + 1);
  };

  return (
    <MainContainer>
      <SearchBar onSubmit={handleSearch} />
      {collection && (
        <ImageGallery
          collection={collection}
          query={query}
          loading={loading}
          onLoadMore={onLoadMore}
          error={error}
        />
      )}
      <Loader isLoading={loading} />
      <ToastContainer autoClose={3000} />
    </MainContainer>
  );
};

export default App;

import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { MainContainer } from './App.styled';
import { SearchBar } from './Searchbar/Searchbar';
import { getCards } from 'Servises/getCards';
import { Loader } from './Loader/Loader';

// class oldApp extends Component {
//   state = {
//     searchText: '',
//     collection: [],
//     loading: false,
//     pageNumber: 1,
//     query: null,
//   };

//   componentDidUpdate(_, prevState) {
//     const { searchText, pageNumber } = this.state;
//     if (
//       prevState.searchText !== searchText ||
//       prevState.pageNumber !== pageNumber
//     ) {
//       this.setState({ loading: true });
//       getCards(searchText, pageNumber)
//         .then(data => {
//           if (prevState.pageNumber !== pageNumber) {
//             this.setState(prevState => ({
//               collection: [...prevState.collection, ...data.hits],
//               query: data.hits.length,
//               loading: false,
//             }));
//           } else {
//             window.scrollTo(0, 0);
//             this.setState({
//               collection: [...data.hits],
//               query: data.hits.length,
//               loading: false,
//             });
//           }

//           if (data.hits.length === 0) {
//             this.setState({ collection: [] });
//             toast.error('Sorry, no images were found for your request!');
//             return Promise.reject(
//               new Error('Sorry, no images were found for your request')
//             );
//           }
//         })
//         .catch(error => console.log(error.message))
//         .finally(() => {
//           this.setState({ loading: false });
//         });
//     }
//   }

//   handleSearch = searchText => {
//     this.setState({ searchText });

//     this.setState(prevState => {
//       if (prevState.searchText !== this.state.searchText) {
//         return {
//           collection: [],
//           pageNumber: 1,
//         };
//       }
//     });
//   };

//   onLoadMore = () => {
//     this.setState(prevState => {
//       return { pageNumber: prevState.pageNumber + 1 };
//     });
//   };

//   render() {
//     const { collection, query, loading } = this.state;
//     return (
//       <MainContainer>
//         <SearchBar onSubmit={this.handleSearch} />
//         {this.state.collection && (
//           <ImageGallery
//             collection={collection}
//             query={query}
//             loading={loading}
//             onLoadMore={this.onLoadMore}
//           />
//         )}
//         <Loader isLoading={this.state.loading} />
//         <ToastContainer autoClose={3000} />
//       </MainContainer>
//     );
//   }
// }

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState(null);

  const prevSearchTextRef = useRef('');

  useEffect(() => {
    if (searchText === '') {
      return;
    }
    if (
      prevSearchTextRef.current !== searchText ||
      prevSearchTextRef.current !== pageNumber
    ) {
      setLoading(true);
      getCards(searchText, pageNumber)
        .then(data => {
          if (prevSearchTextRef.current !== pageNumber) {
            setCollection(prevCollection => prevCollection.concat(data.hits));
            setQuery(data.hits.length);
            setLoading(false);
          } else {
            window.scrollTo(0, 0);
            setCollection(prevCollection => prevCollection.concat(data.hits));
            setQuery(data.hits.length);
            setLoading(false);
          }

          if (data.hits.length === 0) {
            setCollection([]);
            toast.error('Sorry, no images were found for your request!');
            return Promise.reject(
              new Error('Sorry, no images were found for your request')
            );
          }
        })

        .catch(error => console.log(error.message))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchText, pageNumber]);

  const handleSearch = searchText => {
    if (searchText !== prevSearchTextRef.current) {
      setSearchText(searchText);
      setCollection([]);
      setPageNumber(1);
    }
  };
  
  const onLoadMore = () => {
    setPageNumber(prevPageNumber=> prevPageNumber + 1);
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
        />
      )}
      <Loader isLoading={loading} />
      <ToastContainer autoClose={3000} />
    </MainContainer>
  );
};

export default App;

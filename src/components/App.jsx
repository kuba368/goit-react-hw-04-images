import { useState } from 'react';
import styles from './App.module.css';
import fetchImages from '../services/PixabayAPI';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfHits, setNumberOfHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [modalData, setModalData] = useState({
    modalImageSrc: '',
    modalImageAlt: '',
  });

  const setInitialState = () => {
    setQuery('');
    setImages([]);
    setPage(1);
    setNumberOfHits(0);
    setShowModal(false);
    setIsLoading(false);
    setErrorMsg('');
    setModalData({
      modalImageSrc: '',
      modalImageAlt: '',
    });
  };

  const handleModalClose = () => setShowModal(false);

  const handleShowModal = (modalImageSrc, modalImageAlt) => {
    setShowModal(true);
    setModalData({ modalImageSrc, modalImageAlt });
  };

  const handleSearchQuery = e => {
    e.preventDefault();
    setInitialState();
    setIsLoading(true);
    const { queryInput } = e.target.elements;
    const queryValue = queryInput.value;

    if (queryValue) {
      return fetchImages(queryValue, page)
        .then(data => {
          if (data.totalHits === 0) {
            setIsLoading(false);
            return setErrorMsg('No images found. Try again.');
          }
          setErrorMsg('');
          setIsLoading(false);
          const setQueryData = ({ hits, totalHits }) => {
            setQuery(queryValue);
            setImages(hits);
            setNumberOfHits(totalHits);
            setPage(1);
          };
          return setQueryData(data);
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err);
          setErrorMsg('Oops, something went wrong!');
        });
    }
    setIsLoading(false);
    setErrorMsg('The search field cannot be empty');
  };

  const handleLoadMoreImg = () => {
    return fetchImages(query, page + 1)
      .then(data => {
        setImages([...images, ...data.hits]);
        setPage(page + 1);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearchQuery} />
      {isLoading ? (
        <Loader />
      ) : (
        images.length > 0 && (
          <>
            <ImageGallery imagesData={images} openModal={handleShowModal} />
            {images.length < numberOfHits && (
              <Button onClick={handleLoadMoreImg} />
            )}
          </>
        )
      )}
      {errorMsg && <div>{errorMsg}</div>}
      {showModal && (
        <Modal
          src={modalData.modalImageSrc}
          alt={modalData.modalImageAlt}
          closeModal={handleModalClose}
        />
      )}
    </div>
  );
};

export default App;

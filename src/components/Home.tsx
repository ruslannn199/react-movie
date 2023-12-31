import React from 'react';
// Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';
// Hook
import { useHomeFetch } from '../hooks/useHomeFetch';
// Image
import NoImage from '../images/no_image.jpg';

const Home: React.FC = () => {
  const {
    state,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    setIsLoadingMore
  } = useHomeFetch();

  if (error) return <div>Что-то пошло не так...</div>;

  const getHeaderMessage = (): string => {
    if (loading) {
      return '';
    }
    if (state.docs.length === 0) {
      return 'Нет результатов';
    }
    if (searchTerm) {
      return 'Результаты поиска';
    }
    return 'Популярные фильмы';
  }

  return (
    <>
      {state.docs[0] ?
        (<HeroImage
          image={state.docs[0]?.poster?.url || NoImage}
          title={state.docs[0]?.name || state.docs[0]?.alternativeName || state.docs[0]?.enName}
          text={state.docs[0]?.shortDescription || 'Описание отсутствует'}
        />)
        : null
      }
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={getHeaderMessage()}>
        {state.docs.map((movie) => (
          <Thumb
            key={movie.id}
            clickable
            image={
              movie.poster?.previewUrl
                ? movie.poster.previewUrl
                : NoImage
            }
            movieId={movie.id}
          />
        ))}
      </Grid>
      { loading && <Spinner />}
      {state.page < state.pages && !loading && (
        <Button text='Загрузить ещё' callback={() => setIsLoadingMore(true)} />
      )}
    </>
  )
}

export default Home;

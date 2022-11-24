import React from 'react';
import FilmCard from '../FilmCard/FilmCard';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import filmsState from '../../../store/filmsState';
import { TAdaptedFilm } from '../../../types/adaptedFilm';

type FilmCardListProps = {
  filmsList: TAdaptedFilm[];
};

const FilmCardList = ({ filmsList }: FilmCardListProps) => {
  return (
    <section className='films-list'>
      <h2 className='films-list__title visually-hidden'>
        All movies. Upcoming
      </h2>

      <div className='films-list__container'>
        {filmsState.filmsList.map((film) => (
          <FilmCard film={film} key={film.id} />
        ))}
      </div>

      <ShowMoreButton />
    </section>
  );
};

export default FilmCardList;

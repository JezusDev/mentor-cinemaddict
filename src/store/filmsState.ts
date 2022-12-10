import { TAdaptedFilm } from '../types/adaptedFilm';
import { makeAutoObservable, runInAction } from 'mobx';
import { TUnadaptedFilm } from '../types/unadaptedFilm';
import { adaptFilm } from '../utils/adapter';
import http from '../api/http';
import { APIRoute, FetchStatus, FilterOption, SortOption } from '../const';
import { sortByDate, sortByRating } from '../utils/utils';
import { SortOptionValue } from '../types/sort';

class FilmsState {
  filmsList: TAdaptedFilm[] = [];
  fetchStatus = FetchStatus.Idle;
  filteredFilms: TAdaptedFilm[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMovieList() {
    this.fetchStatus = FetchStatus.Pending;
    try {
      const { data } = await http.get<TUnadaptedFilm[]>(APIRoute.Movies);
      const adaptedFilms = data.map((film) => adaptFilm(film));
      runInAction(() => {
        this.filmsList = adaptedFilms;
        this.filteredFilms = adaptedFilms;
        this.fetchStatus = FetchStatus.Fulfilled;
      });
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.fetchStatus = FetchStatus.Rejected;
      });
    }
  }

  sort(sortOption: SortOptionValue) {
    switch (sortOption) {
      case SortOption.DATE:
        return [...this.filteredFilms].sort(sortByDate);
      case SortOption.RATING:
        return [...this.filteredFilms].sort(sortByRating);
      default:
        return [...this.filteredFilms];
    }
  }

  filter(filterOption: string) {
    switch (filterOption) {
      case FilterOption.Watchlist:
        this.filteredFilms = this.filmsList.filter(
          (item) => item.userDetails.watchlist
        );
        break;
      case FilterOption.History:
        this.filteredFilms = this.filmsList.filter(
          (item) => item.userDetails.alreadyWatched
        );
        break;
      case FilterOption.Favorite:
        this.filteredFilms = this.filmsList.filter(
          (item) => item.userDetails.favorite
        );
        break;
      default:
        this.filteredFilms = this.filmsList;
    }
  }
}

const filmsState = new FilmsState();

export default filmsState;

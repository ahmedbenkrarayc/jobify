import { Favorite } from '../../shared/models/favorite';

export interface FavoriteState {
  loading: boolean;
  favorites: Favorite[];
  error: string | null;
}

export const initialFavoriteState: FavoriteState = {
  loading: false,
  favorites: [],
  error: null
};

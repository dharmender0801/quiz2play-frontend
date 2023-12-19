import { Action, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as _fromAction from '../actions';
import * as _fromreducers from './mainPage.reducer';
import * as _fromCategoryreducer from './category.reducer';
export interface MainPageState {
    mainInfo:_fromreducers.MainPageState;

}
export interface CategoryState{
    categoryInfo:_fromCategoryreducer.CategoryState
}
export const reducers: ActionReducerMap<MainPageState> | any  = {
    mainInfo: _fromreducers.mainReducer,
  };
  export const categoryreducers:ActionReducerMap<CategoryState> | any={
      categoryInfo :_fromCategoryreducer.categoryreducer
  }



  export const getMainState = createFeatureSelector<MainPageState>('main');
  export const getCategoryState = createFeatureSelector<CategoryState>('category');
import {createSelector } from "@ngrx/store";
import * as _fromReducers from '../reducers';
import * as _fromCategoryreducer from '../reducers/category.reducer';

export const categoryState = createSelector(
    _fromReducers.getCategoryState,
    (state: _fromReducers.CategoryState) => state.categoryInfo
  );
  
  export const fetchLevelResponse = createSelector(categoryState, _fromCategoryreducer.fetchlevelresponse);
  export const fetchQuesResponse  = createSelector(categoryState, _fromCategoryreducer.fetchquesresponse);
  export const fetchHelpResponse  = createSelector(categoryState, _fromCategoryreducer.fetchhelpresponse);
  export const fetchScoreResponse   = createSelector(categoryState, _fromCategoryreducer.fetchScoreresponse);
  export const fetchuserLogsResponse  = createSelector(categoryState, _fromCategoryreducer.fetchUserresponse);
  export const fetchRellResponse  = createSelector(categoryState, _fromCategoryreducer.fetchrerollresponse);
  export const buyliveResponse   = createSelector(categoryState, _fromCategoryreducer.fetchbuyliveStatus);

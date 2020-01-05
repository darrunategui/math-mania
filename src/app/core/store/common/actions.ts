import { createAction, props } from '@ngrx/store';

export const startWork = createAction(
  '[Common] Start Work'
);

export const endWork = createAction(
  '[Common] End Work'
);

export const _setIsBusy = createAction(
  '[Common] Set IsBusy',
  props<{ isBusy: boolean }>()
);

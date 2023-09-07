import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BrmShowLoadingAction, BrmHideLoadingAction } from './loading.actions';

export interface LoadingStateModel {
  show: boolean;
}

@State<LoadingStateModel>({
  name: 'loading',
  defaults: {
    show: false,
  },
})

@Injectable()
export class LoadingState {
  @Selector() static showLoading(state: LoadingStateModel): boolean {
    return state?.show ? true : false;
  }

  constructor() {}

  @Action(BrmShowLoadingAction)
  BrmShowLoadingAction(ctx: StateContext<LoadingStateModel>) {
    ctx.patchState({
      show: true,
    });
  }

  @Action(BrmHideLoadingAction)
  BrmHideLoadingAction(ctx: StateContext<LoadingStateModel>) {
    ctx.patchState({
      show: false,
    });
  }
}

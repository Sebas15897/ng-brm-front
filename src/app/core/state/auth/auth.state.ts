import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SweetAlertHelper } from '../../helpers/sweet-alert.helper';
import { BrmLoginAction, BrmLogoutAction } from './auth.actions';
import {
  BrmHideLoadingAction,
  BrmShowLoadingAction,
} from '../loading/loading.actions';

export interface AuthStateModel {
  token: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
  },
})

@Injectable()
export class AuthState {
  @Selector() static isAuthenticated(state: AuthStateModel): boolean {
    return state?.token ? false : true;
  }

  constructor(private sweetAlertHelper: SweetAlertHelper) {}

  @Action(BrmLoginAction)
  BrmLoginAction(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new BrmShowLoadingAction()).subscribe(() => {
      setTimeout(() => {
        ctx.patchState({
          token: 'ThisIsATokenValid',
        });
        ctx.dispatch(new BrmHideLoadingAction()).subscribe(() => {
          this.sweetAlertHelper.createCustomAlert({
            title: 'Bienvenido',
            text: 'Ha iniciado sesión con exito.',
            icon: 'success',
          });
        });
      }, 2000);
    });
  }

  @Action(BrmLogoutAction)
  BrmLogoutAction(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new BrmShowLoadingAction());
    setTimeout(() => {
      ctx.dispatch(new BrmHideLoadingAction()).subscribe(() => {
        this.sweetAlertHelper.createCustomAlert({
          title: 'Sesión finalizada con éxito',
          text: 'Esperamos que vuelva pronto',
          icon: 'success',
        });
      });
    }, 2000);
  }
}

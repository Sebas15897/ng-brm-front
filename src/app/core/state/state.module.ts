import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../../../environments/environment';
import { LoadingState } from './loading/loading.state';
import { AuthState } from './auth/auth.state';
import { LayoutState } from './layout/layout.state';
import { ContactsState } from './contacts/contacts.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
  imports: [
    HttpClientModule,
    NgxsModule.forRoot([AuthState, LoadingState, LayoutState, ContactsState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsStoragePluginModule.forRoot({
      key: [AuthState],
    }),
  ],
})

export class StateModule {}

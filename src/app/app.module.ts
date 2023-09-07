import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { StateModule } from './core/state/state.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthPublicGuard } from './core/guards/auth-public-guard/auth-public.guard';
import { AuthPrivateGuard } from './core/guards/auth-private-guard/auth-private.guard';
import { NGXS_PLUGINS } from '@ngxs/store';
import { logoutPlugin } from './core/state/store-logout-plugin/store-logout-plugin';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StateModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  providers: [
    AuthPublicGuard,
    AuthPrivateGuard,
    {
      provide: NGXS_PLUGINS,
      useValue: logoutPlugin,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider} from 'angularx-social-login';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth.interceptor';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './game/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    GameComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1004871412574-hfv3vbkbbgaa2lspecsmhlfrtb72pd3a.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

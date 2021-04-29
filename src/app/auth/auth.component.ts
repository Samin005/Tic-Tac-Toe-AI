import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import {AuthService} from './auth.service';
import {interval, Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // secretData = {name: '', value: ''};
  refreshTokenSubscription: Subscription;

  constructor(private http: HttpClient,
              public socialAuthService: SocialAuthService,
              private authService: AuthService,
              private router: Router) {
    this.refreshTokenSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      // getting user from angularx-social-login
      this.authService.user = user;
      // console.log(user);
      if (user != null) {
        this.authService.callUserSignIn().subscribe((response: any) => {
          // getting tokens from django backend
          this.authService.setTokens(response.access_token, response.refresh_token);
          // refreshing tokens after sign-in
          this.refreshingTokens();
          // making sure the tokens get refreshed before the expiration interval
          this.refreshTokenSubscription = interval(this.authService.refreshTokenInterval).subscribe(() => {
            this.refreshingTokens();
          });
          // console.log(response);
          if (Swal.isVisible()) {
            Swal.fire({
              icon: 'success',
              title: 'Sign-in Success!',
              text: 'Welcome, ' + this.authService.user.name,
              showConfirmButton: false,
              timer: 1000
            }).finally();
          }
        }, (error) => console.log(error));
      }
    });
  }

  refreshingTokens(): void {
    this.authService.callTokenRefresh().subscribe(
      (newToken: any) => {
        this.authService.refreshTokens(newToken);
      });
  }

  signInWithGoogle(): void {
    Swal.fire({title: 'Signing-in with Google...'}).finally();
    Swal.showLoading();
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).catch(error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: error.error,
        timer: 2000
      }).finally();
    });
  }

  signOut(): void {
    Swal.fire({title: 'Signing-out...'}).finally();
    Swal.showLoading();
    this.authService.callUserSignOut().subscribe(
      () => {
        this.authService.resetTokens();
        this.refreshTokenSubscription.unsubscribe();
        this.socialAuthService.signOut()
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Sign-out Success!',
              showConfirmButton: false,
              timer: 1000
            }).finally();
          })
          .catch(error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: error.error
            }).finally();
          });
      }, (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: error.message
        }).finally();
      });
  }

  navigateToLeaderboard(): void {
    this.router.navigate(['leaderboard']).catch(error => console.log(error));
  }
  //
  // requestSecretData(): void {
  //   Swal.showLoading();
  //   this.http.get(this.authService.backendRootUrl + '/secret/').subscribe(
  //     (response: any) => {
  //       // console.log(response);
  //       this.secretData = response;
  //       Swal.fire({
  //         icon: 'info',
  //         title: this.secretData.name + ':',
  //         text: this.secretData.value
  //       }).finally();
  //     },
  //     (error) => {
  //       console.log(error);
  //       Swal.fire({
  //         icon: 'error',
  //         title: error.statusText,
  //         text: error.error.detail
  //       }).finally();
  //     });
  // }
}

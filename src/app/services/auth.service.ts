import { Injectable, NgZone, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../model/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  env = environment.firebaseConfig;
  constructor(private afAuth: AngularFireAuth, private tostr: ToastrService, private router: Router) { }

  async login(email: string, password: string) {
    // from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
    //   catchError((err) => {
    //     return throwError(() => 'Invalid username or password');
    //   })
    // ).subscribe({
    //   next: (val) => {
    //     console.log(val.user);
    //   },
    //   error: (err) => this.tostr.error(err)
    // });

    try {
      const res = await this.afAuth.signInWithEmailAndPassword(email, password);
      const accessToken = await res.user?.getIdToken()
      const userDetail: UserDetail = {
        uid: res.user?.uid,
        email: res.user?.email,
        accessToken: accessToken,
        refreshToken: res.user?.refreshToken
      };

      this.setUser(userDetail);
      this.afAuth.authState.subscribe(user => user ? this.isAdmin() ? this.router.navigate(['/admin']) : this.router.navigate(['/']) : '');
    } catch (error) {
      this.tostr.error('Invalid username or password');
    }
  }

  async logout() {
    await this.afAuth.signOut();
    this.removeUser();
    this.router.navigate(['/login'])
    await this.login(this.env.defaultUser, this.env.defaultPassword);
  }

  async exchangeRefreshToken(): Promise<string> {

    const url = `https://securetoken.googleapis.com/v1/token?key=${this.env.apiKey}`;
    if (!this.getUser().refreshToken) {
      await this.login(this.env.defaultUser, this.env.defaultPassword);
    }
    const user = this.getUser();
    const body = `grant_type=refresh_token&refresh_token=${user.refreshToken}`;
    const options = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }

    const res = await firstValueFrom<any>(this.httpClient.post(url, body, options));
    user.accessToken = res.id_token;
    user.refreshToken = res.refresh_token;
    user.uid = res.user_id;

    this.setUser(user);
    return user.accessToken!;
  }

  setUser(user: UserDetail) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem('user');
  }

  getUser(): UserDetail {
    return JSON.parse(localStorage.getItem('user') || '{}') as UserDetail;
  }

  isLoggedIn(): boolean {
    return this.getUser().uid != undefined && this.isAdmin();
  }

  isAdmin(): boolean {
    const user = this.getUser();
    const tokenDetails = jwtDecode<any>(user.accessToken!);
    return (tokenDetails.email as string) === this.env.adminUser;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDetail } from '../Models/user';
import { firstValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  httpClient = inject(HttpClient);
  afAuth = getAuth();
  afService = inject(AngularFireAuth);

  env = environment.firebaseConfig;
  constructor( private tostr: ToastrService, private router: Router) { }

  async login(email: string, password: string) {
    try {
      const res = await signInWithEmailAndPassword(this.afAuth, email, password);
      const accessToken = await res.user?.getIdToken()
      const userDetail: UserDetail = {
        uid: res.user?.uid,
        email: res.user?.email,
        accessToken: accessToken,
        refreshToken: res.user?.refreshToken
      };

      this.setUser(userDetail);

      onAuthStateChanged(this.afAuth, (user) => {
        if(user){
          this.isAdmin() ? this.router.navigate(['/admin']) : this.router.navigate(['/'])
        }
      })
    } catch (error) {
      this.tostr.error('Invalid username or password');
    }
  }


  async logout() {
    try {
      await signOut(this.afAuth);
      this.removeUser();
      this.router.navigate(['/login'])
    } catch (error) {
    }
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
    return this.getUser().uid != undefined;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    const tokenDetails = jwtDecode<any>(user.accessToken!);
    return (tokenDetails.email as string) === this.env.adminUser;
  }
}

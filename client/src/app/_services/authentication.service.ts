import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private loggeduserSubject: BehaviorSubject<User>;
    public loggeduser: Observable<User>;

    constructor(private http: HttpClient) {
        const userJson = localStorage.getItem('loggeduser');
        this.loggeduserSubject = new BehaviorSubject<User>(userJson !== null ? JSON.parse(userJson) : '');
        this.loggeduser = this.loggeduserSubject.asObservable();
    }

    public get loggeduserValue(): User {
        return this.loggeduserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`auth/login`, { email, password })
            .pipe(map(user => {
                if (user && user.token) {
                    // store user details in local storage to keep user logged in
                    localStorage.setItem('loggeduser', JSON.stringify(user.result));
                    this.loggeduserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user data from local storage for log out
        localStorage.removeItem('loggeduser');
                
    }
}
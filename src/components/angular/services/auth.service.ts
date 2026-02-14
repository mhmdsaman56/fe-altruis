import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {
    private baseUrl = import.meta.env.PUBLIC_API_URL;
    private http = inject(HttpClient);
    login(email: string, password: string) {
        return this.http.post<{payload : {
            access_token: string;
        }}>(`${this.baseUrl}/auth/login`, {email, password});
    }
     handleGoogleLogin(token: string) {
        return this.http.post<{payload : {
            access_token: string;
        }}>(`${this.baseUrl}/auth/google`, {token }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })  ;
    }
    register(name: string, email: string, password: string, password_confirmation: string) {
        return this.http.post<{payload : {
            access_token: string;
        }}>(`${this.baseUrl}/auth/register`, {name, email, password, password_confirmation})
        ;
            
    }
    

    logout() {
        return this.http.post(`${this.baseUrl}/auth/logout`, {
        }, {headers: new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Content-Type': 'application/json'
        })});
    }
}
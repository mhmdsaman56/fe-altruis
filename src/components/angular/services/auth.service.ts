import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {
    private api =  'http://localhost:8000/api';
    private http = inject(HttpClient);
    login(email: string, password: string) {
        return this.http.post<{payload : {
            access_token: string;
        }}>(`${this.api}/auth/login`, {email, password});
    }
    register(name: string, email: string, password: string, password_confirmation: string) {
        return this.http.post<{payload : {
            access_token: string;
        }}>(`${this.api}/auth/register`, {name, email, password, password_confirmation})
        ;
        
        
    }

}
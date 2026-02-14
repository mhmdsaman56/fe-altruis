import { Component, inject, signal, type OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import  { GoogleAuthService } from "../../services/google-auth.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    email = '';
    password = '';
    loading = signal(false);
    error = signal('');
    private auth = inject(AuthService);
    private googleAuth = inject(GoogleAuthService);
    
    
    ngOnInit() {
        this.googleAuth.loadScript().then(() => {
            
            this.googleAuth.init(import.meta.env.PUBLIC_GOOGLE_CLIENT_ID, (response: any) => {
              this.loginWithGoogle(response);
            });
        });
    }
    login( ) {
        this.auth.login(this.email, this.password).subscribe({
            next: (res) => {
                this.loading.set(true);
                this.error.set('');
                console.log('Login Berhasil', res);
                // Simpan token atau redirect
                localStorage.setItem('token', res.payload.access_token);
                document.cookie = `auth_token=${res.payload.access_token}; path=/; max-age=86400; SameSite=Strict`;
                window.location.replace('/timeline');
            },
            error: (err) => {
                this.error.set('Email atau password salah.');
                this.loading.set(false);
            }
        });
        
    }

    loginWithGoogle(response: any) {
        const token = response.credential;
        this.auth.handleGoogleLogin(token).subscribe({
            next: (res) => {
                localStorage.setItem('token', res.payload.access_token);
                document.cookie = `auth_token=${res.payload.access_token}; path=/; max-age=86400; SameSite=Strict`;
                window.location.replace('/timeline');
            },
            error: (err) => {
                console.error('Google Login Error:', err);
                this.error.set('Google login failed.');
            }
        });

    }

}
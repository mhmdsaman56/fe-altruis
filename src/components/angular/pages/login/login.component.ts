import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-login',
    standalone: true,

    imports: [CommonModule, FormsModule,],
    template: `
    <div>
        <h1 class="text-lg font-bold">Log in to your account</h1>
        <p>Enter your information below to log in to your account</p>
    </div>
    <div>
        <label class="font-medium" for="email">Email</label>
        <input
            class="border w-full rounded-md p-2 mt-1"
            type="text"
            placeholder="Your email"
            id="email"
            [(ngModel)]="email"
        />
    </div>
    <div>
        <label class="font-medium" for="password">Password</label>
        <input
            class="border w-full rounded-md p-2 mt-1"
            type="password"
            placeholder="Your password"
            id="password"
            [(ngModel)]="password"
        />
    </div>
    <p *ngIf="error()" class="text-red-500 text-sm">{{ error() }}</p>
                <div class="flex flex-col gap-3">
                <button (click)="login()" class="bg-black text-white rounded-lg p-2"
                [disabled]="loading()"
                >
                
                {{ loading() ? 'Tunggu bentar...' : 'Login' }}
                    
                </button>
                <button (click)="loginWithGoogle()" class="bg-white text-black border border-slate-500 rounded-lg p-2 ">Log in with google</button>
                <p class="text-center text-slate-500">Don't have an account? <a href="/register" class="underline">Sign up</a></p>
            </div>`,
})
export class LoginComponent {
    email = '';
    password = '';
    loading = signal(false);
    error = signal('');
    private auth = inject(AuthService);
    loginWithGoogle() {
        window.location.href = 'http://localhost:8000/api/auth/google/redirect';
    }

    login() {
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

}
import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";


@Component({
    selector: 'app-register',
    standalone: true,
    imports : [FormsModule, CommonModule],
    templateUrl: './register.component.html'   
})
export class RegisterComponent {
    name = '';
    email = ''
    password = '';
    password_confirmation = '';

    loading = signal(false);
    error = signal('');
    private auth = inject(AuthService);

    register() {
        this.auth.register(this.name, this.email, this.password, this.password_confirmation).subscribe({
            next: (res) => {
                this.loading.set(true);
                this.error.set('');
                localStorage.setItem('token', res.payload.access_token);
                document.cookie = `auth_token=${res.payload.access_token}; path=/; max-age=86400; SameSite=Strict`;
                
                window.location.href = '/timeline';
            },
            error: (err) => {
                this.loading.set(false);
                console.error('Registrasi Gagal', err);
                this.error.set('Registrasi gagal. Silakan coba lagi.');
            }
        });
    }
    // Properti dan metode untuk pendaftaran pengguna akan ditambahkan di sini
}
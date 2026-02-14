import {  Injectable } from '@angular/core';
declare const google: any;

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
    loadScript(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (document.getElementById('google-script')) {
                resolve();
                return;
            }
            const script = document.createElement('script');

            script.id = 'google-script';
            script.src = 'https://accounts.google.com/gsi/client';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Google API'));
            script.async = true;
            
            document.body.appendChild(script);
        });

    }

    init (clientId: string, callback: any) {
        google.accounts.id.initialize({
            client_id: clientId,
            callback: callback
        });
        google.accounts.id.renderButton(
            document.getElementById('google-signin-button'),
            { theme: 'outline', size: 'large' }
        );
    }

   
        

    }


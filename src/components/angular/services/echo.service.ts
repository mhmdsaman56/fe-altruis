import { Injectable } from "@angular/core";
import Echo from "laravel-echo"
import Pusher from "pusher-js";

(window as any).Pusher = Pusher

@Injectable({providedIn:'root'})
export class EchoService {
    private echo: Echo<any>;

      constructor() {
    this.echo = new Echo({
      broadcaster: 'reverb',
      key: import.meta.env.PUBLIC_REVERB_KEY,
      authEndpoint: 'http://localhost:8000/broadcasting/auth',
      wsHost: 'localhost',
      wsPort: 8080,
      forceTLS: false,
      auth: {
        headers : {
             get Authorization() {
                 const token = localStorage.getItem('token');
                 console.log('Broadcasting auth token:', token ? 'present' : 'missing');
                 return token ? `Bearer ${token}` : '';
             }
        }
      }
    });
  }

    get instance(): Echo<any>{
        return this.echo;
    }
}
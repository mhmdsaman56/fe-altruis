import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class NotificationService {
        private http = inject(HttpClient);
    
    private baseUrl = import.meta.env.PUBLIC_API_URL;

    
 getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Content-Type': 'application/json'
        });
    }
    
    getNotifications( limit:number | null = null, type: string | null = null) {
          let params = new HttpParams();

  if (limit !== null) {
    params = params.set('limit', limit.toString());
  }

  if (type !== null) {
    params = params.set('type', type);
  }
        return this.http.get<{
            payload: {
                id: number,
                type: string,
                created_at: string
            }[]
        }>(`${this.baseUrl}/notifications`, {
            headers: this.getHeaders(),
            params: params
        });
    }
    
}
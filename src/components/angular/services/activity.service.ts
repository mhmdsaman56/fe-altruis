import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ActivityService {
        private http = inject(HttpClient);
    
    private baseUrl = import.meta.env.PUBLIC_API_URL;

    
 getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Content-Type': 'application/json'
        });
    }
    
    getAllActivities( type: string | null = null, interactionType: string | null = null, reactionType: string | null = null) {
          let params = new HttpParams();

  if (interactionType !== null) {
    params = params.set('interaction_type', interactionType);
  }
  
  if (reactionType !== null) {
    params = params.set('reaction_type', reactionType);
  }
  if (reactionType === "all") {
    params = params.set('reaction_type', '');
  }

  if (type !== null) {
    params = params.set('type', type);
  }
        return this.http.get<{
            payload:        {
                id: number,
                type: string,
                reaction_type: string | null,
                interaction_type: string,
                created_at: string,
                data : {
                  content_body: string,
                }
            }[]
            

        }>(`${this.baseUrl}/activities`, {
            headers: this.getHeaders(),
            params: params
        });
    }
    
}
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ArticleService {
    private api =  'http://localhost:8000/api';
    private http = inject(HttpClient);
    getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Content-Type': 'application/json'
        });
    }
    getUserArticles() {
        return this.http.get<{payload : {
            id: number;
            title: string;
            slug: string;
            content: string;
        }[] }>(`${this.api}/articles`,{
            headers: this.getHeaders()
        });
    }

    getDetailArticle(slug: string) {
        return this.http.get<{payload : {
            id: number;
            title: string;
            slug: string;
            content: string;
        }}>(`${this.api}/articles/${slug}`,{
            headers: this.getHeaders()
        });
    }
    createArticle(title: string, content: string) {

        return this.http.post<{payload : {
            id: number;
            title: string;
        }}>(`${this.api}/articles`, {title, content},{
            headers: this.getHeaders()
        });
    }
}
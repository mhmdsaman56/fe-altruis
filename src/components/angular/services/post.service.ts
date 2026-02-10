import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { string } from "astro:schema";

@Injectable({ providedIn: 'root' })
export class PostService {
    private api = 'http://localhost:8000/api';
    private http = inject(HttpClient);

    getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Content-Type': 'application/json'
        });
    }
    getPosts() {
        // Ganti baris di post.service.ts yang error tadi:

        return this.http.get<{
            payload: {
                id: number, body: string, created_at: string, reaction_counts: {
                    like: number;
                    dislike: number;
                    agree: number;
                    disagree: number;
                    helpful: number;
                    unhelpful: number;
                    upvote: number;
                    downvote: number;
                }
            }[]
        }>(`${this.api}/posts`, {

            headers: this.getHeaders()
        });

    }

    createPost(body: string) {
        return this.http.post<{ payload: { id: number, body: string, created_at: string, reaction_counts: { like: number; dislike: number; agree: number; disagree: number; helpful: number; unhelpful: number; upvote: number; downvote: number } } }>(`${this.api}/posts`, { body }, {
            headers: this.getHeaders()
        });
    }

    addReaction(postId: number, reactionType: string) {
        return this.http.post(`${this.api}/posts/${postId}/reactions`, { type: reactionType }, {
            headers: this.getHeaders()
        });
    }

    addAnswer(postId: number, answerBody: string) {
        return this.http.post<{
            payload: { id: number, body: string, created_at: string, user: {
                id: number,
                name: string
            }, reaction_summary: {
                type: 'like' | 'dislike' | 'agree' | 'disagree' | 'helpful' | 'unhelpful' | 'upvote' | 'downvote',
                count: number
                is_active: boolean
            }[] }, 
        }>(`${this.api}/posts/${postId}/answers`, { body: answerBody }, {
            headers: this.getHeaders()
        });
    }

    getAllAnswers(postId: number) {
        return this.http.get<{
            payload: {
                id: number, body: string, created_at: string, user: {
                    id: number,
                    name: string
                }, reaction_summary: {
                    type: 'like' | 'dislike' | 'agree' | 'disagree' | 'helpful' | 'unhelpful' | 'upvote' | 'downvote',
                    count: number
                    is_active: boolean
                }[]
            }[]
        }>(`${this.api}/posts/${postId}/answers`, {
            headers: this.getHeaders()
        });
    }
}
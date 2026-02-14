import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PostService {

    private http = inject(HttpClient);

    private baseUrl = import.meta.env.PUBLIC_API_URL;

    getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            'Content-Type': 'application/json'
        });
    }
    getPosts() {


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
        }>(`${this.baseUrl}/posts`, {

            headers: this.getHeaders()
        });

    }

    createPost(body: string) {
        return this.http.post<{ payload: { id: number, body: string, created_at: string, reaction_counts: { like: number; dislike: number; agree: number; disagree: number; helpful: number; unhelpful: number; upvote: number; downvote: number } } }>(`${this.baseUrl}/posts`, { body }, {
            headers: this.getHeaders()
        });
    }

    addReaction(postId: number, reactionType: string) {

    const url = `${this.baseUrl}/posts/${postId}/reactions`;
    return this.http.post(url, { type: reactionType }, {
        headers: this.getHeaders()
    });
}


    addAnswer(postId: number, answerBody: string, contentType: string = 'answer') {
        return this.http.post<{
            payload: {
                id: number, body: string, created_at: string, user: {
                    id: number,
                    name: string
                }, reaction_summary: {
                    type: 'like' | 'dislike' | 'agree' | 'disagree' | 'helpful' | 'unhelpful' | 'upvote' | 'downvote',
                    count: number
                    is_active: boolean
                }[]
            },
        }>(`${this.baseUrl}/posts/${postId}/answers`, { body: answerBody, content_type: contentType }, {
            headers: this.getHeaders()
        });
    }

    getAllAnswers(postId: number) {
        return this.http.get<{
            payload: {
                id: number, slug: string, body: string, created_at: string, user: {
                    id: number,
                    name: string,
                }, reaction_summary: {
                    type: 'like' | 'dislike' | 'agree' | 'disagree' | 'helpful' | 'unhelpful' | 'upvote' | 'downvote',
                    count: number
                    is_active: boolean
                }[]
            }[]
        }>(`${this.baseUrl}/posts/${postId}/answers`, {
            headers: this.getHeaders()
        });
    }

    detailDiscussion(slug: string) {
        console.log('Detail discussion called with slug:', slug);
        return this.http.get<{
            payload: {
                id: number, body: string, created_at: string, reaction_summary: {
                    type: 'like' | 'dislike' | 'agree' | 'disagree' | 'helpful' | 'unhelpful' | 'upvote' | 'downvote',
                    count: number,
                    is_active: boolean
                }[]
            }
        }>(`${this.baseUrl}/posts/${slug}`, {
            headers: this.getHeaders()
        });
    }
}
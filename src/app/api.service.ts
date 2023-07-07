import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    private apiUrl = 'http://localhost:3000/api';

    getData() {
        return axios.get(`${this.apiUrl}/data`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    submitMessage(name:string, message:string) {
        const body = { name, message };
        return axios.post(`${this.apiUrl}/submit`, body);
    }
}
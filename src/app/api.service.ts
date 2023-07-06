import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    private apiUrl = 'http://localhost:3000/api/data';

    getData() {
        return axios.get(this.apiUrl)
            .then(response => response.data)
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }
}
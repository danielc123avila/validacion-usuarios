import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119';
  private token = '790cfdfb568c8ca697c72f52d8fab5af63ede025';

  getUserByCedula(cedula: string): Promise<any> {
    return fetch(`${this.baseUrl}/${cedula}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.token}`,
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  }

  registerUser(data: any): Promise<any> {
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json());
  }
}

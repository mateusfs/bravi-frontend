import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeaderService {

  constructor() { }

  public getHeaders() {
    return this.getDefaultHeaders();
  }

  private getDefaultHeaders() {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Origin', '*'); 
    headers.append('content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa('BRAVI')); 
    return headers;
  }
}

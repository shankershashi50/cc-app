import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  constructor(private httpClient: HttpClient) { }
}

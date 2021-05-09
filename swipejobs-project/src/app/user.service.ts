import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const USER_ID: string = '7f90df6e-b832-44e2-b624-3143d428001f';
const GET_PROFILE_ENDPOINT: string = 'https://test.swipejobs.com/api/worker';

export interface WorkerProfile{
  address?: {
    formattedAddress?: string;
    zoneId?: string;
  };
  email?: string;
  firstName?: string;
  lastName?: string;
  maxJobDistance?: number;
  phoneNumber?: string;
  workerId: string;
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<WorkerProfile> {
    return this.http.get(`${GET_PROFILE_ENDPOINT}/${USER_ID}/profile`) as Observable<WorkerProfile>;
  }
}

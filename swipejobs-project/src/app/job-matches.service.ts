import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Company {
  name?: string;
  address?: {
    formattedAddress?: string;
    zondId? : string;
  };
  reportTo?: {
    name?: string;
    phone?: string;
  };

};

export interface Shift{
  startDate: string;
  endDate: string;
  formattedStartTime?: Date;
  formattedEndTime?: Date;
};

export interface WorkMatch{
  jobId: string;
  jobTitle?: {
    name?: string;
    imageUrl?: string;
  };
  company?: Company;
  wagePerHourInCents?: number;
  wagePerHourInDollar?: string;
  milesToTravel?: number;
  roundedMilesToTravel?: string;
  preciseMilesToTravel?: string;
  shifts?: Shift[];
  branch?: string;
  branchPhoneNumber?: string;
  requirements?: string[];
  isLast?: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class JobMatchesService {

  constructor(private http: HttpClient) { }

  getJobMatchesByUserId(userId: string): Observable<WorkMatch[]>{
    return this.http.get(`https://test.swipejobs.com/api/worker/${userId}/matches`) as Observable<WorkMatch[]>;
  }
}

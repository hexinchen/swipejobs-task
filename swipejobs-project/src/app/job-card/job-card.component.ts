import { Component, OnInit } from '@angular/core';
import { JobMatchesService, WorkMatch } from '../job-matches.service';
import { UserService, WorkerProfile } from '../user.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {

  constructor(private userService: UserService,
    private jobMatchesService: JobMatchesService) { }
  user: WorkerProfile | null = null;
  jobMatchs: WorkMatch[] = [];
  currentJob: WorkMatch | null = null;

  async ngOnInit(): Promise<void> {
    const userProfileResponse: WorkerProfile = await this.userService.getUserProfile().toPromise();
    if(userProfileResponse){
      this.user = userProfileResponse;
      this.jobMatchesService.getJobMatchesByUserId(this.user.workerId).subscribe(matchsResponse => {
        this.jobMatchs = matchsResponse.map(res => {
          return {
            ...res,
            roundedMilesToTravel: res.milesToTravel?.toFixed(1),
            wagePerHourInDollar : res.wagePerHourInCents ?  (res.wagePerHourInCents / 100.0).toFixed(2) : '-'
          };
        });
        this.currentJob = this.jobMatchs.length ? this.jobMatchs[0] : null;
      });
    }else{
      //user doesn't exist
    };

  }



}

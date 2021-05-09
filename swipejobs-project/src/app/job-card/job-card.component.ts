import { Component, OnInit, ɵSWITCH_RENDERER2_FACTORY__POST_R3__, ɵSWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobMatchesService, WorkMatch } from '../job-matches.service';
import { UserService, WorkerProfile } from '../user.service';


@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {

  constructor(private userService: UserService,
    private jobMatchesService: JobMatchesService,
    private snackBar: MatSnackBar) {
      this.myDate = new Date();
     }
  user!: WorkerProfile;
  jobMatchs: WorkMatch[] = [];
  currentJob: WorkMatch | null = null;
  myDate: Date;

  async ngOnInit(): Promise<void> {
    const userProfileResponse: WorkerProfile = await this.userService.getUserProfile().toPromise();
    if (userProfileResponse) {
      this.user = userProfileResponse;
      this.jobMatchesService.getJobMatchesByUserId(this.user.workerId).subscribe(matchsResponse => {
        this.jobMatchs = matchsResponse.map(res => {
          if (res.shifts) {
            res.shifts = res.shifts.map(shift => {
              return {
                ...shift,
                formattedStartTime: new Date(shift.startDate),
                formattedEndTime: new Date(shift.endDate),
              };
            });
          }
          return {
            ...res,
            isLast: false,
            roundedMilesToTravel: res.milesToTravel?.toFixed(1),
            preciseMilesToTravel: res.milesToTravel?.toFixed(2),
            wagePerHourInDollar: res.wagePerHourInCents ? (res.wagePerHourInCents / 100.0).toFixed(2) : '-',
          };
        });
        this.jobMatchs[this.jobMatchs.length - 1].isLast = true;

        this.currentJob = this.jobMatchs.length ? this.jobMatchs[0] : null;
      });
    } else {
      //user doesn't exist
    };

  }

  nextJob(): void{
    if(this.currentJob?.isLast){
      this.currentJob = this.jobMatchs[0];
    }else{
      this.currentJob = this.jobMatchs[this.jobMatchs.findIndex(job => job.jobId === this.currentJob?.jobId) + 1];
    }
  }

  async acceptJob(): Promise<void>{
    const res = await this.jobMatchesService.acceptJobById(this.user.workerId, this.currentJob!.jobId);
    this.snackBar.open(res.success ? 'Accepted!' : res.message, 'OK');
  }

  async rejectJob(): Promise<void>{
    const res = await this.jobMatchesService.rejectJobById(this.user.workerId, this.currentJob!.jobId);
    this.snackBar.open(res.success ? 'Rejected.' : res.message, 'OK');
  }

}

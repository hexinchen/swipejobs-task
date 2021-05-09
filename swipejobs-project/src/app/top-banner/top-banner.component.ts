import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.scss']
})
export class TopBannerComponent implements OnInit {

  constructor(private userService: UserService) { }
  name: string = '';

  ngOnInit(): void {
    this.userService.getUserProfile().pipe(
      filter(res => !!res)
    ).subscribe(profile => {
        this.name = profile.firstName + ' ' + profile.lastName;
    });
  }

}

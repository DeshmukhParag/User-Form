import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Page } from 'src/app/model/user';
import { UserService } from 'src/app/service/user/user.service';
import { AppViewError } from 'src/app/modules/error-view/components/error-view/error-view.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authetication/authentication.service';
import { ColumnMode } from '@swimlane/ngx-datatable';



@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userRegisterForm: FormGroup;
  user: User = new User();
  page: Page = new Page();
  rows: User[] = [];
  userData: User[] = [];
  myDateValue: Date;
  minBirthDate: Date;
  maxBirthDate: Date;
  ColumnMode = ColumnMode;
  stateList: Array<any> = [
    { name: 'Maharastra', cities: ['Pune', 'Mumbai', 'Aurangabad'] },
    { name: 'Gujrat', cities: ['Surat'] },
    { name: 'Delhi', cities: ['Noida'] }
  ];
  usedata: Array<any> = [
    { firstName: 'Maharastra' },
    { firstName: 'Gujrat' },
    { firstName: 'Delhi' }
  ];
  cities: Array<any>;
  public appErrors: AppViewError[] = new Array<AppViewError>();
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService) {
    if (this.authenticationService.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
    this.getAllUserData();

    this.userRegisterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      dateofbirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
    this.minBirthDate = new Date();
    this.myDateValue = new Date();
    this.maxBirthDate = new Date();
    this.minBirthDate.setDate(this.minBirthDate.getDate() - 12000);
    this.maxBirthDate.setDate(this.minBirthDate.getDate() - 8000);
  }


  ngOnInit() {
    this.myDateValue = new Date();
    this.page.count = 0;
    this.page.number = 1;
    this.page.size = 10;


  }

  onSubmit() {
    this.user = new User();
    this.user.firstName = this.userRegisterForm.get('firstName').value;
    this.user.lastName = this.userRegisterForm.get('lastName').value;
    this.user.email = this.userRegisterForm.get('email').value;
    this.user.dateofbirth = this.userRegisterForm.get('dateofbirth').value;
    this.user.gender = this.userRegisterForm.get('gender').value;
    this.user.state = this.userRegisterForm.get('state').value;
    this.user.city = this.userRegisterForm.get('city').value;
    this.userData.push(this.user);
    this.onDate(this.userData, 10);
  }
  changeCountry(count) {
    this.cities = this.stateList.find(con => con.name === count).cities;
  }



  onDate(user: User[], count: number) {
    this.clearErrors();
    this.rows = [];
    this.rows = user;
    this.userService.updateUserData(user); // Update User In Behaviour Subject
    this.userRegisterForm.reset(); // Reset the User Form
    this.appErrors.push({ type: 'success', message: 'Record saved successfully.' });
    this.getAllUserData(); // get Data From Behaviour Subject
  }
  setPage(pageInfo) {
    this.page.number = pageInfo.offset + 1;
  }
  clearErrors() {
    this.appErrors.splice(0, this.appErrors.length);
  }

  getAllUserData() {
    this.userService.getAllUserData().subscribe(res => {
      this.rows = [...res];
      this.page.count = res.length;
    });
  }
}

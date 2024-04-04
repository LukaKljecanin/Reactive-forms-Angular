import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  singnupForm: FormGroup;
  forbiddenPeople = ['Leo', 'Anna'];

  ngOnInit(): void {
    this.singnupForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        this.forbidden.bind(this),
      ]),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.forbiddenEmail
      ),
      gender: new FormControl('male'),
      hobbies: new FormArray([new FormControl()]),
    });
  }

  onSubmit() {
    console.log(this.singnupForm);
    this.singnupForm.reset({ gender: 'male' });
  }

  getControls() {
    return (<FormArray>this.singnupForm.get('hobbies')).controls;
  }

  onAddHobbies() {
    const control = new FormControl(null, Validators.required);
    (this.singnupForm.get('hobbies') as FormArray).push(control);
  }

  forbidden(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenPeople.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'kljecaninluka@gmail.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }
}

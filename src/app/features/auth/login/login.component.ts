import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {AuthMasterComponent} from "../../../shared/components/auth-master/auth-master.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {selectUser, selectUserError, selectUserLoading, UserActions} from '../../../store';
import {filter, take, tap} from 'rxjs';

@Component({
  selector: 'app-login',
    imports: [
        AsyncPipe,
        AuthMasterComponent,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly loading = toSignal(this.store.select(selectUserLoading));
  readonly error$ = this.store.select(selectUserError);

  constructor() {
    this.store.select(selectUser).pipe(
      filter(user => !!user),
      take(1),
      tap(() => console.log("Logged in"))
    ).subscribe();
  }

  readonly form: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }
  )

  onSubmit(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(UserActions.loginUser({
      loginUser:  this.form.value
    }));
  }
}

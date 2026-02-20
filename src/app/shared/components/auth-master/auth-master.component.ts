import {Component, input} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-auth-master',
    imports: [
        FormsModule
    ],
  templateUrl: './auth-master.component.html',
  styleUrl: './auth-master.component.css'
})
export class AuthMasterComponent {
  title = input.required<string>();
  subTitle = input.required<string>();
}

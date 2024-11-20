import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MortgageType} from './mortgageType';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    RouterLink,
    MatCardContent,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  valid: any = true;
  mortgageForm:FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.mortgageForm = this._formBuilder.group({
      'mortgageAmount': ['',
        [
          Validators.required,
          Validators.min(10000),
          Validators.pattern('^[0-9]*$')]
      ],
      'mortgageTerm': ['',
        [
          Validators.required,
          Validators.min(5),
          Validators.max(30),
          Validators.pattern('^[0-9]*$')]
      ],
      'interestRate': ['',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern('^[0-9]*$')]
      ],
      'mortgageType': [MortgageType.Repayment, Validators.required],
    });
  }

  ngOnInit(): void {

  }

  calculatePayments() {
    console.log(this.mortgageForm.get('mortgageAmount')?.value);
    console.log(this.mortgageForm.get('mortgageTerm')?.value);
    console.log(this.mortgageForm.get('interestRate')?.value);
    console.log(this.mortgageForm.get('mortgageType')?.value);

  }
}

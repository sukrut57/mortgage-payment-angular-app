import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MortgageType} from './mortgageType';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';

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
    MatButtonModule,
    CurrencyPipe 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  valid: any = true;
  mortgageForm:FormGroup;
  monthlyPayment: number = 0;
  totalPayment: number = 0;

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
    try{
      if(this.mortgageForm.valid &&
        this.mortgageAmount !== undefined &&
        this.interestRate !== undefined &&
        this.mortgageType !== undefined &&
        this.mortgageTerm !== undefined
      )
      {
        this.valid = true;
  
        console.log(this.mortgageAmount?.value);
        console.log(this.interestRate?.value);
        console.log(this.mortgageTerm?.value);
        console.log(this.mortgageType?.value);

      
        if(this.mortgageType?.value === 'Repayment'){
          this.calculateTotalRepayments();
        }
        else{
          this.calculateTotalInterest();
        }
      }
      else{
        throw new Error('Invalid form');
      }
    }
    catch(error){
      console.error(error);
    }
  
  }

  //Getters
  get mortgageAmount() {
    return this.mortgageForm.get('mortgageAmount');
  }
  get mortgageTerm() {
    return this.mortgageForm.get('mortgageTerm');
  }

  get interestRate() {
    return this.mortgageForm.get('interestRate');
  }

  get mortgageType() {
    return this.mortgageForm.get('mortgageType');
  }

  calculateTotalRepayments(){

    const principal = this.mortgageAmount?.value;

    const annualInterestRate = this.interestRate?.value / 100;

    const monthlyInterestRate = annualInterestRate / 12;

    const numberOfPayments = this.mortgageTerm?.value * 12;

    const monthlyPayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    const totalPayment = monthlyPayment * numberOfPayments;

    this.monthlyPayment = monthlyPayment;

    this.totalPayment = totalPayment;

  }


  calculateTotalInterest(){
    const principal = this.mortgageAmount?.value;

    const annualInterestRate = this.interestRate?.value / 100;

    const monthlyInterestRate = annualInterestRate / 12;

    const numberOfPayments = this.mortgageTerm?.value * 12;

    const totalInterest = principal * monthlyInterestRate * numberOfPayments;

    this.totalPayment = totalInterest;
  }

  clearForm(){
    this.mortgageForm.reset();
    this.valid = false;
    this.monthlyPayment = 0;
    this.totalPayment = 0;

  }
}

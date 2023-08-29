import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Regex } from 'src/app/common/regex';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.css']
})
export class ATMComponent implements OnInit {

  // currencyDenominations array to dynamically change atm as per current denominations. if any denomination chages then just change in this array it will dynamically reflect in this app.
  currencyDenominations = ['2000', '500', '200', '100']
  currentDeposits: {
    [key: string]: number
  } = {};
  logs: {
    type: "success" | "info" | "danger",
    summary: string,
    dateTime: Date,
  }[] = [];
  DepositForm = new FormGroup<any>({});
  withdrawAmountControl = new FormControl('', [Validators.required, Validators.pattern(Regex.onlyWholeNumbersWithoutZeroWithDecimalValueZero)]) // adding required validator to handle null values

  ngOnInit(): void {
    this.currencyDenominations.forEach((noteValue: string) => {
      // initial value setup
      this.currentDeposits[noteValue] = 0;
      // initial form setup
      this.DepositForm.addControl(noteValue, new FormControl('', Validators.pattern(Regex.onlyWholeNumbersWithDecimalValueZero)));
    })
    this.DepositForm.addValidators((control) => {
      const values = control.value;
      for (let i = 0; i < this.currencyDenominations.length; i++) {
        if (Number(values[this.currencyDenominations[i]])) {
          return null
        }
      }
      return {
        ...control.errors,
        'allFieldsEmptyError': true
      }
    })
  }

  onDeposit() {
    if (this.DepositForm.invalid) {
      this.logs.unshift({
        type: 'danger',
        summary: 'Cannot Deposit',
        dateTime: new Date(),
      })
      this.DepositForm.reset();
      return;
    }

    const formValues: any = this.DepositForm.value;
    const currentDeposits: any = this.currentDeposits;
    let summary = 'Deposit';
    this.currencyDenominations.forEach((noteValue: string) => {
      const numberOfNotes = Number(formValues[noteValue]);
      // updating current deposits object to update number of notes
      currentDeposits[noteValue] += numberOfNotes;
      // creating summary to show on UI.
      summary += ` ${noteValue}:${numberOfNotes}`
    })

    this.logs.unshift({
      type: 'info',
      summary,
      dateTime: new Date()
    })
    this.DepositForm.reset();
  }

  onWithdraw() {
    if (this.withdrawAmountControl.invalid) {
      this.logs.unshift({
        type: 'danger',
        summary: 'Cannot Withdraw',
        dateTime: new Date(),
      })
      this.withdrawAmountControl.reset();
      return;
    }

    const withdrawAmount = Number(this.withdrawAmountControl.value);
    let remainingAmount = withdrawAmount;

    const withDrawedNotes: any = {};
    // to create copy of current deposits if withdraw transaction successfully completed then change this object.
    const currentDeposits: any = JSON.parse(JSON.stringify(this.currentDeposits));
    let summary = `Withdraw [${withdrawAmount}]`;
    this.currencyDenominations.forEach((noteValue: string) => {
      let noOfNotesWithdrawn = Math.floor(remainingAmount / Number(noteValue));
      // no of notes to withdrawn is greater than current deposit notes of a particluar denomination then withdrawn all notes of that particular denomination
      if (noOfNotesWithdrawn > currentDeposits[noteValue]) {
        noOfNotesWithdrawn = currentDeposits[noteValue];
      }
      // adding notes to withDrawedNotes to show in summary.
      withDrawedNotes[noteValue] = noOfNotesWithdrawn;
      // reducing remaining amount
      remainingAmount -= noOfNotesWithdrawn * Number(noteValue);
      // updating current deposites of notes
      currentDeposits[noteValue] -= noOfNotesWithdrawn;
      // updating summary to show on UI.
      summary += ` ${noteValue}:${noOfNotesWithdrawn}`
    })

    if (remainingAmount !== 0) {
      this.logs.unshift({
        type: 'danger',
        summary: 'Cannot Withdraw',
        dateTime: new Date(),
      })
      this.withdrawAmountControl.reset();
      return;
    }

    // updating current deposit object now since transaction is successfully completed.
    this.currentDeposits = currentDeposits;
    this.logs.unshift({
      type: 'success',
      summary,
      dateTime: new Date()
    })
    this.withdrawAmountControl.reset();
  }

  get Total() {
    return this.currencyDenominations.reduce((total, denomination) => total + this.currentDeposits[denomination] * Number(denomination), 0);
  }
}

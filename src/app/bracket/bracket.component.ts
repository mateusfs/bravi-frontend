import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})

export class BracketComponent implements OnInit {

  
  public isBracketValid: boolean = false;
  public bracket: string = "";

  constructor() { }

  ngOnInit() { }

  balancedBrackets() {

    var rx1 = /\[([^\]]+)]/;
    var rx2 = /\(([^)]+)\)/;
    var rx3 = /{([^}]+)}/;
    var rx4 = /[^a-zA-Z0-9]/;
    
    this.isBracketValid = true;

    if (rx1.test(this.bracket) || rx2.test(this.bracket) || rx3.test(this.bracket) || rx4.test(this.bracket)) {
      this.isBracketValid = false;
    }
  }

  showError(){
    return this.isBracketValid && this.bracket;
  }

  showSuccess(){
    return !this.isBracketValid && this.bracket;
  }

}

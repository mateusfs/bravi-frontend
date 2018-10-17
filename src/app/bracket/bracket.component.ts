import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})

export class BracketComponent implements OnInit {

  
  public isBracketValid: boolean = false;
  public bracket: string = "";
  private regex = /[a-zA-Z0-9]/;
  
  constructor() { }

  ngOnInit() { }

  balancedBrackets() {

    this.isBracketValid = true;

    if (!this.regex.test(this.bracket)) {
      this.isBracketValid = false;
    }

    this.validabalancedBracketsPair('(', ')');
    this.validabalancedBracketsPair('[', ']');
    this.validabalancedBracketsPair('{', '}');
  }

  private validabalancedBracketsPair(param1, param2){
    if(this.bracket.split(param1).length !== this.bracket.split(param2).length){
      this.isBracketValid = true;
    }
  }

  public showError(){
    return this.isBracketValid && this.bracket;
  }

  public showSuccess(){
    return !this.isBracketValid && this.bracket;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})

export class BracketComponent implements OnInit {

  
  public isBracketValid: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  balancedBrackets(event: any) {

    //const pattern = /\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/;
    const pattern = /\(([^()]*|\([^()]*\))*\)/;
    const inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode == '32') {
      this.isBracketValid = false;
    }

    if (!pattern.test(inputChar)) {
      this.isBracketValid = true;
    }

    this.isBracketValid = false;
  }
}

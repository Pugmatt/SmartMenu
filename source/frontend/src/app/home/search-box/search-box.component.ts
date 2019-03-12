import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  onSubmit(form: NgForm) {
    if(form.value.restaurant || form.value.location)
      this.router.navigate(['/search', !form.value.restaurant ? "all" : form.value.restaurant, form.value.location]);
  }
  
  constructor(
    private router: Router) { 
    }

  ngOnInit() {
  }

}

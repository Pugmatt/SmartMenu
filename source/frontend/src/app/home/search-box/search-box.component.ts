import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  onSubmit(form: NgForm) {
    if(form.value.restaurant || form.value.location)
      this.router.navigate(['/search', !form.value.restaurant ? "all" : form.value.restaurant, !form.value.location ? "all" : form.value.location, "1"]);
  }
  
  constructor(
    private router: Router,
    private http: HttpClient) {
    }

  public locationInfo;
  public location = '';


  ngOnInit() {
    this.http.get('http://api.ipstack.com/check?access_key=b7637044eac5914b50f1bc026ab8db08&fields=country_name,region_name,city,zip').subscribe(info => this.location = info.city + ' ' + info.region_name + ' ' + info.zip);

  }

}

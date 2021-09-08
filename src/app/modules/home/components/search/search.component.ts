import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GiphyService } from '@core/services/giphy/giphy.service';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  search = new FormControl();
  giphy: Array<any> = [];
  loading = false;

  constructor(private giphyService: GiphyService) {}

  fetchData(value: string): void {
    this.loading = true;
    this.giphyService
      .getData(value)
      .pipe(
        map((res: any) => res.data.map((item: any) => item.images.downsized))
      )
      .subscribe((res) => {
        this.giphy = res;
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => this.fetchData(value));
  }
}

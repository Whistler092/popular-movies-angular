import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mostpopular',
  templateUrl: './mostpopular.component.html',
  styleUrls: ['./mostpopular.component.css'],
  providers: [MoviesService]
})
export class MostpopularComponent implements OnInit {

  dataMovies: any[];
  page: number = 1;
  pages: number[] = [];
  countProperty: number = 0;
  searchMovieInput: string;

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.searchPopulators(this.page);
    //this.router.navigate(['/movie/'])
  }

  searchMovie(event: any) {
    this.searchMovieInput = event.target.value;
    this.searchMovieEvent();
  }

  searchMovieEvent() {
    /*console.log("searchMovieEvent", this.searchMovieInput);*/
    if (this.searchMovieInput === ""  || this.searchMovieInput === undefined) {
      this.page = 1;
      this.searchPopulators(this.page);
    } else {
      this.moviesService.searchMoviesByName(this.searchMovieInput, this.page)
        .subscribe(data => {
          this.dataMovies = data['results'];
          this.countProperty = data['total_pages'];
          this.pages = [];
          for (var i = this.page; i <= this.page + 3; i++) {
            this.pages.push(i);
          }
        })
    }

  }

  searchPopulators(page: number) {
    /*console.log("searchPopulators");*/

    this.moviesService.searchMoviesPopulators(page)
      .subscribe(data => {
        this.dataMovies = data['results'];
        this.countProperty = data['total_pages'];
        this.pages = [];
        for (var i = this.page; i <= this.page + 3; i++) {
          this.pages.push(i);
        }
      });
  }

  last_page() {
    /*console.log("last_page");*/


    if (this.page != 1) {
      this.page = this.page - 1;

      if (this.searchMovieInput === "" || this.searchMovieInput === undefined) {
        this.searchPopulators(this.page);
      } else {
        this.searchMovieEvent();
      }


    }
  }
  next_page() {
    /*console.log("next_page");*/

    this.page = this.page + 1;

    if (this.searchMovieInput === ""  || this.searchMovieInput === undefined) {
      this.searchPopulators(this.page);
    } else {
      this.searchMovieEvent();
    }
  }
}

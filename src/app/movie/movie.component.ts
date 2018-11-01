import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from './../services/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [MoviesService]

})
export class MovieComponent implements OnInit, OnDestroy {

  id: number;
  private sub:Subscription;
  movie: any;
  imgBaseUrl: string;
  posterUrl: string;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {
    this.posterUrl = 'http://via.placeholder.com/154x218?text=Not+avaliable';

   }

  ngOnInit() {
    this.movie = {};
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log("id", this.id);
      this.searchMovie(this.id);
    })
  }

  searchMovie(id: number){
    this.moviesService.findMovie(id)
    .subscribe(data =>{
        this.movie = data;
        console.log(this.movie);
        this.posterUrl =  `https://image.tmdb.org/t/p/w185_and_h278_bestv2${this.movie.poster_path}`;

    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

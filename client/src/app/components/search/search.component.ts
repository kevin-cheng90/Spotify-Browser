import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  slide = 0;
  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    var selected = <HTMLInputElement>document.getElementById("selectCategory");
    var searched = <HTMLInputElement>document.getElementById("searchInput");
    var selCategory = selected.value;
    var serString = searched.value;
    this.searchString = serString;
    this.searchCategory = selCategory;
    var artID = ""
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then((data) => {
      var i = 0;
      this.resources = [];
      for (i; i < data.length; i++)
      {
        this.resources.push(data[i]);
      }
    });
  }

  getResources(){
    return this.resources;
  }

  clickNext()
    {
      if (this.slide == this.resources.length-1)
      {
        this.slide = 0;
      }
      else
      {
        this.slide += 1;
      }
    }
    clickPrev()
    {
      if (this.slide == 0)
      {
        this.slide = this.resources.length-1;
      }
      else
      {
        this.slide -= 1;
      }
    }
}

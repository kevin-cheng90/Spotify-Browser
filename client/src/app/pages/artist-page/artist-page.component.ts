import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service'

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];
  slide = 0;

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data,
    // related artists, top tracks for the artist, and the artist's albums
    this.spotifyService.getArtist(this.artistId).then((data) => {
      this.artist = data
      console.log(this.artist);
    });

    this.spotifyService.getRelatedArtists(this.artistId).then((data) => {
      let i = 0;
      this.relatedArtists = [];
      for (i; i < data.length; i++)
      {
        this.relatedArtists.push(data[i]);
      }
      //console.log(this.relatedArtists);
    });

    this.spotifyService.getTopTracksForArtist(this.artistId).then((data) => {
      let i = 0;
      this.topTracks = [];
      for (i; i < data.length; i++)
      {
        this.topTracks.push(data[i]);
      }
      //console.log(this.topTracks)
    });

    this.spotifyService.getAlbumsForArtist(this.artistId).then((data) => {
      let i = 0;
      this.albums = [];
      console.log(data);
      for (i; i < data.length; i++)
      {
        this.albums.push(data[i]);
      }
      console.log(this.albums);
    })
  }
  openSpotifyArtist()
  {
    window.open(this.artist.url);
  }

  clickNext()
    {
      if (this.slide == this.albums.length-1)
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
        this.slide = this.albums.length-1;
      }
      else
      {
        this.slide -= 1;
      }
    }

}

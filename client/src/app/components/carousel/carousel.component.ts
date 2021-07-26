import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
	@Input() carouselId:string;
	@Input() resources:ResourceData[];
	slide = 0;
  constructor() { }

  ngOnInit() {
  console.log(this.resources);
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

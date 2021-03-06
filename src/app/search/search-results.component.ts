import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/event.model';
import { EventService } from '../shared/event.service';
import { Sport } from '../shared/sport.model';
import { SportService } from '../shared/sport.service';
import { District } from '../shared/district.model';
import { DistrictService } from '../shared/district.service';
import { Headers, Http } from '@angular/http';
import { I18nPluralPipe } from '@angular/common';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  events:Event[]
  sortBy:string = 'date'
  filterBy:string = 'all'
  visibleEvents:Event[]=[]
  filteredEvents: Event[]=[]
  sports = [];
  districts = [];
  searchedSport:string
  searchedSportId:number
  searchedDistrict:string  
  searchedDate:string
  form: any;
  eventMapping:
  {[k: string]: string} = {'=0': 'No results', '=1': '1 result', 'other': '# results'};

  constructor(private eventService:EventService, private sportService:SportService, private districtService:DistrictService) { }

  ngOnInit() {
    this.eventService.getEvents().then(events => {
      this.events = events;
      this.visibleEvents = events;
      this.filteredEvents = events
      this.sortDate();
      this.sportService.getSports().then(sports => {
        this.sports = sports;
        if(this.sportService.searchedSportId){
          this.filterSport(this.sportService.searchedSportName,this.sportService.searchedSportId)
          this.searchedSport = this.sportService.searchedSportName
          this.searchedSportId = this.sportService.searchedSportId
          this.sportService.searchedSportId=null
        }
      })
    })
 
    this.districtService.getDistricts().then(districts => {
      this.districts = districts
    })
  }

  resetSearch(){
      this.searchedSport=null          
      this.visibleEvents = this.events
  }

  filterSport(sportName, sportId){
    document.getElementById('clearSearch').click();    
    this.searchedDistrict = null    
    this.searchedSport = sportName
    console.log(sportId)
    this.visibleEvents = this.filteredEvents = this.visibleEvents.filter(function(event){
      return event.sport_id === sportId
    })
    console.log(this.visibleEvents)
  }
  
  filterDistrict(districtName, districtId){
    document.getElementById('clearSearch').click();        
    this.searchedSport = null    
    this.searchedDistrict = districtName
    console.log(districtId)    
    this.visibleEvents = this.filteredEvents = this.visibleEvents.filter(function(event){
      return event.district_id === districtId
    })
  }

  // filterDate(value){
  //   console.log(value)
  //   this.searchedDate = value
  //   this.visibleEvents = this.filteredEvents = this.events.filter(function(event){
  //     return event.date === value
  //   })
  // }
 
  sortDate(){
    this.visibleEvents = this.visibleEvents.sort(sortByDateAsc)
  }

  sortPrice(){
    this.visibleEvents = this.visibleEvents.sort(sortByPriceAsc)
  }

  filterAll(){
    this.visibleEvents = this.filteredEvents
  }

  filterBeginner(){
    this.visibleEvents = this.filteredEvents.filter(function(event){
      return event.level.toLowerCase() === 'beginners'
    })
  }

  filterIntermediate(){
    this.visibleEvents = this.filteredEvents.filter(function(event){
      return event.level.toLowerCase() === 'intermediate'
    })
  }

  filterAdvanced(){
    this.visibleEvents = this.filteredEvents.filter(function(event){
      return event.level.toLowerCase() === 'advanced'
    })
  }



  // PRIOR TO promises implementation
  // ngOnInit() {
  //   this.events = this.eventService.getEvents().map(events => events)
  //   this.visibleEvents = this.events
  //   this.sortDate()
  //   return this.visibleEvents
  // }

    /// material slider
    autoTicks = false;
    disabled = false;
    invert = false;
    max = 100;
    min = 0;
    showTicks = false;
    step = 1;
    thumbLabel = true;
    value = 0;
    vertical = false;
  
    get tickInterval(): number | 'auto' {
      return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
    }
    set tickInterval(v) {
      this._tickInterval = Number(v);
    }
    private _tickInterval = 1;
    // end material slider

}

function sortByDateAsc(e1:Event, e2:Event){
  if(e1.date > e2.date) return 1
  else if (e1.date === e2.date) return 0
  else return -1
}

function sortByPriceAsc(e1:Event, e2:Event){
  console.log('ken')
  if(e1.price > e2.price) return 1
  else if (e1.price === e2.price) return 0
  else return -1
}
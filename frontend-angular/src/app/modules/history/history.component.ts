import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit{

  history       : any = [];
  
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.init();
  }

  async init(){
    this.history = await this.apiService.getHistory();
  }

}

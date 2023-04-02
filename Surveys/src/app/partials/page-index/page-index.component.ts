import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-index',
  templateUrl: './page-index.component.html',
  styleUrls: ['./page-index.component.css']
})
export class PageIndexComponent implements OnInit {
  title!: string;
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.title = this.route.snapshot.data['title']
  }
}

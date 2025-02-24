import { Component, OnInit } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-doc',
  imports: [SplitterModule, RouterOutlet],
  templateUrl: './doc.component.html'
})
export class DocComponent implements OnInit {
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }
  
  ngOnInit(): void {
    // welcome article displayed at initialization
    const tmp = this.activatedRoute.firstChild?.snapshot.paramMap.get("id");
    let id = "welcome"
    if (tmp) {
      id = tmp
    }
    this.router.navigate([{ outlets: { article: id } }], {relativeTo: this.activatedRoute});
  }
}

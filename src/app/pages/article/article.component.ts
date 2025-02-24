import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Article } from '../../core/mock-model/article';

@Component({
  selector: 'app-article',
  imports: [RouterLink],
  providers: [Router],
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
    article: Article | undefined;

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(({ article }) => {
            this.loadDocument(article);
        });
    }

    loadDocument(article: any): void {
        this.article = article;
    }
}

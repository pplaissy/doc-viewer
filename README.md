# DocViewer

This source can be used as a starter kit to build a documentation application.

I'm in the process of coding a user help application and I realize that by purging the aspects specific to my environment there remain some general principles that could serve as a starting point for anyone with a similar need.

That's the purpose of this little repo.

## UX

It's a single page divided vertically into two parts.

```html
<div ...>
    <p-splitter 
        ...
        <ng-template pTemplate>
            <div ...>
                <router-outlet name="contents"/>
            </div>
        </ng-template>
        <ng-template pTemplate>
            <div ..>
                <div ...>
                    <router-outlet name="article"/>
                </div>
            </div>
        </ng-template>
    </p-splitter>
</div>
```

A side panel on the right with the tree-structured table of contents.

The main panel on the left, designed to display the article selected in the table of contents.

Table of contents data is loaded when the application is started or when the page is refreshed.

Article content is updated when the url is modified, either by :

- selecting a table of contents entry
- direct entry in the address bar
- clicking in an article on a link to another article

The selected entry in the table of contents is modified by :

- clicking on a tree node
- redirection from the current article to another article by clicking on a link

## Patterns

I would like to draw your attention to two particular patterns used here:

- **resolvers** to supply data to components
- **auxiliary routes**

### Resolvers

A resolver is a service referenced by a route. It can, for example, query an api to retrieve the data required by the component loaded by the route.

```typescript
// app.routes.ts resolver binding
// loading TableOfContentsComponent execute ContentResolver
{            
    path: '', 
    outlet: "contents",
    loadComponent: () => import('./pages/table-of-contents/table-of-contents.component').then(c => c.TableOfContentsComponent),
    resolve: {
        docData: ContentResolver
    }
}
```

The resolver for the table of contents queries the api and returns an array of Content, which is the data model for the documentation entries.

```typescript
@Injectable({ providedIn: 'root' })
export class ContentResolver implements Resolve<Contents[]> {
  constructor(private api: DocApi) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contents[]> {
    return this.api.getContents$();
  }
}
```

The data supplied by the resolver is retrieved from the component's ngOnInit.

```typescript
ngOnInit(): void {
    // docData is provided by ContentResolver declared in app.route
    this.activatedRoute.data.subscribe(({ docData }) => {
        ...
    });
 }
```

I use two resolvers, one for the table of contents, one for the content of the selected article.

See [here](https://angular.dev/api/router/Resolve) for full documentation.

### Auxiliary routes

Hard to find reliable documentation on the subject. No results on the angular api documentation for a search on “auxiliary”. You have to tinker a bit to find the right syntax for the `[routerLink ]`😓

```html
<a [routerLink]="['/content', { outlets: {article: article.link} }]">See also</a>
```

In the address bar, the url has an unusual shape: `/content/(article:welcome)`

Navigation is divided between **three router-outlets**. The main one, which is the AppComponent template, and the two outlets named in the [DocComponent](#ux).

## To conclude

Of course, it's all very succinct. The mock is far from producing the experience of a real documentation. You need to be able to structure the content and display images. 

Personally, I write articles in markdown and use the lib [ngx-markdown](https://www.npmjs.com/package/ngx-markdown) to render them in html. I haven't reproduced this part of the code in this template to keep it simple and avoid multiplying the points of attention. I may write an article on this topic in the near future, with a particular focus on the subtleties of managing internal links and downloading images on the fly.

Feel free to test it out and let me know if it has been been a good starting point for your own project.

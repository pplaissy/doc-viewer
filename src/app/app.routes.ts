import { Routes } from '@angular/router';
import { ContentResolver } from './core/routing/content-resolver';
import { ArticleResolver } from './core/routing/article-resolver';

export const routes: Routes = [
    { 
        path: 'content', 
        loadComponent: () => import('./pages/doc/doc.component').then(c => c.DocComponent),
        children: [
            {            
                path: '', 
                outlet: "contents",
                loadComponent: () => import('./pages/table-of-contents/table-of-contents.component').then(c => c.TableOfContentsComponent),
                resolve: {
                    docData: ContentResolver
                }
            },        
            {            
                path: '', 
                outlet: "article",
                loadComponent: () => import('./pages/article/article.component').then(c => c.ArticleComponent),
            } ,        
            {            
                path: ':id', 
                outlet: "article",
                loadComponent: () => import('./pages/article/article.component').then(c => c.ArticleComponent),
                resolve: {
                    article: ArticleResolver
                }
            }        
        ],
        canActivate: [() => true] // to be replaced by your guard if needed, or your can remove this line
    },
    {path: '', redirectTo: 'content', pathMatch: 'full'},
    { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent)}
];

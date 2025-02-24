import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DocApi } from "../services/api/doc-api-service";
import { Article } from "../mock-model/article";

@Injectable({ providedIn: 'root' })
export class ArticleResolver implements Resolve<Article> {
  constructor(private api: DocApi) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {
    const articleId = route.params["id"];
    const result = this.api.getDocument$(articleId);
    return result;
  }
}
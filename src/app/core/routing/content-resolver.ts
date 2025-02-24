import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Contents } from "../mock-model/contents";
import { DocApi } from "../services/api/doc-api-service";

@Injectable({ providedIn: 'root' })
export class ContentResolver implements Resolve<Contents[]> {
  constructor(private api: DocApi) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contents[]> {
    return this.api.getContents$();
  }
}
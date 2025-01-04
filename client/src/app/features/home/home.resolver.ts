import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { QueryEndpointsService } from "../../api/query-endpoints.service";

export const homeResolver: ResolveFn<any> = (route, state): Observable<any> => {
  const router = inject(Router);
  const queryService = inject(QueryEndpointsService);

  return queryService.queryAllQueries().pipe(
    catchError((err: any, caught: any) => throwError(() => {
      console.error(err, caught);
      router.navigate(['/error']);
    })
    ));
}
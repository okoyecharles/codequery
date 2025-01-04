import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { QueryEndpointsService } from "../../api/query-endpoints.service";

export const queryResolver: ResolveFn<any> = (route, state): Observable<any> => {
  const router = inject(Router);
  const queryService = inject(QueryEndpointsService);

  const { id } = route.params;

  return queryService.querySingleQuery(id).pipe(
    catchError((err: any, caught: any) => throwError(() => {
      console.error(err, caught);
      router.navigate(['/error']);
    })
    ));
}
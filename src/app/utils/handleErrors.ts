import * as Sentry from '@sentry/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export const handleError = (err: HttpErrorResponse) => {
  Sentry.captureException(err);
  return throwError(err.error.message);
};

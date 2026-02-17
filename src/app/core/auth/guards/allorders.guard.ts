import { CanActivateFn } from '@angular/router';

export const allordersGuard: CanActivateFn = () => {
  // Always allow access to allorders page (payment success page)
  return true;
};

import { MatPaginatorIntl } from '@angular/material/paginator';
export function getCustomPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();
  
    paginatorIntl.itemsPerPageLabel = 'Rows per page:';
  
    return paginatorIntl;
  }
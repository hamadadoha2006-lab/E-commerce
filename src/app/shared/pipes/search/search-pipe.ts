import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../../core/interface/products/product.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(productList: Product[], word: string, categoryWord: string = ''): Product[] {
    const nameTerm = word?.toLowerCase() || '';
    const categoryTerm = categoryWord?.toLowerCase() || '';

    return productList.filter((item) => {
      const matchesName = !nameTerm || item.title.toLowerCase().includes(nameTerm);
      const categoryName = item.category?.name?.toLowerCase() || '';
      const matchesCategory = !categoryTerm || categoryName.includes(categoryTerm);
      return matchesName && matchesCategory;
    });
  }

}

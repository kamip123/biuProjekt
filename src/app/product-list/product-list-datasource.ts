import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface ProductListItem {
  name: string;
  cena: number;
  description: string;
  image: string;
  type: string;
}


const EXAMPLE_DATA: ProductListItem[] = [
  {cena: 1, name: 'Hydrogen', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG1.jpg', type: 'bed'},
  {cena: 2, name: 'Helium', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG3.jpg', type: 'chair'},
  {cena: 3, name: 'Lithium', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG3.jpg', type: 'pc'},
  {cena: 4, name: 'Beryllium', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG4.jpg', type: 'pc'},
  {cena: 5, name: 'Boron', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG5.jpg', type: 'pc'},
  {cena: 6, name: 'Carbon', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG5.jpg', type: 'bed'},
  {cena: 7, name: 'Nitrogen', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG2.jpg', type: 'pc'},
  {cena: 8, name: 'Oxygen', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG3.jpg', type: 'pc'},
  {cena: 9, name: 'Fluorine', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG4.jpg', type: 'pc'},
  {cena: 10, name: 'Neon', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG5.jpg', type: 'chair'},
  {cena: 11, name: 'Sodium', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG2.jpg', type: 'pc'},
  {cena: 12, name: 'Magnesium', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG2.jpg', type: 'pc'},
  {cena: 13, name: 'Aluminum', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG3.jpg', type: 'tv'},
  {cena: 14, name: 'Silicon', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG4.jpg', type: 'tv'},
  {cena: 15, name: 'Phosphorus', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG5.jpg', type: 'tv'},
  {cena: 16, name: 'Sulfur', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG4.jpg', type: 'tv'},
  {cena: 17, name: 'Chlorine', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG2.jpg', type: 'tv'},
  {cena: 18, name: 'Argon', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG3.jpg', type: 'tv'},
  {cena: 19, name: 'Potassium', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG4.jpg', type: 'tv'},
  {cena: 20, name: 'Calcium', description: 'It is very nice, it is shining during the night and teste very good. 10/10 ign', image: 'itemIMG5.jpg', type: 'tv'},
];

export class ProductListDataSource extends DataSource<ProductListItem> {
  data: ProductListItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort, private productType: String) {
    super();
  }

  connect(): Observable<ProductListItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
      this.productType
    ];

    if(this.productType !== "all"){
      this.data = this.data.filter(item => item.type == this.productType);
    }
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: ProductListItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: ProductListItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'cena': return compare(+a.cena, +b.cena, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

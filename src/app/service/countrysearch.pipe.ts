import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countrysearch'
})
export class CountrysearchPipe implements PipeTransform {

  transform(value: any, searchTerm: any): any {
    return value.filter(function(search:any){
      return search.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    })
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit?: number): string {
    limit = limit ? limit : 300;
    let trail = '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}

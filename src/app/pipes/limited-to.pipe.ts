import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myLimitedTo'
})
export class TruncatePipe implements PipeTransform {

    transform(value: string, args: string): string {
        let result = value;
        if (value !== undefined && value !== null) {
            const limit = args ? parseInt(args, 10) : 10;
            const trail = '...';
            result =  value.length > limit ? value.substring(0, limit) + trail : value;
        }
        return result;
    }
}

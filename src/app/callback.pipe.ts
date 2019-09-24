//Extracted from https://stackoverflow.com/a/43310428 on 2019-09-24

import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'callback',
    pure: false
})
export class CallbackPipe implements PipeTransform {
    transform(items: any[], callback: (item: any, filterVal: any) => boolean, filterVal: any): any {
        if (!items || !callback || !filterVal) {
            return items;
        }
        return items.filter(item => callback(item,filterVal));
    }
}
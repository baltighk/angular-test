import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'nameFormatter'
})

@Injectable({ providedIn: 'root' })


export class NameFormatterPipe implements PipeTransform {
  transform(
      value: { title?: string; firstName: string; middleName?: string; lastName: string },
      locale: 'hu' | 'en' = 'hu'
  ): string {

    if (
        !value.firstName || value.firstName.length < 3 ||
        !value.lastName || value.lastName.length < 3
    ) {
      return 'Nem megfelelő név!';
    }


    if (locale === 'en') {
      return `${value.title || ''} ${value.firstName} ${value.middleName || ''} ${value.lastName}`.trim();
    } else {
      return `${value.title || ''} ${value.lastName} ${value.middleName || ''} ${value.firstName}`.trim();
    }
  }
}

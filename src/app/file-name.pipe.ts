import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

  fileName:string;
  transform(file:string): string{
   this.fileName=file.substring(file.lastIndexOf("/")+1);
   return this.fileName;
  }

}

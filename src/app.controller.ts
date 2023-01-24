import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  // search the artist by name
  @Get('/artist/:name')
  getArtist(@Param() artist): any {
    return this.appService.getArtist(artist.name);
  }

  // save the searching result to a csv file
  @Post('/csv/:name')
  save2CSV(@Param() CSV): void {
    return this.appService.save2CSV(CSV.name);
  }
}

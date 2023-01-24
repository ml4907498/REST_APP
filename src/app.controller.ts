import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/artist/:name')
  getArtist(@Param() artist): any {
    return this.appService.getArtist(artist.name);
  }

  @Post('/csv/:name')
  save2CSV(@Param() CSV): void {
    return this.appService.save2CSV(CSV.name);
  }
}

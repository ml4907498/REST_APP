import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }
  private readonly HEADER: Array<string> = [
    'name',
    'mbid',
    'url',
    'image_small',
    'image',
  ];
  private readonly artists: Array<any> = [];

  async getArtist(artistName: string): Promise<any> {
    const response = await this.httpService
      .get(
        `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=1789ec4a628915bfe236ff29b548f010&format=json`,
      )
      .toPromise()
      .catch((err) => {
        throw new HttpException(err.response.data, err.response.status);
      });

    const artistList = response.data.results.artistmatches.artist;
    this.saveArtists(artistList);
    return this.artists;
  }

  saveArtists(artistList: Array<any>): void {
    artistList.forEach((artist) => {
      this.artists.push([
        artist.name,
        artist.mbid,
        artist.url,
        artist.image[0]['#text'],
        artist.image[1]['#text'],
      ]);
    });
  }

  save2CSV(fileName: string) {
    const val = [this.HEADER]
      .concat(this.artists)
      .map((arr) => arr.join(','))
      .join('\r\n');
    let msg;

    fs.writeFile(`./data/${fileName}.csv`, val, (err) => {
      if (err) {
        console.error(err);
        msg = err.message;
      } else {
        msg = 'The file has been saved!';
        console.log(msg);
        return msg;
      }
    });

    return msg;
  }
}

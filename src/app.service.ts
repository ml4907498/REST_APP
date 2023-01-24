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
  private artistList: Array<any> = [];

  async getArtist(artistName: string): Promise<object[]> {
    let artistList: object[] = await this.getArtstsFromLastFM(artistName);
    if (!artistList.length) {
      const randomArtistName = this.getRandomArtistName();
      artistList = await this.getArtstsFromLastFM(randomArtistName);
    }
    this.saveArtists(artistList);
    return artistList;
  }

  async getArtstsFromLastFM(artistName: string): Promise<object[]> {
    const response = await this.httpService
      .get(
        `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistName}&api_key=1789ec4a628915bfe236ff29b548f010&format=json`,
      )
      .toPromise()
      .catch((err) => {
        throw new HttpException(err.response.data, err.response.status);
      });

    const artistList = response.data.results.artistmatches.artist;
    return artistList;
  }

  getRandomArtistName(): string {
    const data = fs.readFileSync('data/artists.json');
    const artists = JSON.parse(data.toString()).artists;
    const artist = artists[Math.floor(Math.random() * artists.length)];
    console.log(`get a random artist: ${artist}`);
    return artist;
  }

  saveArtists(artistList: Array<any>): string[] {
    const artists = [];
    artistList.forEach((artist) => {
      artists.push([
        artist.name,
        artist.mbid,
        artist.url,
        artist.image[0]['#text'],
        artist.image[1]['#text'],
      ]);
    });
    this.artistList = artists;
    return artists;
  }

  save2CSV(fileName: string): void {
    const val = [this.HEADER]
      .concat(this.artistList)
      .map((arr) => arr.join(','))
      .join('\r\n');

    fs.writeFile(`./data/${fileName}.csv`, val, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('The file has been saved!');
      }
    });
  }
}

import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import * as fs from 'fs';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('getArtist', () => {
    it('should get a artist list by name based on LastFM API', async () => {
      const name = 'Cher';
      const data = await appService.getArtist(name);
      await expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            mbid: expect.any(String),
            url: expect.any(String),
            image: expect.any(Array),
            listeners: expect.any(String),
            streamable: expect.any(String),
          }),
        ]),
      );
    });

    it('should match the name of searching', async () => {
      const name = 'Cher';
      const data = await appService.getArtist(name);
      await expect(data[0]).toEqual({
        name,
        mbid: expect.any(String),
        url: expect.any(String),
        image: expect.any(Array),
        listeners: expect.any(String),
        streamable: expect.any(String),
      });
    });
  });

  describe('getRandomArtistName', () => {
    it('shoud get a random artist from the artists.json', () => {
      const data = fs.readFileSync('data/artists.json');
      const artists = JSON.parse(data.toString()).artists;
      const artist = appService.getRandomArtistName();
      expect(artists).toContain(artist);
    });
  });

  describe('saveArtists', () => {
    it('shoud save the Artists data into a array', () => {
      const artists = [
        {
          name: 'Cher',
          listeners: '1454471',
          mbid: 'mbid',
          url: 'url',
          streamable: '0',
          image: [
            {
              '#text': 'https://xx.png',
              size: 'small',
            },
            {
              '#text': 'https://xx.png',
              size: 'medium',
            },
          ],
        },
      ];
      const data = appService.saveArtists(artists);
      expect(data).toEqual(
        expect.arrayContaining([
          expect.arrayContaining([
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
          ]),
        ]),
      );
    });
  });
});

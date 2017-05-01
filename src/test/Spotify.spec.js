import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';


import Spotify from '../lib/spotify';
import beatlesData from './fixtures/beatles';
import beatlesTracks from './fixtures/beatlesTracks';

describe('Spotify', () => {
  describe('API', () => {

    describe('search', () => {
      let wrapper, beatles;

      beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            resolve({
              'ok': true, 
              'status': 200, 
              json: function() {
                return beatlesData
              }
            });
          });
        });
        beatles = beatlesData.artists.items[0];       
      });

      it('getSearchUrl(query) gets API url for searching', () => {
        const getSearchUrl = Spotify.getSearchUrl
        expect(getSearchUrl).to.be.defined;
        expect(getSearchUrl('The Beatles')).to.equal('https://api.spotify.com/v1/search?q=The%20Beatles&type=artist&limit=1');
      });

      it('getTracksUrl(artistId) get API url for top tracks of an artist', () => {
        const getTracksUrl = Spotify.getTracksUrl
        expect(getTracksUrl).to.be.defined;
        expect(getTracksUrl(beatles.id)).to.equal(`https://api.spotify.com/v1/artists/${beatles.id}/top-tracks?country=US&`);
      });

      it('search(query) makes a request to the spotify API to get artist data', async () => {
        const response = await Spotify.search('The Beatles');
        expect(response.artists.items[0]).to.equal(beatles);
      });
      
      
    });
    
    describe('API', () => {
      let wrapper, beatles;
      
      beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            resolve({
              'ok': true, 
              'status': 200, 
              json: function() {
                return beatlesTracks;
              }
            });
          });
        });
        beatles = beatlesData.artists.items[0];        
      });
    
      it('getSongs(artistId) makes a request to the spotify API to get artist data', async () => {
        const response = await Spotify.getTracks(beatles.id);
        expect(response.tracks[0].name).to.equal("Here Comes The Sun - Remastered");
      });
      
    });
    
    
    
    
    
  });
});
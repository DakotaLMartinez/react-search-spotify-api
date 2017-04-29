const beatlesData = {
  artists: {
    href: 'https://api.spotify.com/v1/search?query=The+Beatles&type=artist&offset=0&limit=1', 
    items: [
      {
        id: "3WrFJ7ztbogyGnTHbHJFl2",
        followers: {
          href: null, 
          total: 3170961
        },
        genres: [
          'british invasion',
          'classic rock',
          'merseybeat',
          'protopunk',
          'psychedelic rock',
          'rock'
        ],
        images: [
          {
            height: 1000,
            url: 'https://i.scdn.co/image/934c57df9fbdbbaa5e93b55994a4cb9571fd2085',
            width: 1000
          },
          {
            height: 640,
            url: 'https://i.scdn.co/image/5f70d98d3e4616a02a3afe2aa9a840b9157b92a1',
            width: 640
          },
          {
            height: 200,
            url: 'https://i.scdn.co/image/7fe1a693adc52e274962f1c61d76ca9ccc62c191',
            width: 200
          },
          {
            height: 64,
            url: 'https://i.scdn.co/image/857b1ce5b1b372b873b0a8bdb3ff8023b6c61d39',
            width: 64
          }
        ], 
        name: 'The Beatles',
        uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2'
      }
    ]
  }
}


export default beatlesData;
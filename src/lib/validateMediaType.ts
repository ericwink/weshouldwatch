import { Movie, TV, Person } from "./interface";
type MediaItem = Movie | TV | Person

function isMovie(item: MediaItem): item is Movie {
    return item.media_type === 'movie';
  }
  
  // Type guard for TV
  function isTV(item: MediaItem): item is TV {
    return item.media_type === 'tv';
  }
  
  // Type guard for Person
  function isPerson(item: MediaItem): item is Person {
    return item.media_type === 'person';
  }

  export {isMovie, isTV, isPerson}
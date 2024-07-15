export const MovieView = ({ movie, onBackClick }) => {

  return (
    <div>
      <img class="moviePoster" src={movie.imagePath} alt="" />
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genreName}</span>
      </div>
      <div>
        <span>Genre description: </span>
        <span>{movie.genreDescription}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.directorName}</span>
      </div>
      <div>
        <span>Biography: </span>
        <span>{movie.directorBio}</span>
      </div>
      <div>
        <span>Birth: </span>
        <span>{movie.directorBirth}</span>
      </div>
      <div>
        <span>Death: </span>
        <span>{movie.directorDeath}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.actors}</span>
      </div>
      <div>
        <span>Realease Year: </span>
        <span>{movie.year}</span>
      </div>
      <div>
        <span>Rating: </span>
        <span>{movie.rating}</span>
      </div>
      <div>
        <span>Movie runtime: </span>
        <span>{movie.length}</span>
      </div>
      <div>
        <span>Age restriction: </span>
        <span>{movie.age}</span>
      </div>
      <button onClick={() => { onBackClick(movie); }}>Go back</button>
    </div>
  );

};
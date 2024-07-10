export const MovieView = ({ movie }) => {

  return (
    <div className="movie-view">
      <img className="movie-poster" src={movie.image} />
      <div className="movie-title">
        <span className="label">Title: </span>
        <span className="value">{movie.title}</span>
      </div>
      <div>
        <span className="label">Description: </span>
        <span className="value">{movie.description}</span>
      </div>
      <div>
        <span className="label">Genre: </span>
        <span className="value">{movie.genre}</span>
      </div>
      <div>
        <span className="label">Director: </span>
        <span className="value">{movie.director}</span>
      </div>
      <div>
        <span className="label">Actors: </span>
        <span className="value">{movie.actors}</span>
      </div>
    </div>
  );

};
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => { onMovieClick(movie); }}>
      {movie.title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      biograpyh: PropTypes.string,
      birth: PropTypes.string,
      death: PropTypes.string
    }),
    imagePath: PropTypes.string,
    actors: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.string,
    age: PropTypes.string,
    rating: PropTypes.string,
    length: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
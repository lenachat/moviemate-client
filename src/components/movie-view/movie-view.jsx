import { Button, Card, Accordion, Container, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";

import "./movie-view.scss";

export const MovieView = ({ movies, user, onFavoriteAdded, onFavoriteRemoved }) => {
  const { movieTitle } = useParams();

  // Find the movie with the matching ID
  const movie = movies.find((m) => m.title === movieTitle);

  // Check if the movie was found
  if (!movie) {
    return <div>Movie not found</div>;
  }

  const { isFavorite, handleToggleFavorite } = useFavorites(movie, user, onFavoriteAdded, onFavoriteRemoved);

  return (
    <Card bg="primary" text="text-primary">
      <Card.Img variant="top" className="card-img" src={movie.imagePath} alt="movie poster" />
      <Card.Body>
        <Card.Title>
          <Container class="movie-header-details">
            <Row>
              <Col md="auto" className="movie-title">{movie.title}</Col>
              <Col md="auto" className="movie-details">{movie.year}</Col>
              <Col md="auto" className="movie-details">{movie.length}</Col>
              <Col md="auto" className="movie-details"><img src='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16" style="color: white"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>' alt="" />{movie.rating} </Col>
              <Col md="auto" className="movie-details"><p className="age-restriction">{movie.age}</p></Col>
            </Row>
          </Container>
        </Card.Title>
        <Card.Text>
          <p>{movie.description}</p>
          <p> <strong>Actors: </strong>{movie.actors} </p>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header> <p> <strong>Genre: </strong> {movie.genreName} </p></Accordion.Header>
              <Accordion.Body>
                <p> {movie.genreDescription} </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header> <p> <strong>Director: </strong> {movie.directorName} </p></Accordion.Header>
              <Accordion.Body>
                {movie.directorBio} <br />
                Birth: {movie.directorBirth} <br />
                Death: {movie.directorDeath}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Text>
        <Link to={`/movies`}>
          <Button variant="outline-secondary" className="go-back-button">Go Back</Button>
        </Link>
        <br />
        <ButtonGroup>
          <ToggleButton className="toggle-favorite"
            id="toggle-favorite"
            type="checkbox"
            variant="outline-secondary"
            checked={isFavorite}
            value="1"
            onClick={handleToggleFavorite}
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </ToggleButton>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};
import { Button, Card, Accordion, Container, Row, Col } from "react-bootstrap";

import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card bg="primary" text="text-primary">
      <Card.Img variant="top" className="card-img" src={movie.imagePath} alt="movie poster" />
      <Card.Body>
        <Card.Title>
          <Container>
            <Row>
              <Col md="auto" className="movie-title">{movie.title}</Col>
              <Col md="auto" className="movie-details">{movie.year}</Col>
              <Col md="auto" className="movie-details">{movie.length}</Col>
              <Col md="auto" className="movie-details">{movie.rating} </Col>
              <Col md="auto" className="movie-details">{movie.age}</Col>
            </Row>
          </Container>
        </Card.Title>
        <Card.Text>
          {movie.description} <br />
          Actors: {movie.actors} <br />
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Genre: {movie.genreName}</Accordion.Header>
              <Accordion.Body>
                {movie.genreDescription}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Director: {movie.directorName}</Accordion.Header>
              <Accordion.Body>
                {movie.directorBio} <br />
                Birth: {movie.directorBirth} <br />
                Death: {movie.directorDeath}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Text>
        <Button variant="outline-secondary" onClick={onBackClick}>Go Back</Button>{' '}
      </Card.Body>
    </Card>
  );
};
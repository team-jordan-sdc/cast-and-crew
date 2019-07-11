import React from 'react';
import { Container, MovieInfo, RoundedText, Text, RatingContainer, MovieTitle, FullStars} from '../styling.jsx';

const Movie = ({ movie }) => (
  <Container>
    <MovieInfo>
      <MovieTitle>{movie.title}</MovieTitle>
      <Container>
        <Text>{movie.release_date}</Text>
        <RoundedText>{movie.rating}</RoundedText>
        <RoundedText>{movie.runtime}</RoundedText>
      </Container>
      <RatingContainer margin={true}>
        <RatingContainer margin={false} hover={true}>
          <img src="https://mapquiz.app/fec/infoplate/Star_empty.svg"></img>
          <FullStars width={Number(movie.vudu_rating)}>
            <img src="https://mapquiz.app/fec/infoplate/Star_full.svg"></img>
          </FullStars>
        </RatingContainer>
        <img src={`${movie.rt_rating > 50 ? 'https://mapquiz.app/fec/infoplate/Tomato_certified_fresh.svg' : 'https://mapquiz.app/fec/infoplate/Tomato_rotten.svg'}`} style={{ display: 'flex', transform: 'scale(.8)' }}></img>
        <Container>{movie.rt_rating}%</Container>
      </RatingContainer>
      <Text>{`Rent/Buy from ${movie.price}`}</Text>
    </MovieInfo>
    <img src={movie.thumbnail_url}></img>
  </Container>
)

export default Movie;

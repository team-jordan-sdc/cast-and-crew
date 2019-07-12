import styled from 'styled-components';
import {keyframes} from 'styled-components';

const fadein = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const Main = styled.div`
  background-color: #041c2c;
`;
const Container = styled.div`
`;

const Title = styled.span`
  display: flex;
  font-size: 19px;
  font-weight: 300;
  color: white;
  font-family: sans-serif;
  margin: 10px 0 10px 0;
`;

const NavBackward = styled.div`
  background-image: url(https://mapquiz.app/fec/infoplate/pov_left_arrow.svg);
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 100;
  height: 255px;
  width: 35px;
  background-color: rgba(0, 0, 0, 0.582);
  display: none;
`;

const NavForward = styled.div`
  background-image: url(https://mapquiz.app/fec/infoplate/pov_right_arrow.svg);
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 42px;
  right: 8px;
  z-index: 99;
  height: 260px;
  width: 35px;
  background-color: rgba(0, 0, 0, 0.582);
  display: none;
`;

const CarouselContainer = styled.div`
  overflow-x: hidden;
  white-space: nowrap;
  margin-bottom: 20px;

  &:hover ${NavBackward} {
    transition: 2s ease-in-out;
    display: block;
  }

  &:hover ${NavForward} {
    transition: 2s ease-in-out;
    display: block;
  }
`;

const Carousel = styled.div`
  width: fit-content;
  height: 260px;
  transition: transform .5s ease;
  white-space: nowrap;
  animation: ${fadein} .5s;
  transform: translate3d(${position => position.position}px, 0px, 0px);
`;

const MovieInfo = styled.div`
  width: 132px;
  word-wrap: break-word;
  height: 198px;
  color: white;
  font-family: sans-serif;
  font-weight: 400;
  font-size: 12px;
  position: absolute;
  padding: 5px 5px 0;
  background: rgba(0, 0, 0, .8);
  opacity: 0;
  transition: opacity .25s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

const Text = styled.span`
  font-size: 12px;
  margin-right: 2px;
  font-weight: 500;
  display: inline-block;
`;

const RoundedText = styled.span`
  height: 14px;
  line-height: 15px;
  font-size: 11px;
  padding: 0 3px;
  border-radius: 80px;
  background-color: #b0bec5;
  color: #000;
  white-space: nowrap;
  display: inline-block;
  font-weight: 800;
`;

const RatingContainer = styled.div`
  margin: ${prop => prop ? '8px 0 8px 0' : 0};
  align-items: center;
  height: 14px;
  display: flex;
  ${hover => hover.hover ? '&:hover { opacity: .7 }' : '' }
`

const MovieTitle = styled.span`
display: block;
  white-space: normal;
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: 400;
`;

const FullStars = styled.div`
  display: flex;
  overflow: hidden;
  position: absolute;
  z-index: 1;
  width: ${width => width.width * 17.75}px;
`

const PersonInfo = styled.span`
  color: rgb(182, 182, 182);
  position: relative;
  display: block;
  left: 0;
  right: -1px;
  bottom: -10px;
  font-weight: 100;
  font-size: ${props => props.name ? 14 : 12}px;
  font-family: sans-serif;
  font-style: ${props => props.role ? 'italic' : 'none'};
  width: 60px;
`;

const Headshot = styled.span`
  &:hover {
    opacity: .7;
    transition: .25s ease-in-out;
  }
`;

const Plate = styled.div`
  display: inline-block;
  margin-right: 20px;
`;

Carousel.displayName = 'Carousel';
Plate.displayName = 'Plate';
Headshot.displayName = 'Headshot';
RatingContainer.displayName = 'RatingContainer';
RoundedText.displayName = 'RoundedText';

export {
  fadein, Main, Container, CarouselContainer, Carousel,
  Title, NavBackward, NavForward, Text, RoundedText, MovieInfo,
  MovieTitle, FullStars, PersonInfo, Headshot, Plate, RatingContainer
};

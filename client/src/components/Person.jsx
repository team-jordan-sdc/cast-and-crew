import React from 'react';
import {PersonInfo, Container, Headshot} from '../styling.jsx';


// info is the personnel object
const Person = ({info, set}) => (
  <Container>
    <Headshot onClick={() => set(info._id)}><img src={info._id.thumbnail_url}></img></Headshot>
    <PersonInfo name={'true'}>{info._id.name}</PersonInfo>
    <PersonInfo role={'true'}>{info.role}</PersonInfo>
  </Container>
)

export default Person;

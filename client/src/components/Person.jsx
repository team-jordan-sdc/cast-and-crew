import React from 'react';
import {PersonInfo, Container, Headshot} from '../styling.jsx';


// info is the personnel object
// NOTE: removed the _id layer (which was actually an object)
const Person = ({ info, set }) => (
  <Container>
    <Headshot onClick={() => set(info)}><img src={info.thumbnail_url}></img></Headshot>
    <PersonInfo name={'true'}>{info.name}</PersonInfo>
    <PersonInfo role={'true'}>{info.role}</PersonInfo>
  </Container>
)

export default Person;

import React from 'react';

const Person = ({info}) => (
  <div className="container">
    <div className="headshot"><img src={info.thumbnail_url}></img></div>
    <div className="name">{info.name}</div>
  </div>
)

export default Person;
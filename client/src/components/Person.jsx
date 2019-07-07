import React from 'react';

const Person = ({info}) => (
  <div className="container">
    <div className="headshot"><img src={info._id.thumbnail_url}></img></div>
    <div className="name">{info._id.name}</div>
    <div className="role">{info.role}</div>
  </div>
)

export default Person;
import React from 'react';

const Person = ({info, set}) => (
  <div className="container">
    <div className="headshot" onClick={() => set(info._id._id)}><img src={info._id.thumbnail_url}></img></div>
    <div className="name">{info._id.name}</div>
    <div className="role">{info.role}</div>
  </div>
)

export default Person;
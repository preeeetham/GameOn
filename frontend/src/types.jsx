import React from "react";

const GameComponent = ({ game }) => {
  const { id, name, background_image, rating, released, description_raw, platforms } = game;

  return (
    <div key={id}>
      <h2>{name}</h2>
      <img src={background_image} alt={name} />
      <p>Rating: {rating}</p>
      <p>Released: {released}</p>
      <p>{description_raw}</p>
      <ul>
        {platforms.map((platformObj, index) => (
          <li key={index}>{platformObj.platform.slug}</li>
        ))}
      </ul>
    </div>
  );
};

const PlatformComponent = ({ platform }) => {
  const { id, name } = platform;

  return (
    <div key={id}>
      <h3>{name}</h3>
    </div>
  );
};

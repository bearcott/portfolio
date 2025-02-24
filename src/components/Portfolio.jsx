import React from "react";
import works from "../works";

const Demo = ({ title, desc, url, images, onClick }) => (
  <div className="demo" onClick={() => onClick(undefined)}>
    <div
      className="content"
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <i className="exit" onClick={() => onClick(undefined)} />
      <h1>{title}</h1>
      <p>
        {desc}
        <br />
        {url && (
          <a href={url} target="_blank">
            <i className="ion-share" /> view it out in the open
          </a>
        )}
      </p>
      {images.map((img, i) => (
        <div key={i} className="img">
          <img src={img.src} />
          <span>{img.desc}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ({ containerRef, snapped, isPast, onClick, selectedPiece }) => {
  return (
    <div id="portfolio" className="portfolio" ref={containerRef}>
      <div
        className={`left ${(snapped || isPast) && "snap"} ${selectedPiece >=
          0 && "faded"} ${isPast && "passed"}`}
      >
        <h1>portfolio</h1>
      </div>
      <div className={`right ${selectedPiece >= 0 && "faded"}`}>
        <div className="spacer" />

        {works.map((work, i) => (
          <div className="piece" key={i} onClick={() => onClick(i)}>
            <div className="bg">
              <video
                src={work.video}
                onMouseEnter={e => e.target.play()}
                onMouseLeave={e => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
            </div>
          </div>
        ))}
        <div className="clear" />
      </div>
      {selectedPiece >= 0 &&
        works[selectedPiece] && (
          <Demo onClick={onClick} {...works[selectedPiece]} />
        )}
      <div className="clear" />
    </div>
  );
};

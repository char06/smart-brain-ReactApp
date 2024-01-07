import React from "react";
import "./FaceRecognition.css"; // Import a CSS file for styling if needed

const FaceRecognition = ({imageUrl, box }) => {
  return (
    <div className="center">
      <div className="absolute mt2">
        <img id="input_image" src={imageUrl} alt="" width="500px" height="auto" />
        {box && (
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;

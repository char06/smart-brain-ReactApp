import React from "react";

const ImageLinkForm = ({ onInputChange, onSubmit  }) => { 
    return (
    <div className="form-container">
      <p className="Description">
        {"Smart Brain the innovative face detection app utilizes cutting-edge artificial intelligence to seamlessly identify and highlight faces within pictures. Give it a try!"}
      </p>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onInputChange} />
        <button type="submit">Detect</button>
      </form>
    </div>
    );
}

export default ImageLinkForm;
import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/Form/Form';
import Rank from './components/Rank/Rank';
import './App.css';
import ParticlesBackground from './components/ParticlesBackground';
import FaceRecognition from './components/FaceRecognition/Face';

function App() {
  const [formInput, setFormInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState(null);

  const onInputChange = (event) => {
    setFormInput(event.target.value);
  }

  // Function to calculate face location based on Clarifai API response
  const calculateFaceLocation = (data) => {
    if (
      data &&
      data.outputs &&
      data.outputs.length > 0 &&
      data.outputs[0].data &&
      data.outputs[0].data.regions &&
      data.outputs[0].data.regions.length > 0
    ) {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById("input_image");
      const width = Number(image.width);
      const height = Number(image.height);

      return {
        topRow: clarifaiFace.top_row * height,
        leftCol: clarifaiFace.left_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
        rightCol: width - clarifaiFace.right_col * width
      };
    } else {
      console.log("No face regions found in the API response");
      return null;
    }
  };

  // Function to display face bounding box
  const displayFaceBox = (box) => {
    console.log(box);
    setBox(box);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const submittedUrl = formInput;  // Store the submitted URL
    setFormInput("");  // Clear the input field
    setImageUrl(submittedUrl);  // Set the imageUrl state
    console.log('imageUrl:', submittedUrl);

    // Replace 'YOUR_CLARIFAI_API_KEY' with your actual Clarifai API key
    const PAT = '1bde58abc0194b158c9a5690b49733ab';
    const USER_ID = 'char06';
    const APP_ID = 'smart-brain';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": submittedUrl 
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    // Make API call to Clarifai
    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // Extract face regions from API response
        console.log('Clarifai API response:', result); 
        const regions = result.outputs[0].data.regions;
        // Calculate and display face bounding box
        const faceBox = calculateFaceLocation({ outputs: [{ data: { regions } }] });
        displayFaceBox(faceBox);
      })
      .catch(error => console.log('error', error));
      
  };

  // React components 
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      <ParticlesBackground className="particles" />
      {/* Conditionally render FaceRecognition based on imageUrl */}
      {imageUrl && <FaceRecognition imageUrl={imageUrl} box={box} />}
    </div>
  );
}

export default App;

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/Form/Form';
import Rank from './components/Rank/Rank'
import './App.css';
import ParticlesBackground from './components/ParticlesBackground'
import { useState } from 'react';
import FaceRecognition from './components/FaceRecognition/Face';

function App() {

//Created State to detect the texrt from the input box
  const [formInput, setformInput] = useState(""); 
  const [imageUrl, setimageUrl] = useState("");
  
  const onInputChange = (event) => {
    setformInput(event.target.value);
  
  }

  const onSubmit = (event) => {
    event.preventDefault(); 
    setimageUrl(formInput);

//This is the clarify Model 

//////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////

// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '1bde58abc0194b158c9a5690b49733ab';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'char06';
const APP_ID = 'smart-brain';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
const IMAGE_URL = imageUrl;


// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE

const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                    // "base64": IMAGE_BYTES_STRING
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

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => {

        const regions = result.outputs[0].data.regions;
  
        regions.forEach(region => {
            // Accessing and rounding the bounding box values
            const boundingBox = region.region_info.bounding_box;
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);

            region.data.concepts.forEach(concept => {
                // Accessing and rounding the concept value
                const name = concept.name;
                const value = concept.value.toFixed(4);

                console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                
            });
        });

    })
    .catch(error => console.log('error', error));

  };
//END CLARIFY MODEL 
//REACT COMPONENTS 
  return (
    <div className="App"> 
      <Navigation />
      <Logo />
      <Rank /> 
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit}/> 
      <ParticlesBackground className="particles"/>   
      <FaceRecognition imageUrl={imageUrl}/>
    </div>
  );
}

export default App;

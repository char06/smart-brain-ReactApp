import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/Form/Form';
import Rank from './components/Rank/Rank'
import './App.css';
import ParticlesBackground from './components/ParticlesBackground'
import { useState } from 'react';


function App() {

//Created State to detect the texrt from the input box
  const [formInput, setformInput] = useState(""); 
  
  const onInputChange = (event) => {
    console.log(event.target.value);
    setformInput(event.target.value);
  
  }

  const onSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Perform any actions you need with the formInput data
    console.log('Form submitted with input:', formInput);
  };

  return (
    <div className="App"> 
      <Navigation />
      <Logo />
      <Rank /> 
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit}/> 
      <ParticlesBackground className="particles"/>   
      
      {/* <FaceRecognition />  */}
    </div>
  );
}

export default App;

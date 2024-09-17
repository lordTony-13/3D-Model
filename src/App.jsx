import React, { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Navbar } from "./components/Navbar";
import TextDisplay from './components/TextDisplay'; // Import the new component

function App() {
  const [animation, setAnimation] = useState("Standing");

  return (
    <>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience animation={animation} />
      </Canvas>
      <Navbar setAnimation={setAnimation} />
      <TextDisplay setAnimation={setAnimation} />
    </>
  );
}

export default App;

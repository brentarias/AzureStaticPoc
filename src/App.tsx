import './App.css'
import { Button, Loader, MantineProvider, Text, Card } from '@mantine/core';
import { OuterShell } from './OuterShell';
import Home from './home';
import About from './about';
import Landing from './landing';
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={{
        fontFamily: "fantasy",
        colorScheme: "dark"
      }}>
        <div className="App">

          <Routes>
            <Route path="/" element={<OuterShell />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route path="/login" element={<Landing />} />
          </Routes>

        </div>
      </MantineProvider></>
  )
}

export default App

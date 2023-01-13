import reactLogo from './assets/react.svg'
import { Button, Loader, MantineProvider, Text } from '@mantine/core';
import { useState } from 'react'

function Home() {
    const [count, setCount] = useState(0)

    console.log('HOME');
    return (
        <>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <Button onClick={() => setCount((count) => count + 1)}>Betterish button!!</Button>
        <Text>Simply texty stuff</Text>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more.
        </p>
        </>
    )
}

export default Home
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const element = useRoutes(routes);
  // const [count, setCount] = useState(0)

  return element;
}

export default App;

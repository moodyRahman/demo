import './App.css';
import 'fontsource-roboto';
import {Box, Container} from '@material-ui/core';
import {TokenContext} from "./TokenContext"
import {useState} from 'react'
import LoginPage from "./LoginPage.js"


function App() {
  const [token, setToken] = useState("mood");

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <TokenContext.Provider value={{ token, setToken }}>
          <LoginPage />
        </TokenContext.Provider>
      </Box>
    </Container>
  );
}

export default App;

import './App.css';
import 'fontsource-roboto';
import {Button, Box, Container} from '@material-ui/core';
import LoginPage from "./LoginPage.js"

function App() {
  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <LoginPage />

      </Box>
    </Container>
  );
}

export default App;

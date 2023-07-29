// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components
import Header from './components/Header';
import Home from './components/Home';

// Styles
import { GlobalStyle } from './GlobalStyles'; 
import Movie from './components/Movie';
import NotFound from './components/NotFound';

const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:movieId' element={<Movie />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
    <GlobalStyle />
  </Router>
);

export default App;
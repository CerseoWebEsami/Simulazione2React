import { Route, Routes } from 'react-router';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import { ShowDetailsModalProvider } from './context/ShowDetailsModalContext.jsx';
import DaVedere from './pages/DaVedere.jsx';
import Favorites from './pages/Favorites.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Visti from './pages/Visti.jsx';

/**
 * Componente principale dell'applicazione: monta header/footer e le rotte
 * delle pagine, condividendo la modale dei dettagli serie tramite Context.
 * @returns {React.JSX.Element} - Componente App.
 */
function App() {
  return (
    <ShowDetailsModalProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ricerca" element={<Search />} />
        <Route path="/visti" element={<Visti />} />
        <Route path="/da-vedere" element={<DaVedere />} />
        <Route path="/preferiti" element={<Favorites />} />
      </Routes>

      <Footer />
    </ShowDetailsModalProvider>
  );
}

export default App;

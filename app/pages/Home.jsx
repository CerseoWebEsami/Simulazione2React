import { Link } from 'react-router';

/**
 * Pagina Home con hero e guida rapida all'uso dell'app.
 * @returns {React.JSX.Element}
 */
function Home() {
  return (
    <main className="main-content">
      <section className="home-hero page-section">
        <h2>Benvenuto su TVmaze Tracker</h2>
        <p>
          App web in React per cercare serie TV su TVmaze e organizzare la tua libreria personale. Usa
          Ricerca per trovare una serie e poi salvala in Visti, Da vedere o Preferiti.
        </p>
        <div className="quick-links">
          <Link className="btn btn-primary" to="/ricerca">
            Vai a Ricerca
          </Link>
          <Link className="btn btn-secondary" to="/da-vedere">
            Apri Da vedere
          </Link>
        </div>
      </section>

      <section className="home-guide page-section">
        <h3>Come funziona</h3>
        <div className="guide-grid">
          <article className="guide-card">
            <h4>1. Cerca una serie</h4>
            <p>Digita il titolo e usa i suggerimenti rapidi per trovare subito lo show giusto.</p>
          </article>
          <article className="guide-card">
            <h4>2. Esplora i dettagli</h4>
            <p>Apri scheda completa con cast, episodi, rating e informazioni principali.</p>
          </article>
          <article className="guide-card">
            <h4>3. Organizza la libreria</h4>
            <p>Aggiungi la serie in Visti, Da vedere e Preferiti con pulsanti rapidi.</p>
          </article>
          <article className="guide-card">
            <h4>4. Riapri quando vuoi</h4>
            <p>Ogni voce salvata puo essere riaperta in modale con i dettagli aggiornati.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Home;

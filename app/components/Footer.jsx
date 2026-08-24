/**
 * Footer standard dell'app.
 * @returns {React.JSX.Element} - Componente Footer.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          TVmaze Tracker | Dati da{' '}
          <a href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer">
            TVmaze API
          </a>
        </p>
        <p>Ricerca serie TV, gestisci visti, da vedere e preferiti.</p>
      </div>
    </footer>
  );
}

export default Footer;

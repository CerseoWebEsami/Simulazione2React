/**
 * Pannello dettagliato (episodi, cast, runtime, stato) per una serie.
 * Si aspetta che `show._embedded` possa contenere `episodes` e `cast`.
 * @param {Object} props
 * @param {Object} props.show - Oggetto show dall'API, preferibilmente con _embedded
 * @param {boolean} [props.compact] - Variante compatta
 * @param {string} [props.title="Dettagli Serie"] - Titolo della sezione
 * @returns {React.JSX.Element}
 */
function ShowDetails({ show, compact = false, title = 'Dettagli Serie' }) {
  const episodes = show._embedded?.episodes || [];
  const cast = show._embedded?.cast || [];

  const items = [
    `Episodi: ${episodes.length || 'N/D'}`,
    `Cast: ${cast.length || 'N/D'}`,
    `Runtime: ${show.runtime || 'N/D'} min`,
    `Stato: ${show.status || 'N/D'}`,
  ];

  return (
    <div className={`series-details${compact ? ' compact' : ''}`}>
      <h3>{title}</h3>
      <div className="info-grid">
        {items.map((text) => (
          <div className="info-item" key={text}>
            <div className="info-value">{text}</div>
          </div>
        ))}

        {cast.slice(0, 3).map((entry, index) => (
          <div className="info-item" key={`cast-${index}`}>
            <div className="info-label">Cast</div>
            <div className="info-value">{entry.person?.name || 'N/D'}</div>
            <div className="info-meta">{entry.character?.name || 'N/D'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowDetails;

import { useEffect, useRef, useState } from 'react';

/**
 * Autocomplete per la ricerca di serie: si lega a una query e mostra i suggerimenti.
 * @param {Object} props
 * @param {string} props.query - Testo corrente dell'input di ricerca
 * @param {function(string): Promise<Array>} props.fetchSuggestions - Funzione che riceve il testo e restituisce una Promise con la lista di risultati
 * @param {function(Object): void} props.onSelect - Callback chiamata alla selezione di un elemento (riceve {id,name,year})
 * @returns {React.JSX.Element|null}
 */
function ShowSuggestions({ query, fetchSuggestions, onSelect }) {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);

    const text = query.trim();

    if (text.length < 2) {
      setItems(null);
      setError(false);
      setLoading(false);
      return undefined;
    }

    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await fetchSuggestions(text);
        setItems(results);
        setError(false);
      } catch (err) {
        setError(true);
        console.error('Errore suggerimenti:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timerRef.current);
  }, [query, fetchSuggestions]);

  if (!loading && !error && items === null) {
    return null;
  }

  return (
    <div className="suggestions">
      {loading && <div style={{ padding: '10px' }}>Ricerca...</div>}

      {!loading && error && <div className="suggestion-error">Errore nella ricerca</div>}

      {!loading && !error && items && items.length === 0 && (
        <div style={{ padding: '10px' }}>Nessuna serie trovata</div>
      )}

      {!loading &&
        !error &&
        items &&
        items.slice(0, 7).map((item) => (
          <div key={item.id} className="suggestion-item" onClick={() => onSelect(item)}>
            {item.name} ({item.year || 'N/D'})
          </div>
        ))}
    </div>
  );
}

export default ShowSuggestions;

import { useEffect, useState } from 'react';
import { getShowById } from '../scripts/api.js';
import ShowCard from './ShowCard.jsx';
import ShowDetails from './ShowDetails.jsx';

/**
 * Modale condivisa per i dettagli di una serie: dato un record minimale
 * (id, name, status, premiered) carica i dati completi tramite `getShowById`.
 * @param {Object} props
 * @param {Object|null} props.entry - Record minimale da mostrare, o null se chiusa
 * @param {function} props.onClose - Callback per chiudere la modale
 * @returns {React.JSX.Element|null}
 */
function ShowDetailsModal({ entry, onClose }) {
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!entry) {
      return undefined;
    }

    let cancelled = false;
    setShow(null);
    setError(null);

    getShowById(entry.id)
      .then((data) => {
        if (!cancelled) {
          setShow(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [entry]);

  useEffect(() => {
    if (!entry) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [entry, onClose]);

  if (!entry) {
    return null;
  }

  const subtitle = `${entry.status || 'N/D'} | ${entry.premiered || 'N/D'}`;

  return (
    <div
      className="series-modal-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="series-modal" role="dialog" aria-modal="true" aria-labelledby="series-modal-title">
        <div className="series-modal-header">
          <div>
            <p className="series-modal-kicker">Dettagli serie</p>
            <h2 id="series-modal-title">{entry.name}</h2>
            <p className="series-modal-subtitle">{subtitle}</p>
          </div>
          <button type="button" className="series-modal-close" aria-label="Chiudi modale" onClick={onClose}>
            x
          </button>
        </div>
        <div className="series-modal-body">
          <div className="series-modal-summary">
            {error ? (
              <div className="error">
                <strong>Errore caricamento dettagli</strong>
                <p>{error}</p>
              </div>
            ) : null}
            {!error && !show ? <div className="loading">Caricamento dettagli...</div> : null}
            {!error && show ? <ShowCard show={show} titleOverride={show.name} compact /> : null}
          </div>
          <div className="series-modal-details">
            {!error && show ? <ShowDetails show={show} compact /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowDetailsModal;

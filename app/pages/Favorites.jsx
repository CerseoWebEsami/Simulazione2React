import { useState } from 'react';
import RecordsTable from '../components/RecordsTable.jsx';
import { useShowDetailsModal } from '../context/ShowDetailsModalContext.jsx';
import { clearFavorites, getFavorites, removeFavorite } from '../scripts/storage.js';

/**
 * Pagina Preferiti: elenco delle serie salvate come preferite.
 * @returns {React.JSX.Element}
 */
function Favorites() {
  const [, forceRefresh] = useState(0);
  const refresh = () => forceRefresh((n) => n + 1);
  const { openModal, closeModal } = useShowDetailsModal();

  const favorites = getFavorites();

  return (
    <main className="main-content">
      <section className="page-section">
        <div className="search-form">
          <h2>Preferiti</h2>
          <p className="section-description">Apri una riga per vedere i dettagli completi.</p>
        </div>
      </section>

      <section className="page-section">
        <div className="result-container">
          <RecordsTable
            records={favorites}
            emptyMessage="Nessun preferito. Vai su Ricerca per aggiungerne uno."
            columns={[
              { header: 'Serie', render: (show) => show.name },
              { header: 'Generi', render: (show) => (show.genres || []).join(', ') || 'N/D' },
              { header: 'Rating', render: (show) => show.rating ?? 'N/D' },
            ]}
            onRowClick={(entry) => openModal(entry)}
            onDelete={(entry) => {
              removeFavorite(entry.id);
              closeModal();
              refresh();
            }}
            onDeleteAll={() => {
              clearFavorites();
              closeModal();
              refresh();
            }}
            clearAllLabel="Cancella preferiti"
            deleteLabel="Rimuovi"
          />
        </div>
      </section>
    </main>
  );
}

export default Favorites;

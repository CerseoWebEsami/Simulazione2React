import { useState } from 'react';
import RecordsTable from '../components/RecordsTable.jsx';
import { useShowDetailsModal } from '../context/ShowDetailsModalContext.jsx';
import { clearWatched, getWatched, removeWatched } from '../scripts/storage.js';

/**
 * Pagina Visti: elenco delle serie segnate come viste.
 * @returns {React.JSX.Element}
 */
function Visti() {
  const [, forceRefresh] = useState(0);
  const refresh = () => forceRefresh((n) => n + 1);
  const { openModal, closeModal } = useShowDetailsModal();

  const watched = getWatched();

  return (
    <main className="main-content">
      <section className="page-section">
        <div className="search-form">
          <h2>Visti</h2>
          <p className="section-description">Serie che hai gia completato o che stai seguendo.</p>
        </div>
      </section>

      <section className="page-section">
        <div className="result-container">
          <RecordsTable
            records={watched}
            emptyMessage="Nessuna serie nei visti. Segna una serie dalla pagina Ricerca."
            columns={[
              { header: 'Serie', render: (show) => show.name },
              { header: 'Stato', render: (show) => show.status || 'N/D' },
              { header: 'Aggiunta', render: (show) => new Date(show.timestamp).toLocaleString('it-IT') },
            ]}
            onRowClick={(entry) => openModal(entry)}
            onDelete={(entry) => {
              removeWatched(entry.id);
              closeModal();
              refresh();
            }}
            onDeleteAll={() => {
              clearWatched();
              closeModal();
              refresh();
            }}
            clearAllLabel="Cancella visti"
            deleteLabel="Rimuovi"
          />
        </div>
      </section>
    </main>
  );
}

export default Visti;

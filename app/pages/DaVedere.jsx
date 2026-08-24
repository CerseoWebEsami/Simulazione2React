import { useState } from 'react';
import RecordsTable from '../components/RecordsTable.jsx';
import { useShowDetailsModal } from '../context/ShowDetailsModalContext.jsx';
import { clearToWatch, getToWatch, removeToWatch } from '../scripts/storage.js';

/**
 * Pagina Da vedere: la watchlist personale.
 * @returns {React.JSX.Element}
 */
function DaVedere() {
  const [, forceRefresh] = useState(0);
  const refresh = () => forceRefresh((n) => n + 1);
  const { openModal, closeModal } = useShowDetailsModal();

  const toWatch = getToWatch();

  return (
    <main className="main-content">
      <section className="page-section">
        <div className="search-form">
          <h2>Da vedere</h2>
          <p className="section-description">La tua watchlist personale.</p>
        </div>
      </section>

      <section className="page-section">
        <div className="result-container">
          <RecordsTable
            records={toWatch}
            emptyMessage="Nessuna serie nella lista Da vedere."
            columns={[
              { header: 'Serie', render: (show) => show.name },
              { header: 'Generi', render: (show) => (show.genres || []).join(', ') || 'N/D' },
              { header: 'Prima uscita', render: (show) => show.premiered || 'N/D' },
            ]}
            onRowClick={(entry) => openModal(entry)}
            onDelete={(entry) => {
              removeToWatch(entry.id);
              closeModal();
              refresh();
            }}
            onDeleteAll={() => {
              clearToWatch();
              closeModal();
              refresh();
            }}
            clearAllLabel="Cancella lista"
            deleteLabel="Rimuovi"
          />
        </div>
      </section>
    </main>
  );
}

export default DaVedere;

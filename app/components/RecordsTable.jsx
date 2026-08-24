/**
 * Tabella riusabile per elenchi (visti, preferiti, da vedere).
 * @param {Object} props
 * @param {Array} props.records - Array di record da mostrare
 * @param {Array<{header:string,render:function}>} props.columns - Definizione colonne (header + render(record))
 * @param {string} props.emptyMessage - Messaggio da mostrare se non ci sono record
 * @param {function(Object)} [props.onRowClick] - Callback al click sulla riga
 * @param {function(Object)} [props.onDelete] - Callback per rimuovere un elemento
 * @param {function} [props.onDeleteAll] - Callback per cancellare tutti gli elementi
 * @param {string} [props.clearAllLabel]
 * @param {string} [props.deleteLabel]
 * @returns {React.JSX.Element}
 */
function RecordsTable({
  records,
  columns,
  emptyMessage,
  onRowClick,
  onDelete,
  onDeleteAll,
  clearAllLabel = 'Cancella tutto',
  deleteLabel = 'Rimuovi',
}) {
  if (!records || records.length === 0) {
    return (
      <section style={{ padding: '20px', textAlign: 'center' }}>
        <p>{emptyMessage}</p>
      </section>
    );
  }

  function handleClearAll() {
    if (window.confirm('Sei sicuro?')) {
      onDeleteAll();
    }
  }

  return (
    <section className="records-panel">
      <div
        className="records-header"
        style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px 20px' }}
      >
        {onDeleteAll ? (
          <button type="button" className="btn btn-secondary btn-danger" onClick={handleClearAll}>
            {clearAllLabel}
          </button>
        ) : null}
      </div>
      <div className="records-table-wrapper">
        <table className="records-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.header}>{col.header}</th>
              ))}
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.id ?? record.timestamp}
                className="records-row"
                tabIndex={0}
                onClick={() => onRowClick && onRowClick(record)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onRowClick && onRowClick(record);
                  }
                }}
              >
                {columns.map((col) => (
                  <td key={col.header}>{String(col.render(record))}</td>
                ))}
                <td className="records-actions">
                  <button
                    type="button"
                    className="btn btn-danger btn-delete"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete && onDelete(record);
                    }}
                  >
                    {deleteLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecordsTable;

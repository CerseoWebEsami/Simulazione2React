import { createContext, useContext, useState } from 'react';
import ShowDetailsModal from '../components/ShowDetailsModal.jsx';
import { addToHistory } from '../scripts/storage.js';

const ShowDetailsModalContext = createContext(null);

/**
 * Fornisce la modale condivisa dei dettagli serie a tutte le pagine,
 * equivalente React del singleton `getShowDetailsModal()` della versione vanilla.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {React.JSX.Element}
 */
export function ShowDetailsModalProvider({ children }) {
  const [entry, setEntry] = useState(null);

  function openModal(record) {
    addToHistory(record);
    setEntry(record);
  }

  function closeModal() {
    setEntry(null);
  }

  return (
    <ShowDetailsModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ShowDetailsModal entry={entry} onClose={closeModal} />
    </ShowDetailsModalContext.Provider>
  );
}

/**
 * Hook per aprire/chiudere la modale condivisa dei dettagli serie.
 * @returns {{openModal:function(Object):void, closeModal:function():void}}
 */
export function useShowDetailsModal() {
  const context = useContext(ShowDetailsModalContext);

  if (!context) {
    throw new Error('useShowDetailsModal deve essere usato dentro <ShowDetailsModalProvider>');
  }

  return context;
}

/**
 * Pulsanti rapidi azione (preferiti, visto, da vedere) per la card di una serie.
 * @param {Object} props
 * @param {boolean} props.isFavorite
 * @param {boolean} props.isWatched
 * @param {boolean} props.isToWatch
 * @param {function} props.onAddFavorite
 * @param {function} props.onAddWatched
 * @param {function} props.onToggleToWatch
 * @returns {React.JSX.Element}
 */
function ActionButtons({ isFavorite, isWatched, isToWatch, onAddFavorite, onAddWatched, onToggleToWatch }) {
  return (
    <>
      <button
        type="button"
        className="btn btn-inline-action btn-favorite-inline"
        title={isFavorite ? 'Gia nei preferiti' : 'Aggiungi ai preferiti'}
        disabled={isFavorite}
        onClick={onAddFavorite}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      <button
        type="button"
        className="btn btn-inline-action btn-secondary btn-watched-inline"
        title={isWatched ? 'Gia nei visti' : 'Segna come visto'}
        disabled={isWatched}
        onClick={onAddWatched}
      >
        ✓
      </button>

      <button
        type="button"
        className="btn btn-inline-action btn-secondary btn-towatch-inline"
        title={isToWatch ? 'Rimuovi da Da vedere' : 'Aggiungi a Da vedere'}
        onClick={onToggleToWatch}
      >
        {isToWatch ? '−' : '+'}
      </button>
    </>
  );
}

export default ActionButtons;

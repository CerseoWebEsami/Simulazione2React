import { NavLink } from 'react-router';

const PAGES = [
  { name: 'Home', path: '/', end: true },
  { name: 'Ricerca', path: '/ricerca' },
  { name: 'Visti', path: '/visti' },
  { name: 'Da vedere', path: '/da-vedere' },
  { name: 'Preferiti', path: '/preferiti' },
];

/**
 * Header dell'app con la navigazione principale.
 * @returns {React.JSX.Element} - Componente Header.
 */
function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">
          <NavLink to="/">TVmaze Tracker</NavLink>
        </h1>
        <nav className="header-nav">
          <ul>
            {PAGES.map((page) => (
              <li key={page.path}>
                <NavLink
                  to={page.path}
                  end={page.end}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  {page.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

import { Outlet, useLocation } from 'react-router-dom';
import BackgroundMesh from './BackgroundMesh.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import SkipLink from './SkipLink.jsx';

/**
 * Shared chrome for every route: skip link, backdrop, nav, the focusable
 * <main> landmark, and the footer. Keying <main> on the pathname restarts the
 * cross-fade on each navigation.
 */
export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <BackgroundMesh />
      <ScrollToTop />
      <Navbar />

      <main id="main" key={pathname} tabIndex={-1} className="page-transition flex-1 focus:outline-none">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

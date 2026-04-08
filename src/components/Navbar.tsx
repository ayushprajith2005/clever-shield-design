import { Shield, Moon, Sun, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/features" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "History", path: "/history" },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const location = useLocation();
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-card shadow-lg" : "bg-transparent"}`}>
      <div className="container-width flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="rounded-xl hero-gradient p-2">
            <Shield size={20} className="text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">ScamShield <span className="text-gradient">AI</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="rounded-lg p-2.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            to="/dashboard"
            className="hidden md:inline-flex rounded-lg hero-gradient px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Scan Now
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden rounded-lg p-2.5 text-muted-foreground hover:text-foreground">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden glass-card border-t border-border/40 p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === link.path ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/dashboard" className="block rounded-lg hero-gradient px-4 py-3 text-sm font-semibold text-primary-foreground text-center mt-2">
            Scan Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Sparkles, Menu, X, LogOut, FileText, User, ChevronRight } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect - Disabled to keep navbar consistent
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 20);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const handleLogout = () => {
    logout();
    navigate("/auth");
    setOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard", icon: FileText, authRequired: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-sm py-3"
        : "bg-transparent border-b border-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            <div className={`relative p-2 rounded-xl border transition-colors ${scrolled
              ? "bg-white/5 border-white/10"
              : "bg-white/10 border-white/10 backdrop-blur-md"
              }`}>
              <Sparkles className="text-white" size={20} />
            </div>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            ResumeMint
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              (!link.authRequired || user) && (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${location.pathname === link.path
                    ? "text-blue-400"
                    : "text-slate-300 hover:text-white"
                    }`}
                >
                  {link.icon && <link.icon size={16} />}
                  {link.name}
                </Link>
              )
            ))}

            {/* Admin Panel Link - Only for admins */}
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors duration-200 flex items-center gap-2 px-3 py-1.5 rounded-lg border ${location.pathname.startsWith('/admin')
                  ? "bg-purple-500 text-white border-purple-500"
                  : "text-purple-300 border-purple-400/30 hover:bg-purple-500/10"
                  }`}
              >
                <Sparkles size={16} />
                Admin Panel
              </Link>
            )}
          </div>

          <div className="h-6 w-px bg-white/10" />

          {user ? (
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border transition-colors ${scrolled
                ? "bg-white/5 border-white/10"
                : "bg-white/5 border-white/10"
                }`}>
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <User size={16} />
                  </div>
                )}
                <span className="text-sm font-medium pr-2 text-white">
                  {user.name?.split(" ")[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full transition-all duration-200 text-slate-400 hover:text-red-400 hover:bg-white/10"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="group relative px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium text-sm overflow-hidden shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                Get Started <ChevronRight size={16} />
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-xl transition-colors text-white hover:bg-white/10"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 md:hidden flex flex-col"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-lg text-slate-900">Menu</span>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-2">
                  {navLinks.map((link) => (
                    (!link.authRequired || user) && (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === link.path
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-slate-600 hover:bg-slate-50"
                          }`}
                      >
                        {link.icon && <link.icon size={18} />}
                        {link.name}
                      </Link>
                    )
                  ))}

                  {/* Admin Panel Link - Only for admins */}
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${location.pathname.startsWith('/admin')
                        ? "bg-purple-50 text-purple-600 border-purple-200 font-medium"
                        : "text-purple-600 border-purple-200 hover:bg-purple-50"
                        }`}
                    >
                      <Sparkles size={18} />
                      Admin Panel
                    </Link>
                  )}
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 px-2">
                        {user.picture ? (
                          <img
                            src={user.picture}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border border-white shadow-sm"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <User size={20} />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500 truncate max-w-[150px]">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={18} /> Sign Out
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl font-medium shadow-lg shadow-slate-900/20"
                    >
                      Get Started <ChevronRight size={18} />
                    </Link>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

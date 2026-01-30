import { Link, useLocation } from "react-router-dom";
import { Sparkles, Github, Twitter, Mail, Heart, ArrowRight, Save, HelpCircle, Keyboard } from "lucide-react";
import ChatSupport from "../pages/ChatSupport";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const isBuilder = location.pathname.startsWith('/builder');

  if (isBuilder) {
    return (
      <footer className="h-10 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-6 text-xs text-slate-500 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Save size={12} />
            Autosaved
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">ResumeMint Builder v1.0</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
            <Keyboard size={12} />
            <span className="hidden sm:inline">Shortcuts</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
            <HelpCircle size={12} />
            <span className="hidden sm:inline">Help</span>
          </button>
        </div>
      </footer>
    );
  }

  const footerLinks = {
    product: [
      { name: "Features", href: "/features" },
      { name: "Templates", href: "/templates" },
      { name: "Examples", href: "/examples" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  return (
    <footer className="relative bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-white">ResumeMint</span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Craft professional, ATS-optimized resumes in minutes with our AI-powered builder. Stand out from the crowd and land your dream job.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Mail, href: "mailto:codenaxa@gmail.com", label: "Email" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all duration-200 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-white mb-6">Product</h3>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm hover:text-blue-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm hover:text-blue-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Column */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="font-semibold text-white mb-2">Ready to get started?</h3>
              <p className="text-sm text-slate-400 mb-4">
                Create your professional resume today and boost your career opportunities.
              </p>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors w-full justify-center group"
              >
                Create Free Resume
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} ResumeMint AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            <span>by ResumeMint Team</span>
          </div>
        </div>
      </div>

      <ChatSupport />
    </footer>
  );
};

export default Footer;
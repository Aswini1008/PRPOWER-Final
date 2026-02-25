import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const SECTION_IDS = ["home", "about", "services", "clients", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];
const NAV_SCROLL_OFFSET = 96;

const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Clients", href: "/#clients" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const location = useLocation();
  const navigate = useNavigate();

  /* Scroll shadow effect */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Prevent background scroll on mobile */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  /* Active section on scroll */
  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const updateActiveSection = () => {
      const position = window.scrollY + NAV_SCROLL_OFFSET;
      let current: SectionId = "home";

      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= position) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    const timer = window.setTimeout(updateActiveSection, 400);
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [location.pathname]);

  /* Keep active section in sync with URL hash */
  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) {
      return;
    }

    const section = location.hash.replace("#", "");
    if ((SECTION_IDS as readonly string[]).includes(section)) {
      setActiveSection(section as SectionId);
    }
  }, [location.pathname, location.hash]);

  /* Scroll to section helper */
  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY - 80);
    window.scrollTo({ top, behavior: "smooth" });
  };

  /* Navigation handler */
  const handleNavigation = (href: string) => {
    setIsMobileOpen(false);

    if (href.startsWith("/#")) {
      const section = href.replace("/#", "") as SectionId;
      setActiveSection(section);

      if (location.pathname !== "/") {
        navigate(`/#${section}`);
        window.setTimeout(() => scrollToSection(section), 140);
        return;
      }

      navigate(`/#${section}`);
      window.setTimeout(() => scrollToSection(section), 0);
      return;
    }

    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Logo click -> always back to hero/home */
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    handleNavigation("/#home");
  };

  /* Active Link Detection */
  const isActive = (href: string) => {
    if (href === "/projects") {
      return location.pathname === "/projects";
    }

    if (href.startsWith("/#")) {
      const section = href.replace("/#", "");
      return location.pathname === "/" && activeSection === section;
    }

    return false;
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-white backdrop-blur-md transition-all duration-300",
          isScrolled
            ? "h-[70px] shadow-[0_8px_24px_rgba(15,23,42,0.08)] border-b border-[#edf1f5]"
            : "h-[86px]"
        )}
      >
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} aria-label="PR Power Home">
            <img
              src={logo}
              alt="PR Power"
              className={cn(
                "transition-all duration-300",
                isScrolled ? "h-8" : "h-10"
              )}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-14">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "group relative text-[15px] font-medium transition-colors duration-300",
                  isActive(item.href)
                    ? "text-[#F26B1D]"
                    : "text-[#233248] hover:text-[#F26B1D]"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute left-0 top-full h-[2px] w-full origin-left transition-transform duration-300",
                    isActive(item.href)
                      ? "scale-x-100 bg-[#F26B1D]"
                      : "scale-x-0 bg-[#F26B1D] group-hover:scale-x-100"
                  )}
                />
              </button>
            ))}
          </nav>

          {/* Get Quote Button */}
          <button
            onClick={() => handleNavigation("/#contact")}
            className="hidden lg:inline-flex rounded-md bg-[#F26B1D] px-6 py-2.5 text-[15px] font-medium text-white shadow-[0_6px_16px_rgba(242,107,29,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d85c17]"
          >
            Get a Quote
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden h-11 w-11 flex items-center justify-center rounded-md border border-[#dce3ea]"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black/10 backdrop-blur-sm lg:hidden">
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-[380px] bg-white shadow-xl p-6 flex flex-col space-y-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "text-left text-[1.1rem] font-medium transition-colors",
                  isActive(item.href)
                    ? "text-[#F26B1D]"
                    : "text-[#1f2f45] hover:text-[#F26B1D]"
                )}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => handleNavigation("/#contact")}
              className="mt-6 w-full rounded-md bg-[#F26B1D] py-3 text-white"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

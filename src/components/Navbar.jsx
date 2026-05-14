import { useState } from "react";

const GitHubIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7"
        aria-hidden="true"
    >
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

const MenuIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const CloseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const NAV_LINKS = [
    { label: "Explore", href: "#" },
    { label: "Trending", href: "#" },
    { label: "About", href: "#" },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

    return (
        <nav className="sticky top-0 z-50 bg-[#161b22] border-b border-[#30363d] shadow-lg">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">

                        <span className="text-white">
                            <GitHubIcon />
                        </span>
                        <span className="text-white text-lg font-semibold tracking-wide select-none">
                            GitHub Profile Explorer
                        </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-[#cdd9e5] hover:text-white hover:bg-[#30363d]
                           px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
                            >
                                {link.label}
                            </a>
                        ))}

                        <button
                            type="button"
                            className="ml-3 bg-[#238636] hover:bg-[#2ea043] text-white
                         text-sm font-medium px-4 py-1.5 rounded-md
                         transition-colors duration-150 focus:outline-none
                         focus:ring-2 focus:ring-[#2ea043] focus:ring-offset-2
                         focus:ring-offset-[#161b22]"
                        >
                            Sign In
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={toggleMobileMenu}
                        aria-expanded={mobileMenuOpen}
                        aria-label="Toggle navigation menu"
                        className="sm:hidden text-[#cdd9e5] hover:text-white hover:bg-[#30363d]
                       p-2 rounded-md transition-colors duration-150
                       focus:outline-none focus:ring-2 focus:ring-[#2ea043]"
                    >
                        {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>

                </div>
            </div>

            {mobileMenuOpen && (
                <div className="sm:hidden bg-[#161b22] border-t border-[#30363d] px-4 pb-4 pt-2 space-y-1">

                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-[#cdd9e5] hover:text-white hover:bg-[#30363d]
                         px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
                        >
                            {link.label}
                        </a>
                    ))}

                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full mt-2 bg-[#238636] hover:bg-[#2ea043] text-white
                       text-sm font-medium px-4 py-2 rounded-md
                       transition-colors duration-150"
                    >
                        Sign In
                    </button>

                </div>
            )}

        </nav>
    );
};

export default Navbar;
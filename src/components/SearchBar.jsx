import { useState } from "react";

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth={2} stroke="currentColor" className="w-4 h-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
    </svg>
);

const SearchBar = ({ onSearch }) => {
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = username.trim();
        if (!trimmed) return;
        onSearch(trimmed);
    };

    return (
        <div className="relative w-full flex flex-col items-center px-4 py-12 sm:py-16 overflow-hidden">

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden="true">
                <div className="w-[600px] h-[300px] rounded-full
                        bg-[#388bfd]/5 blur-3xl" />
            </div>

            <h2 className="relative z-10 text-white text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
                Explore GitHub Profiles
            </h2>
            <p className="relative z-10 text-[#8b949e] text-sm sm:text-base mb-8 max-w-sm text-center leading-relaxed">
                Enter a GitHub username to explore their public profile and repositories.
            </p>

            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-xl flex items-center gap-2.5"
                aria-label="GitHub username search"
            >
                <div className="relative flex-1 group">

                    <span className="absolute inset-y-0 left-3.5 flex items-center
                           text-[#8b949e] group-focus-within:text-[#388bfd]
                           pointer-events-none transition-colors duration-200">
                        <SearchIcon />
                    </span>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g. torvalds"
                        aria-label="GitHub username"
                        autoComplete="off"
                        spellCheck={false}
                        className="
              w-full pl-10 pr-4 py-3
              bg-[#0d1117] text-[#cdd9e5] placeholder-[#6e7681]
              border border-[#30363d] rounded-xl
              text-sm leading-none
              transition-all duration-200
              hover:border-[#8b949e]
              focus:outline-none focus:border-[#388bfd]
              focus:ring-2 focus:ring-[#388bfd]/20
              focus:shadow-lg focus:shadow-[#388bfd]/10
            "
                    />
                </div>

                <button
                    type="submit"
                    disabled={!username.trim()}
                    className="
            flex items-center gap-2
            bg-[#238636] hover:bg-[#2ea043] active:scale-95
            text-white text-sm font-semibold
            px-5 py-3 rounded-xl
            shadow-md shadow-black/30 hover:shadow-lg hover:shadow-[#2ea043]/20
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#2ea043]/60
            focus:ring-offset-2 focus:ring-offset-[#0d1117]
            whitespace-nowrap
            disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
          "
                >
                    <SearchIcon />
                    Search
                </button>
            </form>

            <p className="relative z-10 mt-4 text-[#6e7681] text-xs">
                Press{" "}
                <kbd className="inline-flex items-center px-1.5 py-0.5 mx-0.5
                        bg-[#21262d] border border-[#30363d] rounded text-[11px]
                        font-mono text-[#8b949e] shadow-sm">
                    Enter
                </kbd>
                {" "}or click Search
            </p>

        </div>
    );
};

export default SearchBar;
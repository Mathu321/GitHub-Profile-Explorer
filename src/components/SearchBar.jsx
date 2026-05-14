import { useState } from "react";

const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
        />
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
        <div className="w-full flex flex-col items-center px-4 py-10 sm:py-14">

            <h2 className="text-[#cdd9e5] text-xl sm:text-2xl font-semibold mb-2 tracking-wide">
                Search a GitHub Profile
            </h2>
            <p className="text-[#8b949e] text-sm mb-6">
                Enter a GitHub username to explore their public profile.
            </p>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl flex items-center gap-2"
                aria-label="GitHub username search"
            >
                <div className="relative flex-1">

                    <span className="absolute inset-y-0 left-3 flex items-center text-[#8b949e] pointer-events-none">
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
              w-full pl-9 pr-4 py-2.5
              bg-[#0d1117] text-[#cdd9e5] placeholder-[#8b949e]
              border border-[#30363d] rounded-lg
              text-sm
              transition-colors duration-150
              focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd]
              hover:border-[#8b949e]
            "
                    />
                </div>

                <button
                    type="submit"
                    className="
            flex items-center gap-2
            bg-[#238636] hover:bg-[#2ea043] active:bg-[#238636]
            text-white text-sm font-medium
            px-4 py-2.5 rounded-lg
            transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-[#2ea043]
            focus:ring-offset-2 focus:ring-offset-[#0d1117]
            whitespace-nowrap
          "

                    disabled={!username.trim()}

                    style={{ opacity: username.trim() ? 1 : 0.5, cursor: username.trim() ? "pointer" : "not-allowed" }}
                >
                    <SearchIcon />
                    Search
                </button>
            </form>

            <p className="mt-3 text-[#6e7681] text-xs">
                Press <kbd className="px-1.5 py-0.5 bg-[#30363d] text-[#8b949e] rounded text-xs font-mono">Enter</kbd> or click Search
            </p>

        </div>
    );
};

export default SearchBar;
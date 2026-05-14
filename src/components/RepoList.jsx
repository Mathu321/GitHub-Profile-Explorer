import { useState, useMemo } from "react";
import RepoCard from "./RepoCard";

const LANGUAGE_COLORS = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#178600",
    Ruby: "#701516",
    Go: "#00ADD8",
    Rust: "#dea584",
    PHP: "#4F5D95",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Shell: "#89e051",
    Vue: "#41b883",
    Dart: "#00B4AB",
};

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth={2} stroke="currentColor" className="w-4 h-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
    </svg>
);

const ClearIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const RepoList = ({ repos = [] }) => {
    const [query, setQuery] = useState("");
    const [activeLang, setActiveLang] = useState("");

    const languages = useMemo(() => {
        const langs = repos.map((r) => r.language).filter(Boolean);
        return [...new Set(langs)].sort();
    }, [repos]);

    const filteredRepos = useMemo(() => {
        const lowerQuery = query.toLowerCase().trim();
        return repos.filter((repo) => {
            const matchesQuery = !lowerQuery || repo.name.toLowerCase().includes(lowerQuery);
            const matchesLang = !activeLang || repo.language === activeLang;
            return matchesQuery && matchesLang;
        });
    }, [repos, query, activeLang]);

    if (repos.length === 0) {
        return (
            <p className="text-center text-[#8b949e] text-sm py-10">
                This user has no public repositories.
            </p>
        );
    }

    return (
        <section aria-label="Repositories">
            <div className="flex items-center justify-between mb-5">
                <h2 className="flex items-center gap-2.5 text-lg font-bold
                       bg-gradient-to-r from-white to-[#8b949e]
                       bg-clip-text text-transparent">
                    Repositories
                    <span className="bg-[#21262d] border border-[#30363d] text-[#8b949e]
                           text-xs font-normal px-2 py-0.5 rounded-full
                           tabular-nums" style={{ color: "#8b949e" }}>
                        {repos.length}
                    </span>
                </h2>

                <span className="text-[#6e7681] text-xs tabular-nums">
                    {filteredRepos.length} of {repos.length} shown
                </span>
            </div>

            <div className="flex flex-col gap-3 mb-6">

                <div className="relative group">
                    <span className="absolute inset-y-0 left-3.5 flex items-center
                           text-[#8b949e] group-focus-within:text-[#388bfd]
                           pointer-events-none transition-colors duration-200">
                        <SearchIcon />
                    </span>

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Filter repositories…"
                        aria-label="Filter repositories by name"
                        className="
              w-full pl-10 pr-9 py-2.5
              bg-[#0d1117] text-[#cdd9e5] placeholder-[#6e7681]
              border border-[#30363d] rounded-xl text-sm
              transition-all duration-200
              hover:border-[#8b949e]
              focus:outline-none focus:border-[#388bfd]
              focus:ring-2 focus:ring-[#388bfd]/20
              focus:shadow-md focus:shadow-[#388bfd]/10
            "
                    />

                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            aria-label="Clear search"
                            className="absolute inset-y-0 right-3 flex items-center
                         text-[#8b949e] hover:text-white
                         transition-colors duration-150"
                        >
                            <ClearIcon />
                        </button>
                    )}
                </div>

                {languages.length > 0 && (
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by language">

                        <button
                            onClick={() => setActiveLang("")}
                            className={`
                flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                border transition-all duration-150
                ${activeLang === ""
                                    ? "bg-[#388bfd] border-[#388bfd] text-white shadow-sm shadow-[#388bfd]/30"
                                    : "bg-transparent border-[#30363d] text-[#8b949e] hover:border-[#8b949e] hover:text-white"
                                }
              `}
                        >
                            All
                        </button>

                        {languages.map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setActiveLang(lang === activeLang ? "" : lang)}
                                aria-pressed={activeLang === lang}
                                className={`
                  flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                  border transition-all duration-150
                  ${activeLang === lang
                                        ? "bg-[#388bfd] border-[#388bfd] text-white shadow-sm shadow-[#388bfd]/30"
                                        : "bg-transparent border-[#30363d] text-[#8b949e] hover:border-[#8b949e] hover:text-white"
                                    }
                `}
                            >
                                <span className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: LANGUAGE_COLORS[lang] ?? "#8b949e" }}
                                    aria-hidden="true" />
                                {lang}
                            </button>
                        ))}

                    </div>
                )}
            </div>

            {filteredRepos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredRepos.map((repo) => (
                        <RepoCard key={repo.id} repo={repo} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#161b22] border border-[#30363d]
                          flex items-center justify-center shadow-md shadow-black/20">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5} stroke="currentColor"
                            className="w-6 h-6 text-[#8b949e]" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                        </svg>
                    </div>

                    <div>
                        <p className="text-[#cdd9e5] text-sm font-medium">No matches found</p>
                        <p className="text-[#8b949e] text-xs mt-0.5">
                            {query && `"${query}"`}
                            {query && activeLang && " in "}
                            {activeLang}
                        </p>
                    </div>

                    <div className="flex gap-2 mt-1">
                        {query && (
                            <button onClick={() => setQuery("")}
                                className="text-[#388bfd] hover:text-[#58a6ff] text-xs
                           hover:underline underline-offset-2 transition-colors duration-150">
                                Clear search
                            </button>
                        )}
                        {activeLang && (
                            <button onClick={() => setActiveLang("")}
                                className="text-[#388bfd] hover:text-[#58a6ff] text-xs
                           hover:underline underline-offset-2 transition-colors duration-150">
                                Show all languages
                            </button>
                        )}
                    </div>
                </div>
            )}

        </section>
    );
};

export default RepoList;
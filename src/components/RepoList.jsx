import { useState, useMemo } from "react";
import RepoCard from "./RepoCard";

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
        const langs = repos
            .map((r) => r.language)
            .filter(Boolean);
        return [...new Set(langs)].sort();

    }, [repos]);

    const filteredRepos = useMemo(() => {
        const lowerQuery = query.toLowerCase().trim();

        return repos.filter((repo) => {
            const matchesQuery =
                !lowerQuery || repo.name.toLowerCase().includes(lowerQuery);

            const matchesLang =
                !activeLang || repo.language === activeLang;

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

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold text-lg">
                    Repositories
                    <span className="ml-2 bg-[#30363d] text-[#8b949e] text-xs font-normal
                           px-2 py-0.5 rounded-full">
                        {repos.length}
                    </span>
                </h2>

                <span className="text-[#8b949e] text-xs">
                    {filteredRepos.length} of {repos.length} shown
                </span>
            </div>
            <div className="flex flex-col gap-3 mb-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-[#8b949e] pointer-events-none">
                        <SearchIcon />
                    </span>

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Filter repositories…"
                        aria-label="Filter repositories by name"
                        className="
              w-full pl-9 pr-9 py-2
              bg-[#0d1117] text-[#cdd9e5] placeholder-[#8b949e]
              border border-[#30363d] rounded-lg text-sm
              focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd]
              hover:border-[#8b949e] transition-colors duration-150
            "
                    />

                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            aria-label="Clear search"
                            className="absolute inset-y-0 right-3 flex items-center text-[#8b949e]
                         hover:text-white transition-colors duration-150"
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
                px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-150
                ${activeLang === ""
                                    ? "bg-[#388bfd] border-[#388bfd] text-white"
                                    : "bg-transparent border-[#30363d] text-[#8b949e] hover:border-[#8b949e] hover:text-white"
                                }
              `}
                        >
                            All
                        </button>
                        {languages.map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setActiveLang(lang)}
                                aria-pressed={activeLang === lang}
                                className={`
                  px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-150
                  ${activeLang === lang
                                        ? "bg-[#388bfd] border-[#388bfd] text-white"
                                        : "bg-transparent border-[#30363d] text-[#8b949e] hover:border-[#8b949e] hover:text-white"
                                    }
                `}
                            >
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="currentColor"
                        className="w-10 h-10 text-[#30363d]" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                    </svg>
                    <p className="text-[#8b949e] text-sm">
                        No repositories match&nbsp;
                        <span className="text-white font-medium">
                            {query && `"${query}"`}
                            {query && activeLang && " in "}
                            {activeLang}
                        </span>
                    </p>
                    <div className="flex gap-2 mt-1">
                        {query && (
                            <button onClick={() => setQuery("")}
                                className="text-[#388bfd] text-xs hover:underline">
                                Clear search
                            </button>
                        )}
                        {activeLang && (
                            <button onClick={() => setActiveLang("")}
                                className="text-[#388bfd] text-xs hover:underline">
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
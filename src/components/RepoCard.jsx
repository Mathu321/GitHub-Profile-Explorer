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

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        className="w-3.5 h-3.5" aria-hidden="true">
        <path fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093
         1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96
         1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006z"
            clipRule="evenodd" />
    </svg>
);

const RepoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
        className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M2 2.5A2.5 2.5 0 1 1 5 4.95v.55a1 1 0 0 0 1 1h4a1 1 0 0 0
             1-1v-.55a2.5 2.5 0 1 1 1 0v.55a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-.55A2.5
             2.5 0 0 1 2 2.5zm8.5 8.05a2.5 2.5 0 1 1 1 0v.45a2.5 2.5 0 0 1-2.5
             2.5h-3A2.5 2.5 0 0 1 3.5 11v-.45a2.5 2.5 0 1 1 1 0v.45c0 .83.67 1.5
             1.5 1.5h3c.83 0 1.5-.67 1.5-1.5v-.45z" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const RepoCard = ({ repo }) => {
    if (!repo) return null;

    const {
        name,
        description,
        html_url,
        language,
        stargazers_count,
        forks_count,
        updated_at,
    } = repo;

    const langColor = LANGUAGE_COLORS[language] ?? "#8b949e";

    const lastUpdated = updated_at
        ? new Date(updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
        : null;

    return (
        <a
            href={html_url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`View ${name} on GitHub`}
            className="
        group relative flex flex-col gap-3
        bg-[#161b22] border border-[#30363d] rounded-xl p-5
        hover:border-[#388bfd] hover:shadow-lg hover:shadow-[#388bfd]/10
        hover:-translate-y-0.5
        transition-all duration-200 ease-out
        cursor-pointer
      "
        >
            <span className="absolute top-4 right-4 text-[#8b949e]
                       opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ExternalLinkIcon />
            </span>

            <div className="flex items-center gap-2 pr-6">
                <span className="text-[#388bfd] shrink-0">
                    <RepoIcon />
                </span>

                <h3 className="text-[#388bfd] group-hover:text-white font-semibold text-sm
                       truncate transition-colors duration-200">
                    {name}
                </h3>
            </div>
            {description ? (
                <p className="text-[#8b949e] text-xs leading-relaxed line-clamp-2 flex-1">
                    {description}
                </p>
            ) : (
                <p className="text-[#6e7681] text-xs italic flex-1">No description provided.</p>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1">
                {language && (
                    <span className="flex items-center gap-1.5 text-[#8b949e] text-xs">
                        <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: langColor }}
                            aria-label={`Language: ${language}`}
                        />
                        {language}
                    </span>
                )}

                <span className="flex items-center gap-1 text-[#8b949e] text-xs">
                    <span className="text-yellow-400">
                        <StarIcon />
                    </span>
                    {stargazers_count?.toLocaleString() ?? 0}
                </span>

                {forks_count > 0 && (
                    <span className="flex items-center gap-1 text-[#8b949e] text-xs">
                        <span aria-hidden="true">⑂</span>
                        {forks_count.toLocaleString()}
                    </span>
                )}
                {lastUpdated && (
                    <span className="ml-auto text-[#6e7681] text-xs">
                        Updated {lastUpdated}
                    </span>
                )}

            </div>
        </a>
    );
};

export default RepoCard;
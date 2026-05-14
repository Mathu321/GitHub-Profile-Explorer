const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        className="w-4 h-4" aria-hidden="true">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8
      0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33
      0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05
      1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
);

const RepoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        className="w-4 h-4" aria-hidden="true">
        <path d="M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm7
      12H8v2h2v-2zm0-4H8v2h2v-2zm0-4H8v2h2V7zm6 8h-4v2h4v-2zm0-4h-4v2h4v-2zm0-4h-4v2h4V7z" />
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        className="w-4 h-4" aria-hidden="true">
        <path fillRule="evenodd"
            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975
         0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8
         0 10-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975
         0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd" />
    </svg>
);

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        className="w-4 h-4" aria-hidden="true">
        <path fillRule="evenodd"
            d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75
         0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757
         1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389
         4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0
         11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0
         105.304 5.304l4.5-4.5a3.75 3.75 0 00-.275-5.579.75.75 0 01-.354-1z"
            clipRule="evenodd" />
    </svg>
);

const StatBadge = ({ icon, label, count }) => (
    <div className="flex flex-col items-center gap-1 bg-[#0d1117] rounded-lg px-5 py-3
                  border border-[#30363d] hover:border-[#388bfd] transition-colors duration-200">
        <div className="flex items-center gap-1.5 text-[#388bfd]">
            {icon}
            <span className="text-lg font-bold text-white">{count?.toLocaleString() ?? "—"}</span>
        </div>
        <span className="text-[#8b949e] text-xs uppercase tracking-wider">{label}</span>
    </div>
);

const ProfileCard = ({ profile }) => {
    if (!profile) return null;
    const {
        avatar_url,
        name,
        login,
        bio,
        location,
        blog,
        followers,
        following,
        public_repos,
        html_url,
    } = profile;

    const blogUrl = blog && !blog.startsWith("http") ? `https://${blog}` : blog;

    return (
        <div className="w-full bg-[#161b22] border border-[#30363d] rounded-2xl
                    p-6 sm:p-8 hover:border-[#8b949e] transition-colors duration-300
                    shadow-lg shadow-black/30">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                    src={avatar_url}
                    alt={`${login}'s avatar`}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover
                     ring-2 ring-[#30363d] hover:ring-[#388bfd]
                     transition-all duration-300 shrink-0"
                />

                <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left min-w-0">

                    {name && (
                        <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                            {name}
                        </h2>
                    )}

                    <a
                        href={html_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[#388bfd] hover:underline text-sm font-medium"
                    >
                        @{login}
                    </a>

                    {bio && (
                        <p className="text-[#8b949e] text-sm leading-relaxed max-w-lg">
                            {bio}
                        </p>
                    )}

                    <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 mt-1">

                        {location && (
                            <span className="flex items-center gap-1.5 text-[#8b949e] text-xs">
                                <LocationIcon />
                                {location}
                            </span>
                        )}

                        {blogUrl && (
                            <a
                                href={blogUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="flex items-center gap-1.5 text-[#388bfd] text-xs hover:underline"
                            >
                                <LinkIcon />
                                {blog.replace(/^https?:\/\//, "")}
                            </a>
                        )}

                    </div>
                </div>
            </div>

            <hr className="border-[#30363d] my-6" />

            <div className="grid grid-cols-3 gap-3">
                <StatBadge icon={<UsersIcon />} label="Followers" count={followers} />
                <StatBadge icon={<UsersIcon />} label="Following" count={following} />
                <StatBadge icon={<RepoIcon />} label="Public Repos" count={public_repos} />
            </div>

        </div>
    );
};

export default ProfileCard;
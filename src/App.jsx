import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import RepoList from "./components/RepoList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

import { fetchUserProfileAndRepos } from "./services/githubApi";

const App = () => {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username) return;

        const loadData = async () => {
            setLoading(true);
            setError(null);
            setProfile(null);
            setRepos([]);

            try {
                const { profile: fetchedProfile, repos: fetchedRepos } =
                    await fetchUserProfileAndRepos(username);
                setProfile(fetchedProfile);
                setRepos(fetchedRepos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [username]);

    const handleSearch = (newUsername) => {
        setUsername(newUsername.toLowerCase().trim());
    };
    return (
        <div className="min-h-screen bg-[#0d1117] text-[#cdd9e5]"
            style={{
                backgroundImage: "radial-gradient(circle, #21262d 1px, transparent 1px)",
                backgroundSize: "32px 32px",
            }}>

            <Navbar />

            <main className="max-w-4xl mx-auto px-4 pb-20">

                <SearchBar onSearch={handleSearch} />

                {loading && <Loader />}

                {!loading && error && <ErrorMessage message={error} />}

                {!loading && !error && profile && (
                    <div className="flex flex-col gap-6"
                        style={{ animation: "fadeIn 0.35s ease both" }}>
                        <ProfileCard profile={profile} />
                        <RepoList repos={repos} />
                    </div>
                )}
                {!loading && !error && !profile && !username && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">

                        <div className="w-20 h-20 rounded-full bg-[#161b22] border border-[#30363d]
                            flex items-center justify-center
                            shadow-lg shadow-black/30"
                            style={{ animation: "subtlePulse 3s ease-in-out infinite" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                className="w-10 h-10 text-[#30363d]" aria-hidden="true">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                         0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                         -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
                         .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
                         -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0
                         012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595
                         1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012
                         2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <p className="text-[#cdd9e5] font-semibold text-base">
                                No profile loaded yet
                            </p>
                            <p className="text-[#8b949e] text-sm max-w-xs leading-relaxed">
                                Search for a GitHub username above to explore their profile and repositories.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                            {["torvalds", "gaearon", "sindresorhus"].map((name) => (
                                <button
                                    key={name}
                                    onClick={() => handleSearch(name)}
                                    className="px-3 py-1.5 text-xs text-[#388bfd] border border-[#388bfd]/30
                             rounded-full hover:bg-[#388bfd]/10 hover:border-[#388bfd]/60
                             transition-all duration-200 font-mono"
                                >
                                    @{name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

            </main>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes subtlePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56,139,253,0); }
          50%       { box-shadow: 0 0 0 8px rgba(56,139,253,0.08); }
        }
      `}</style>
        </div>
    );
};

export default App;
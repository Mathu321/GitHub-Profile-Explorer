const Loader = () => (
    <div
        className="flex flex-col items-center justify-center py-24 gap-5"
        role="status"
        aria-label="Loading"
        style={{ animation: "fadeIn 0.2s ease both" }}
    >
        <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-4 border-[#21262d]" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent
                      border-t-[#388bfd] animate-spin" />
            <div className="absolute inset-3 rounded-full bg-[#388bfd]/10" />
        </div>
        <div className="flex flex-col items-center gap-1">
            <p className="text-[#cdd9e5] text-sm font-medium">Fetching profile</p>
            <p className="text-[#6e7681] text-xs">Talking to the GitHub API…</p>
        </div>
        <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0);   }
      }
    `}</style>
    </div>
);

export default Loader;
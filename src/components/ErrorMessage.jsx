const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        className="w-5 h-5 shrink-0" aria-hidden="true">
        <path fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599
         4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75
         0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd" />
    </svg>
);

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="w-full flex justify-center px-4 mt-10"
            style={{ animation: "fadeIn 0.25s ease both" }}>

            <div
                role="alert"
                className="
          w-full max-w-xl
          flex items-stretch overflow-hidden
          bg-[#161b22] border border-[#f85149]/30
          rounded-xl shadow-lg shadow-black/30
          hover:border-[#f85149]/60 transition-colors duration-200
        "
            >
                <div className="w-1 shrink-0 bg-gradient-to-b from-[#f85149] to-[#da3633]"
                    aria-hidden="true" />

                <div className="flex items-start gap-3 px-5 py-4 flex-1 min-w-0">
                    <span className="text-[#f85149] mt-0.5">
                        <WarningIcon />
                    </span>

                    <div className="flex flex-col gap-1 min-w-0">
                        <p className="text-[#f85149] font-semibold text-sm">
                            Something went wrong
                        </p>
                        <p className="text-[#8b949e] text-sm leading-relaxed break-words">
                            {message}
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
        </div>
    );
};

export default ErrorMessage;
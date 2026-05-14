const WarningIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 shrink-0 mt-0.5"
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599
         4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75
         0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
        />
    </svg>
);

const ErrorMessage = ({ message }) => {

    if (!message) return null;

    return (
        <div className="w-full flex justify-center px-4 mt-10">
            <div
                role="alert"
                className="
          w-full max-w-xl
          flex items-start gap-3
          bg-[#161b22]
          border border-[#f85149]/40
          rounded-xl
          px-5 py-4
          shadow-lg shadow-black/30
        "
            >
                <span className="text-[#f85149]">
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
    );
};

export default ErrorMessage;
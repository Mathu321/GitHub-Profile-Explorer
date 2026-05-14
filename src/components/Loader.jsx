const Loader = () => {
    return (
        <div
            className="flex flex-col items-center justify-center py-20 gap-4"
            role="status"
            aria-label="Loading"
        >
            <div
                className="
          w-12 h-12
          rounded-full
          border-4
          border-[#30363d]        
          border-t-[#388bfd]      
          animate-spin            
        "
            />
            <p className="text-[#8b949e] text-sm tracking-wide">
                Loading…
            </p>

        </div>
    );
};

export default Loader;
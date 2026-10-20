function TerminalCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-black/80 border border-pink-300/30 rounded-lg shadow-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-pink-300/60 hover:shadow-pink-300/10">
      <div className="bg-neutral-900/80 px-4 py-2 border-b border-pink-300/20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500/80 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500/80 rounded-full"></div>
        </div>
        <span className="text-xs text-neutral-400 font-mono tracking-wider">
          {title || 'terminal'}
        </span>
        <div className="w-10"></div>
      </div>

      <div className="p-6 font-mono text-sm text-neutral-300 tracking-relaxed">{children}</div>
    </div>
  );
}

export default TerminalCard;

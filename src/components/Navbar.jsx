function Navbar({ role, setRole }) {
    return (
        <div className="px-6 py-4 sticky top-0 z-10 flex justify-center">
            <div className="glass-card border border-[var(--border-main)] p-2 pl-8 pr-2 flex justify-between items-center rounded-3xl w-full max-w-5xl shadow-2xl">
                <div className="flex items-center gap-4">
                    <div className="w-2.5 h-2.5 bg-[var(--teal-accent)] rounded-full animate-pulse shadow-[0_0_10px_var(--teal-accent)]"></div>
                    <h2 className="font-black text-xs tracking-[0.2em] text-[var(--text-main)] uppercase">
                        Vertex | {role === "admin" ? "Management Console" : "Personal Workspace"}
                    </h2>
                </div>

                <div className="flex gap-6 items-center">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[9px] text-[var(--text-muted)] uppercase font-black tracking-widest leading-none">Security Scope</span>
                        <span className={`text-[10px] font-black tracking-[0.2em] uppercase mt-1 ${role === "admin" ? "text-[var(--teal-accent)]" : "text-[var(--text-dim)]"}`}>
                            {role} access
                        </span>
                    </div>

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="bg-[var(--bg-glass)] border border-[var(--border-main)] px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-main)] outline-none hover:bg-[var(--bg-secondary)] transition-all cursor-pointer appearance-none"
                    >
                        <option value="viewer">Viewer Mode</option>
                        <option value="admin">Admin Console</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
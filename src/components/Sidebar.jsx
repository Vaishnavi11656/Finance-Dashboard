import { FaChartBar, FaTable, FaLightbulb, FaUser, FaCompass, FaSignOutAlt } from "react-icons/fa";
import { MdWbSunny, MdDarkMode } from "react-icons/md";
import { useAppContext } from "../context/AppContext";

function Sidebar({ section, setSection, onLogout }) {
    const { theme, toggleTheme } = useAppContext();

    return (
        <div className="w-20 bg-[var(--bg-secondary)] backdrop-blur-xl h-screen flex flex-col items-center py-8 border-r border-[var(--border-main)] text-[var(--text-main)] sticky top-0 transition-all hover:w-64 group relative overflow-hidden">
            <div className="mb-12 flex items-center gap-4 group-hover:px-4 w-full">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 active:scale-95 transition-transform flex-shrink-0">
                    <FaCompass className="text-black" size={20} />
                </div>
                <span className="hidden group-hover:inline text-lg font-black tracking-tighter text-[var(--text-main)] animate-in fade-in slide-in-from-left-2 duration-500">
                    VERTEX
                </span>
            </div>

            <div className="space-y-6 flex flex-col items-center group-hover:items-start group-hover:px-4 w-full flex-1">
                {[
                    { id: "overview", icon: <FaChartBar />, label: "Dashboard" },
                    { id: "transactions", icon: <FaTable />, label: "History" },
                    { id: "analytics", icon: <FaChartBar />, label: "Reports" },
                    { id: "insights", icon: <FaLightbulb />, label: "Strategy" },
                    { id: "profile", icon: <FaUser />, label: "Account" }
                ].map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSection(item.id)}
                        className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center gap-4 w-full
                            ${section === item.id 
                                ? "bg-teal-400/10 text-teal-400 shadow-inner" 
                                : "hover:bg-[var(--bg-glass)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                            }`}
                    >
                        <div className="text-xl min-w-[24px] flex justify-center">
                            {item.icon}
                        </div>
                        <span className="hidden group-hover:inline text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Actions (Theme & Logout) */}
            <div className="mt-auto space-y-4 group-hover:px-4 w-full">
                {/* Theme Toggle */}
                <div
                    onClick={toggleTheme}
                    className="p-3 rounded-2xl cursor-pointer transition-all flex items-center gap-4 w-full hover:bg-[var(--bg-glass)] text-[var(--text-muted)] hover:text-[var(--text-main)] group/theme"
                >
                    <div className="text-xl min-w-[24px] flex justify-center transition-transform group-hover/theme:rotate-12">
                        {theme === 'dark' ? <MdWbSunny /> : <MdDarkMode />}
                    </div>
                    <span className="hidden group-hover:inline text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                </div>

                {/* Logout Action */}
                <div
                    onClick={onLogout}
                    className="p-3 rounded-2xl cursor-pointer transition-all flex items-center gap-4 w-full hover:bg-rose-500/10 text-[var(--text-muted)] hover:text-rose-500 group/logout"
                >
                    <div className="text-xl min-w-[24px] flex justify-center">
                        <FaSignOutAlt />
                    </div>
                    <span className="hidden group-hover:inline text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Sign Out
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
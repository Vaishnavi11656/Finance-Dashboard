import { useState, useEffect } from "react"
import { FaUserEdit, FaSignOutAlt, FaCheck, FaTimes, FaCamera, FaEnvelope, FaShieldAlt, FaCalendarAlt } from "react-icons/fa"

function Profile({ role, onLogout }) {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: localStorage.getItem("profileName") || (role === "admin" ? "Rahul Sharma" : "Vaishnavi"),
        email: localStorage.getItem("profileEmail") || "user@findash.com"
    });

    const [seed] = useState(() => {
        const saved = localStorage.getItem("avatarSeed")
        if (saved) return saved
        const newSeed = Math.floor(Math.random() * 10000)
        localStorage.setItem("avatarSeed", newSeed)
        return newSeed
    })

    const avatar = role === "admin"
        ? `https://api.dicebear.com/7.x/adventurer/svg?seed=Boy${seed}`
        : `https://api.dicebear.com/7.x/adventurer/svg?seed=Girl${seed}`

    const handleSave = () => {
        localStorage.setItem("profileName", profileData.name);
        localStorage.setItem("profileEmail", profileData.email);
        setIsEditing(false);
    };

    const handleLogout = () => {
        onLogout();
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="glass-card p-10 rounded-[3.5rem] border border-[var(--border-main)] shadow-3xl flex flex-col md:flex-row items-center gap-12">
                <div className="relative group">
                    <div className="w-40 h-40 rounded-[3rem] bg-gradient-to-br from-[var(--teal-accent)] to-cyan-500 p-1.5 shadow-2xl shadow-[var(--teal-accent)]/20 translate-y-0 group-hover:-translate-y-2 transition-all duration-700">
                        <img
                            src={avatar}
                            alt="profile avatar"
                            className="w-full h-full rounded-[2.8rem] bg-[var(--bg-primary)] object-cover shadow-inner"
                        />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[var(--text-main)] text-[var(--bg-primary)] p-3 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:scale-110 active:scale-95">
                        <FaCamera size={16} />
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-6">
                    {isEditing ? (
                        <div className="space-y-4">
                            <input
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                className="bg-[var(--bg-glass)] border border-[var(--border-main)] p-4 rounded-2xl w-full text-3xl font-black text-[var(--text-main)] focus:outline-none focus:border-[var(--teal-accent)] focus:bg-[var(--bg-secondary)] transition-all"
                            />
                            <div className="flex items-center gap-3 bg-[var(--bg-glass)] border border-[var(--border-main)] p-3 px-5 rounded-2xl">
                                <FaEnvelope className="text-[var(--teal-accent)]/60" size={14} />
                                <input
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    className="bg-transparent border-none w-full text-sm font-bold text-[var(--text-muted)] focus:outline-none"
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-5xl font-black text-[var(--text-main)] tracking-tighter">
                                {profileData.name}
                            </h2>
                            <p className="text-[var(--teal-accent)] font-black uppercase tracking-[0.4em] text-[10px] mt-4">
                                {role === "admin" ? "Systems Architect" : "Strategic Executive"}
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-3 text-[var(--text-muted)] mt-6 text-sm font-black tracking-tight">
                                <div className="w-8 h-8 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-main)] flex items-center justify-center">
                                    <FaEnvelope size={12} className="text-[var(--text-dim)]" />
                                </div>
                                <span>{profileData.email}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="bg-[var(--teal-accent)] text-black px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:opacity-90 transition-all active-press shadow-xl shadow-[var(--teal-accent)]/20">
                                    <FaCheck size={14} /> Commit Changes
                                </button>
                                <button onClick={() => setIsEditing(false)} className="bg-[var(--bg-glass)] text-[var(--text-muted)] px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-[var(--border-main)] transition-all active-press border border-[var(--border-main)]">
                                    <FaTimes size={14} /> Revert
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="bg-[var(--bg-glass)] text-[var(--text-main)] p-4 rounded-2xl border border-[var(--border-main)] hover:bg-[var(--bg-secondary)] transition-all active-press group">
                                    <FaUserEdit size={22} className="group-hover:text-[var(--teal-accent)] transition-colors" />
                                </button>
                                <button onClick={handleLogout} className="bg-rose-500/10 text-rose-500 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-rose-500 hover:text-white transition-all active-press border border-rose-500/20 shadow-xl shadow-rose-500/10">
                                    <FaSignOutAlt size={14} /> Terminate Session
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/*info card styling*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-10 rounded-[3rem] border border-[var(--border-main)] group hover:border-[var(--teal-accent)]/30 transition-all active-press">
                    <div className="w-12 h-12 bg-[var(--teal-accent)]/10 rounded-2xl flex items-center justify-center mb-8 border border-[var(--teal-accent)]/20 transition-transform group-hover:scale-110">
                        <FaShieldAlt size={20} className="text-[var(--teal-accent)]" />
                    </div>
                    <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.3em]">Clearance Level</p>
                    <h3 className="text-3xl font-black text-[var(--text-main)] mt-2 tracking-tighter">Founding Executive</h3>
                </div>

                <div className="glass-card p-10 rounded-[3rem] border border-[var(--border-main)] group hover:border-[var(--teal-accent)]/30 transition-all active-press">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20 transition-transform group-hover:scale-110">
                        <FaCalendarAlt size={20} className="text-cyan-500" />
                    </div>
                    <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.3em]">Service Period</p>
                    <h3 className="text-3xl font-black text-[var(--text-main)] mt-2 tracking-tighter">since Jan '24</h3>
                </div>

                <div className="glass-card p-10 rounded-[3rem] border border-[var(--border-main)] group hover:border-[var(--teal-accent)]/30 transition-all active-press">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 transition-transform group-hover:scale-110">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shadow-[0_0_10px_#10b981]"></div>
                    </div>
                    <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.3em]">Network Status</p>
                    <h3 className="text-3xl font-black text-emerald-500 mt-2 tracking-tighter uppercase italic">Verified</h3>
                </div>
            </div>
        </div>
    )
}

export default Profile;
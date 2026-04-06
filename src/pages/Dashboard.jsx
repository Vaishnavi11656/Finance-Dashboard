


import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Charts from "../components/Charts";
import TransactionTable from "../components/TransactionTable";
import { useState, useEffect } from "react";
import Insights from "../components/Insights";
import Profile from "../components/profile";
import Analytics from "../components/Analytics";
import Chatbot from "../components/Chatbot";
import { FaPlus, FaChartBar, FaCompass, FaSignOutAlt } from "react-icons/fa";

function Dashboard() {

    const [role, setRole] = useState(
        localStorage.getItem("role") || "viewer"
    );

    const [section, setSection] = useState("overview");

    const [showModal, setShowModal] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        amount: "",
        type: "expense",
        category: "Food",
        accountNumber: ""
    })

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions")
        return saved
            ? JSON.parse(saved)
            : [
                { id: 1, name: "Flipkart Sale", date: "2024-04-20", category: "Shopping", amount: "6200", status: "Completed", type: "expense" },
                { id: 2, name: "Quarterly Salary", date: "2024-04-01", category: "Salary", amount: "128000", status: "Completed", type: "income" },
                { id: 3, name: "Uber Mobility", date: "2024-04-05", category: "Transport", amount: "450", status: "Completed", type: "expense" },
                { id: 4, name: "Amazon Cloud", date: "2024-04-08", category: "Utilities", amount: "1200", status: "Completed", type: "expense" },
                { id: 5, name: "Freelance Project", date: "2024-04-10", category: "Freelance", amount: "15000", status: "Completed", type: "income" },
                { id: 6, name: "Starbucks Coffee", date: "2024-04-12", category: "Food", amount: "350", status: "Completed", type: "expense" },
                { id: 7, name: "Gym Membership", date: "2024-04-15", category: "Health", amount: "2500", status: "Completed", type: "expense" },
                { id: 8, name: "HDFC Mutual Fund", date: "2024-04-18", category: "Investment", amount: "5000", status: "Completed", type: "expense" },
                { id: 9, name: "Netflix Premium", date: "2024-04-19", category: "Entertainment", amount: "799", status: "Completed", type: "expense" },
                { id: 10, name: "Zomato Dinner", date: "2024-04-21", category: "Food", amount: "1200", status: "Completed", type: "expense" },
                { id: 11, name: "House Rent", date: "2024-04-02", category: "Rent", amount: "22000", status: "Completed", type: "expense" },
                { id: 12, name: "Dividend Income", date: "2024-04-05", category: "Investment", amount: "3400", status: "Completed", type: "income" },
                { id: 13, name: "Petrol Refill", date: "2024-04-07", category: "Transport", amount: "2800", status: "Completed", type: "expense" },
                { id: 14, name: "Grocery Store", date: "2024-04-09", category: "Food", amount: "5400", status: "Completed", type: "expense" },
                { id: 15, name: "Upwork Payout", date: "2024-04-11", category: "Freelance", amount: "12500", status: "Completed", type: "income" },
                { id: 16, name: "Pharmacy Bill", date: "2024-04-13", category: "Health", amount: "850", status: "Completed", type: "expense" },
                { id: 17, name: "Book My Show", date: "2024-04-14", category: "Entertainment", amount: "1200", status: "Completed", type: "expense" },
                { id: 18, name: "Electricity Bill", date: "2024-04-16", category: "Utilities", amount: "3450", status: "Completed", type: "expense" },
                { id: 19, name: "Nike Shoes", date: "2024-04-17", category: "Shopping", amount: "8999", status: "Completed", type: "expense" },
                { id: 20, name: "Consulting Fee", date: "2024-04-22", category: "Freelance", amount: "8000", status: "Completed", type: "income" },
                { id: 21, name: "Swiggy Lunch", date: "2024-04-23", category: "Food", amount: "450", status: "Completed", type: "expense" },
                { id: 22, name: "Train Booking", date: "2024-04-24", category: "Transport", amount: "1850", status: "Completed", type: "expense" },
                { id: 23, name: "Apple iCloud", date: "2024-04-25", category: "Utilities", amount: "199", status: "Completed", type: "expense" },
                { id: 24, name: "Bonus Performance", date: "2024-04-26", category: "Salary", amount: "15000", status: "Completed", type: "income" },
                { id: 25, name: "Spotify Duo", date: "2024-04-27", category: "Entertainment", amount: "179", status: "Completed", type: "expense" },
                { id: 26, name: "Mutual Fund SIP", date: "2024-04-05", category: "Investment", amount: "10000", status: "Completed", type: "expense" },
                { id: 27, name: "Credit Card Bill", date: "2024-04-10", category: "Utilities", amount: "4500", status: "Completed", type: "expense" },
                { id: 28, name: "Gas Refill", date: "2024-04-12", category: "Utilities", amount: "1100", status: "Completed", type: "expense" },
                { id: 29, name: "Dividend Payout", date: "2024-04-15", category: "Investment", amount: "2200", status: "Completed", type: "income" },
                { id: 30, name: "Dinner at Taj", date: "2024-04-18", category: "Food", amount: "3500", status: "Completed", type: "expense" },
                { id: 31, name: "School Fees", date: "2024-04-01", category: "Utilities", amount: "15000", status: "Completed", type: "expense" },
                { id: 32, name: "Car Insurance", date: "2024-04-03", category: "Utilities", amount: "8500", status: "Completed", type: "expense" },
                { id: 33, name: "Consulting Project B", date: "2024-04-06", category: "Freelance", amount: "25000", status: "Completed", type: "income" },
                { id: 34, name: "Cinema Night", date: "2024-04-08", category: "Entertainment", amount: "800", status: "Completed", type: "expense" },
                { id: 35, name: "Organic Market", date: "2024-04-11", category: "Food", amount: "2400", status: "Completed", type: "expense" },
                { id: 36, name: "Broadband Connection", date: "2024-04-14", category: "Utilities", amount: "1250", status: "Completed", type: "expense" },
                { id: 37, name: "Stock Profit", date: "2024-04-17", category: "Investment", amount: "5600", status: "Completed", type: "income" },
                { id: 38, name: "Dry Cleaning", date: "2024-04-19", category: "Shopping", amount: "650", status: "Completed", type: "expense" },
                { id: 39, name: "Weekend Getaway", date: "2024-04-20", category: "Transport", amount: "4200", status: "Completed", type: "expense" },
                { id: 40, name: "Bonus Incentive", date: "2024-04-22", category: "Salary", amount: "12000", status: "Completed", type: "income" },
                { id: 41, name: "Cloud Storage", date: "2024-04-23", category: "Utilities", amount: "199", status: "Completed", type: "expense" },
                { id: 42, name: "Medication", date: "2024-04-24", category: "Health", amount: "450", status: "Completed", type: "expense" },
                { id: 43, name: "Bakery Order", date: "2024-04-25", category: "Food", amount: "320", status: "Completed", type: "expense" },
                { id: 44, name: "Etsy Sale", date: "2024-04-26", category: "Freelance", amount: "4500", status: "Completed", type: "income" },
                { id: 45, name: "Gift Housewarming", date: "2024-04-27", category: "Shopping", amount: "1500", status: "Completed", type: "expense" },
                { id: 46, name: "Toll Charges", date: "2024-04-28", category: "Transport", amount: "220", status: "Completed", type: "expense" },
                { id: 47, name: "Domain Renewal", date: "2024-04-29", category: "Utilities", amount: "950", status: "Completed", type: "expense" },
                { id: 48, name: "Referral Program", date: "2024-04-29", category: "Freelance", amount: "1000", status: "Completed", type: "income" },
                { id: 49, name: "Office Supplies", date: "2024-04-30", category: "Shopping", amount: "1250", status: "Completed", type: "expense" },
                { id: 50, name: "Misc Expense", date: "2024-04-30", category: "Utilities", amount: "500", status: "Completed", type: "expense" }
            ]
    })

    const categories = [

        "Food",
        "Transport",
        "Shopping",
        "Health",
        "Investment",
        "Rent",
        "Utilities",
        "Entertainment",
        "Salary",
        "Freelance"

    ]

    useEffect(() => {
        localStorage.setItem("role", role)
    }, [role])

    useEffect(() => {

        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        )

    }, [transactions])

    const addTransaction = () => {

        if (!form.name || !form.amount) return;

        if (editing) {

            setTransactions(

                transactions.map(t =>

                    t.id === editing

                        ? { ...t, ...form }

                        : t

                )

            )

            setEditing(null)

        } else {

            const newTransaction = {
                id: Date.now(),
                name: form.name,
                date: new Date().toISOString().slice(0, 10),
                category: form.category,
                amount: form.amount,
                status: "Completed",
                type: form.type,
                accountNumber: form.accountNumber
            }

            setTransactions([
                newTransaction,
                ...transactions
            ])

        }

        setShowModal(false)

        setForm({

            name: "",
            amount: "",
            type: "expense",
            category: "Food",
            accountNumber: ""

        })

    }
    const deleteTransaction = (id) => {

        setTransactions(
            transactions.filter(t => t.id !== id)
        )

        setConfirmDelete(null)

    }
    const [confirmDelete, setConfirmDelete] = useState(null)

    const [editing, setEditing] = useState(null)
    const editTransaction = (transaction) => {

        setForm({

            name: transaction.name,

            amount: transaction.amount,

            type: transaction.type,

            category: transaction.category,
            accountNumber: transaction.accountNumber || ""

        })

        setEditing(transaction.id)

        setShowModal(true)

    }

    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0)

    const totalExpense = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0)

    const balance = totalIncome - totalExpense


    const [categoryFilter, setCategoryFilter] = useState(null)
    const [showChat, setShowChat] = useState(false)
    return (

        <div className="flex min-h-screen relative text-[var(--text-main)] bg-[var(--bg-primary)]">
            <Sidebar section={section} setSection={setSection} onLogout={() => setShowLogoutConfirm(true)} />

            <div className="flex-1 overflow-y-auto">
                <Navbar role={role} setRole={setRole} />

                {/* MODALS Area */}
                {showLogoutConfirm && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[110] backdrop-blur-md">
                        <div className="glass-card p-10 rounded-[3rem] w-96 text-center">
                            <div className="w-16 h-16 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-rose-500/20">
                                <FaSignOutAlt className="text-rose-500" size={24} />
                            </div>
                            <h2 className="text-2xl font-black mb-3">Sign Out?</h2>
                            <p className="text-[var(--text-muted)] text-sm mb-8">You are about to terminate your active session. Are you sure?</p>
                            <div className="flex gap-4">
                                <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-4 bg-[var(--bg-glass)] hover:bg-[var(--border-main)] rounded-2xl border border-[var(--border-main)] transition-all font-bold">
                                    Stay
                                </button>
                                <button 
                                    onClick={() => {
                                        localStorage.clear();
                                        window.location.reload();
                                    }} 
                                    className="flex-1 py-4 bg-rose-500 hover:bg-rose-600 rounded-2xl transition-all font-bold text-white shadow-xl shadow-rose-500/20"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {confirmDelete && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
                        <div className="glass-card p-8 rounded-[2rem] w-80">
                            <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center mb-6 border border-rose-500/20">
                                <span className="text-rose-500 text-2xl font-bold">!</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Delete Entry?</h2>
                            <p className="text-[var(--text-muted)] text-sm mb-8 leading-relaxed">
                                This action cannot be undone. Are you sure you want to remove this record?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setConfirmDelete(null)}
                                    className="flex-1 bg-[var(--bg-glass)] hover:bg-[var(--border-main)] py-3 rounded-2xl border border-[var(--border-main)] transition-all font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => deleteTransaction(confirmDelete)}
                                    className="flex-1 bg-rose-500 hover:bg-rose-600 py-3 rounded-2xl transition-all font-bold text-white shadow-lg shadow-rose-500/20"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showModal && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
                        <div className="glass-card p-10 rounded-[3rem] border border-[var(--border-main)] w-[28rem]">
                            <h2 className="text-3xl font-black mb-8 tracking-tighter">
                                {editing ? "Update Record" : "New Entry"}
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-[var(--text-muted)] ml-3 tracking-[0.2em]">Description</label>
                                    <input
                                        placeholder="Enter details..."
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full p-5 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-main)] text-[var(--text-main)] focus:outline-none focus:border-[var(--teal-accent)] focus:bg-[var(--bg-secondary)] transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-[var(--text-muted)] ml-3 tracking-[0.2em]">Value</label>
                                    <input
                                        placeholder="₹0.00"
                                        value={form.amount}
                                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                        className="w-full p-5 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-main)] text-[var(--text-main)] focus:outline-none focus:border-[var(--teal-accent)] focus:bg-[var(--bg-secondary)] transition-all font-mono text-xl font-black"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black text-[var(--text-muted)] ml-3 tracking-[0.2em]">Type</label>
                                        <select
                                            value={form.type}
                                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                                            className="w-full p-4 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-main)] text-[var(--text-main)] focus:outline-none focus:border-[var(--teal-accent)] focus:bg-[var(--bg-secondary)] transition-all appearance-none cursor-pointer font-bold"
                                        >
                                            <option value="expense">Expense</option>
                                            <option value="income">Income</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black text-[var(--text-muted)] ml-3 tracking-[0.2em]">Category</label>
                                        <select
                                            value={form.category}
                                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                                            className="w-full p-4 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-main)] text-[var(--text-main)] focus:outline-none focus:border-[var(--teal-accent)] focus:bg-[var(--bg-secondary)] transition-all appearance-none cursor-pointer font-bold"
                                        >
                                            {categories.map((cat, index) => (
                                                <option key={index}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {form.type === "expense" && (
                                    <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="text-[10px] uppercase font-black text-[var(--text-muted)] ml-3 tracking-[0.2em]">Target Account</label>
                                        <input
                                            placeholder="Enter Bank/Account Num"
                                            value={form.accountNumber}
                                            onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                                            className="w-full p-5 rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-main)] text-[var(--text-main)] focus:outline-none focus:border-[var(--teal-accent)] focus:bg-[var(--bg-secondary)] transition-all font-mono"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 mt-12">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-4 bg-[var(--bg-glass)] hover:bg-[var(--border-main)] rounded-2xl border border-[var(--border-main)] transition-all text-[var(--text-muted)] font-black uppercase tracking-widest text-xs active-press"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={addTransaction}
                                    className="flex-[1.5] py-4 bg-[var(--teal-accent)] hover:opacity-90 rounded-2xl transition-all font-black text-black shadow-xl shadow-[var(--teal-accent)]/20 active-press"
                                >
                                    {editing ? "Save Changes" : "Confirm Entry"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-8 pb-24">
                    {section === "overview" && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 auto-rows-min">
                            <div className="md:col-span-4 featured-card p-12 rounded-[3.5rem] mt-8 flex flex-col md:flex-row justify-between items-center group transition-all duration-700">
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                        <div className="w-10 h-1.5 bg-[var(--teal-accent)] rounded-full"></div>
                                        <p className="text-[var(--text-muted)] text-sm font-black uppercase tracking-[0.2em]">Primary Capital</p>
                                    </div>
                                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-[var(--text-main)]">
                                        ₹{balance.toLocaleString()}
                                    </h1>
                                    <div className="flex items-center justify-center md:justify-start gap-2 mt-3 text-[var(--teal-accent)]">
                                        <span className="flex h-2 w-2 rounded-full bg-current"></span>
                                        <p className="text-sm font-bold uppercase tracking-widest opacity-80">Market Active</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-10 md:mt-0 glass-buttons">
                                    <button 
                                        onClick={() => {
                                            setForm({ ...form, type: "income" });
                                            setShowModal(true);
                                        }}
                                        className="bg-[var(--teal-accent)] text-black px-8 py-4 rounded-3xl font-black text-lg shadow-2xl shadow-[var(--teal-accent)]/30 active:scale-95 transition-all"
                                    >
                                        Add Money
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setForm({ ...form, type: "expense" });
                                            setShowModal(true);
                                        }}
                                        className="bg-[var(--bg-glass)] border border-[var(--border-main)] hover:bg-[var(--border-main)] px-8 py-4 rounded-3xl transition-all duration-300 text-lg font-bold backdrop-blur-md active:scale-95 text-[var(--text-main)]"
                                    >
                                        Transfer
                                    </button>
                                </div>
                            </div>

                            {/* Secondary Metrics Row: Full 4-Column Grid */}
                            <StatCard
                                title="Liquid Capital"
                                amount={`₹${balance.toLocaleString()}`}
                                change="+14%"
                            />
                            <StatCard
                                title="Total Outflow"
                                amount={`₹${totalExpense.toLocaleString()}`}
                                change="-2.4%"
                            />
                            <StatCard
                                title="Retained Assets"
                                amount={`₹${(totalIncome - totalExpense).toLocaleString()}`}
                                change="+5.2%"
                            />
                            <StatCard
                                title="Incoming Flux"
                                amount={`₹${totalIncome.toLocaleString()}`}
                                change="+9%"
                            />

                            {/* Main Analysis & Feedback Loop Row */}
                            <div className="md:col-span-3 space-y-6">
                                {/* Analysis Suite */}
                                <Charts transactions={transactions} setActiveCategory={setCategoryFilter} />

                                {/* Secondary Widgets Subgrid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-[var(--teal-accent)] transition-all duration-500">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-black text-[var(--text-main)] tracking-tight">Recent Obligations</h3>
                                            <span className="text-[10px] font-black text-[var(--teal-accent)] bg-[var(--teal-accent)]/10 px-3 py-1 rounded-full uppercase tracking-widest">Upcoming</span>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { icon: "⚡", name: "Amazon Web Services", date: "Apr 28", amount: "₹4,200" },
                                                { icon: "🏠", name: "Modern Realty Rent", date: "May 01", amount: "₹22,000" },
                                                { icon: "🌐", name: "Jio Fiber Premium", date: "May 05", amount: "₹1,499" }
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-4 bg-black/5 rounded-2xl border border-[var(--border-main)] group/item hover:bg-[var(--bg-glass)] transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-[var(--bg-glass)] rounded-xl flex items-center justify-center text-lg">{item.icon}</div>
                                                        <div>
                                                            <p className="text-sm font-bold text-[var(--text-main)] tracking-tight">{item.name}</p>
                                                            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{item.date}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-black text-[var(--text-main)]">{item.amount}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="glass-card p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-[var(--indigo-accent)] transition-all duration-500 group">
                                        <div>
                                            <h3 className="text-xl font-black text-[var(--text-main)] tracking-tight mb-2">Efficiency</h3>
                                            <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest">Savings Velocity</p>
                                        </div>
                                        <div className="py-8 text-center relative">
                                            <div className="inline-block relative">
                                                <div className="w-32 h-32 rounded-full border-8 border-[var(--border-main)] border-t-[var(--teal-accent)] animate-[spin_3s_linear_infinite]"></div>
                                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                    <span className="text-3xl font-black text-[var(--text-main)]">92%</span>
                                                    <span className="text-[8px] font-black text-[var(--teal-accent)] uppercase tracking-widest">Peak</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-[var(--text-muted)] text-xs leading-relaxed text-center italic">"You are retaining capital at an elite level. Keep it up!"</p>
                                    </div>
                                </div>

                                {/* Bonus Row */}
                                <div className="bg-gradient-to-br from-teal-500 to-indigo-600 p-8 rounded-[2.5rem] shadow-2xl shadow-teal-500/20 group hover:rotate-1 hover:scale-[1.01] transition-all duration-500 cursor-pointer overflow-hidden relative">
                                    <div className="absolute -right-8 -bottom-8 opacity-20 transform -rotate-12 group-hover:scale-125 transition-transform">
                                        <FaCompass size={160} />
                                    </div>
                                    <div className="relative z-10 flex justify-between items-center">
                                        <div>
                                            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Performance Bonus</p>
                                            <h3 className="text-3xl font-black text-white tracking-tighter">Growth Unlock</h3>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                                            <p className="text-white text-lg font-black tracking-tight">₹12,400 Claimed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Analysis Container */}
                            <div className="md:col-span-1">
                                <Insights transactions={transactions} />
                            </div>
                        </div>
                    )}

                    {section === "transactions" && (
                        <div className="max-w-6xl mx-auto space-y-6">
                            <div className="flex justify-between items-end mb-4">
                                <h2 className="text-3xl font-black tracking-tight text-white pl-2">Transaction History</h2>
                                <button className="text-teal-400 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">Export Ledger</button>
                            </div>
                            <TransactionTable
                                role={role}
                                transactions={transactions}
                                categoryFilter={categoryFilter}
                                deleteTransaction={deleteTransaction}
                                editTransaction={editTransaction}
                                setConfirmDelete={setConfirmDelete}
                                setShowModal={setShowModal}
                            />
                        </div>
                    )}

                    {section === "analytics" && (
                        <div className="max-w-6xl mx-auto">
                           <Analytics transactions={transactions} />
                        </div>
                    )}

                    {section === "profile" && (
                        <div className="max-w-4xl mx-auto">
                            <Profile role={role} onLogout={() => setShowLogoutConfirm(true)} />
                        </div>
                    )}

                    {section === "insights" && (
                        <div className="max-w-4xl mx-auto">
                            <Insights transactions={transactions} />
                        </div>
                    )}
                </div>

                <Chatbot transactions={transactions} balance={balance} />
            </div>

        </div>

    )

}

export default Dashboard;
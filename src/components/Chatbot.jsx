import { useState, useRef, useEffect } from "react"
import { FaRobot, FaPaperPlane, FaTimes, FaMinus } from "react-icons/fa"

function Chatbot({ transactions, balance }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hello! I'm your FinDash Assistant. How can I help you today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, userMsg]);
        
        const userInput = input.toLowerCase();
        setInput("");

        // Simple Bot Logic
        setTimeout(() => {
            let botText = "I'm still learning! You can ask about your balance, highest expense, or total transactions.";
            
            if (userInput.includes("balance")) {
                botText = `Your current active balance is ₹${balance.toLocaleString()}.`;
            } else if (userInput.includes("highest expense") || userInput.includes("spent most")) {
                const expenses = transactions.filter(t => t.type === 'expense');
                if (expenses.length > 0) {
                    const highest = expenses.reduce((prev, current) => (parseFloat(prev.amount) > parseFloat(current.amount)) ? prev : current);
                    botText = `Your highest expense was ₹${highest.amount} on ${highest.name} (${highest.category}).`;
                } else {
                    botText = "No expenses found in your records.";
                }
            } else if (userInput.includes("transactions") || userInput.includes("history")) {
                botText = `You have a total of ${transactions.length} records in your ledger.`;
            } else if (userInput.includes("hi") || userInput.includes("hello")) {
                botText = "Hi there! Ready to analyze some numbers?";
            }

            const botMsg = { role: 'bot', text: botText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            setMessages(prev => [...prev, botMsg]);
        }, 600);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-sans">
            {isOpen ? (
                <div className="w-[400px] h-[600px] glass-card border border-[var(--border-main)] rounded-[3rem] shadow-3xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
                    {/* Header */}
                    <div className="p-8 bg-gradient-to-r from-[var(--teal-accent)]/10 to-cyan-500/5 border-b border-[var(--border-main)] flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[var(--teal-accent)] rounded-2xl flex items-center justify-center text-black shadow-lg shadow-[var(--teal-accent)]/20">
                                <FaRobot size={24} />
                            </div>
                            <div>
                                <h3 className="font-black text-[var(--text-main)] text-sm tracking-tight">FinDash Intelligence</h3>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">Live Access</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-xl hover:bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all">
                            <FaMinus size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-[var(--bg-primary)]/30">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-5 rounded-[2rem] shadow-sm ${msg.role === 'user' 
                                    ? 'bg-[var(--teal-accent)] text-black font-black text-xs uppercase tracking-tight rounded-tr-sm' 
                                    : 'bg-[var(--bg-glass)] border border-[var(--border-main)] text-[var(--text-main)] font-medium text-sm rounded-tl-sm'}`}>
                                    <p className="leading-relaxed">{msg.text}</p>
                                    <span className={`text-[8px] font-black uppercase tracking-widest mt-3 block ${msg.role === 'user' ? 'text-black/30' : 'text-[var(--text-dim)]'}`}>{msg.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-8 bg-[var(--bg-secondary)] border-t border-[var(--border-main)] flex gap-4">
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Query your ledger..."
                            className="flex-1 bg-[var(--bg-glass)] border border-[var(--border-main)] rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-[var(--teal-accent)] text-[var(--text-main)] transition-all placeholder:text-[var(--text-dim)]"
                        />
                        <button type="submit" className="w-14 h-14 bg-[var(--teal-accent)] rounded-2xl flex items-center justify-center text-black hover:opacity-90 shadow-xl shadow-[var(--teal-accent)]/20 active-press transition-all">
                            <FaPaperPlane size={18} />
                        </button>
                    </form>
                </div>
            ) : (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="w-20 h-20 bg-[var(--teal-accent)] rounded-[2.2rem] flex items-center justify-center text-black shadow-2xl hover:scale-110 hover:-rotate-6 transition-all duration-700 group relative active-press"
                >
                    <FaRobot size={30} className="group-hover:animate-bounce" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-rose-500 rounded-full border-4 border-[var(--bg-primary)] flex items-center justify-center shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                </button>
            )}
        </div>
    )
}

export default Chatbot;


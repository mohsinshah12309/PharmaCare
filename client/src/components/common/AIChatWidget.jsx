import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { aiChat } from "../../services/productService";

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! Tell me what you're looking for (e.g. \"something for a headache\") and I'll find matching products.",
      products: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text, products: [] }]);
    setInput("");
    setLoading(true);

    try {
      const data = await aiChat(text);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply, products: data.products || [] },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, something went wrong. Please try again.", products: [] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating icon */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-600 text-white shadow-lg flex items-center justify-center hover:bg-green-700 transition"
        title="AI Product Assistant"
      >
        <i className={`fas ${open ? "fa-times" : "fa-robot"} text-xl`}></i>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[28rem] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200">
          <div className="bg-green-600 text-white px-4 py-3 rounded-t-2xl">
            <p className="font-bold">AI Assistant</p>
            <p className="text-xs text-green-100">Product search — not medical advice</p>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={`inline-block px-3 py-2 rounded-lg max-w-[85%] ${
                    m.role === "user" ? "bg-green-100 text-gray-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {m.text}
                </div>
                {m.products && m.products.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {m.products.map((p) => (
                      <Link
                        key={p._id}
                        to={`/product/${p._id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 text-left"
                      >
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />
                        <div>
                          <p className="font-semibold text-xs">{p.name}</p>
                          <p className="text-green-600 text-xs font-bold">Rs {p.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-block px-3 py-2 rounded-lg bg-gray-100">
                  <i className="fas fa-spinner animate-spin text-gray-500"></i>
                </div>
              </div>
            )}
          </div>

          <p className="text-[10px] text-gray-400 px-4 pb-1">
            This is a product search assistant, not medical advice — consult a pharmacist or doctor for medical guidance.
          </p>

          <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. something for a headache"
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold disabled:bg-gray-300"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default AIChatWidget;
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../store/cart";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type CheckoutFields = {
  name: string;
  email: string;
  address: string;
  city: string;
  pin: string;
};

export function CartDrawer() {
  const { isOpen, close, items, setQty, totalPrice, clear } = useCart();
  const list = Object.values(items);
  const [view, setView] = useState<"cart" | "checkout" | "confirmed">("cart");
  const [fields, setFields] = useState<CheckoutFields>({
    name: "", email: "", address: "", city: "", pin: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutFields, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  function handleClose() {
    close();
    setTimeout(() => { setView("cart"); setSubmitAttempted(false); setTouched({}); }, 400);
  }

  function isValid(key: keyof CheckoutFields) {
    const v = fields[key].trim();
    if (key === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (key === "pin") return /^\d{6}$/.test(v);
    return v.length > 0;
  }

  const allValid = (Object.keys(fields) as (keyof CheckoutFields)[]).every(isValid);

  function showError(key: keyof CheckoutFields) {
    return (submitAttempted || touched[key]) && !isValid(key);
  }

  function handleOrder() {
    setSubmitAttempted(true);
    if (!allValid) return;
    setView("confirmed");
    clear();
  }

  const field = (key: keyof CheckoutFields, label: string, placeholder: string, type = "text") => {
    const err = showError(key);
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p className={`font-mono text-[9px] uppercase tracking-[0.3em] transition-colors ${err ? "text-rust" : "text-ink/60"}`}>
            {label} <span className="text-rust">*</span>
          </p>
          {err && (
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-rust">
              {key === "email" ? "Invalid email" : key === "pin" ? "6-digit code" : "Required"}
            </p>
          )}
        </div>
        <input
          type={type}
          value={fields[key]}
          onChange={(e) => setFields((f) => ({ ...f, [key]: e.target.value }))}
          onBlur={() => setTouched((t) => ({ ...t, [key]: true }))}
          placeholder={placeholder}
          className={`w-full bg-transparent border-b outline-none font-serif text-2xl text-ink placeholder:text-ink/30 py-1 transition-colors ${
            err ? "border-rust/60 focus:border-rust" : "border-ink/20 focus:border-ink/50"
          }`}
        />
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] bg-parchment text-ink shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col`}
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-ink/8">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-ink/55">
              YOUR ARCHIVE
            </p>
            <h2 className="mt-1 font-display text-4xl text-ink leading-tight">
              {view === "checkout" ? "Checkout" : view === "confirmed" ? "Order Placed" : "Cart"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="mt-1 flex items-center gap-1.5 border border-ink/20 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-ink/70 hover:text-ink hover:border-ink/40 transition-colors"
          >
            CLOSE <span className="text-[11px]">×</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* ── CART VIEW ── */}
            {view === "cart" && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex flex-col min-h-full"
              >
                {list.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center px-8 py-20 text-center">
                    <p className="font-display text-3xl text-ink">Your archive is empty.</p>
                    <p className="mt-3 font-serif text-base text-ink/65 leading-relaxed">
                      Start collecting flavours across India.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-8 rounded-full bg-wine text-cream px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] hover:bg-winedeep transition-colors"
                    >
                      Explore the Archive
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="px-8 py-6 space-y-6">
                      {list.map(({ product, qty }) => (
                        <div key={product.id} className="flex gap-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-[72px] h-[88px] object-cover rounded-sm"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55 truncate">
                              {product.region}, {product.state}
                            </p>
                            <p className="mt-1 font-display text-xl leading-tight">{product.name}</p>
                            <div className="mt-3 flex items-center gap-3">
                              <div className="flex items-center border border-ink/15 rounded-full">
                                <button
                                  onClick={() => setQty(product.id, qty - 1)}
                                  className="px-2.5 py-1.5 text-ink/70 hover:text-ink"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="px-2 text-xs font-mono w-6 text-center tabular-nums">
                                  {qty}
                                </span>
                                <button
                                  onClick={() => setQty(product.id, qty + 1)}
                                  className="px-2.5 py-1.5 text-ink/70 hover:text-ink"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                              <span className="ml-auto font-mono text-sm tabular-nums">
                                ₹{product.price * qty}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="px-8 pb-8 mt-auto">
                      <div className="border border-ink/12 rounded-lg px-5 py-4 flex items-center justify-between mb-5">
                        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/60">TOTAL</p>
                        <p className="font-display text-3xl tabular-nums">₹{totalPrice()}</p>
                      </div>
                      <button
                        onClick={() => setView("checkout")}
                        className="w-full rounded-full bg-wine text-cream py-4 font-mono text-[10px] uppercase tracking-[0.25em] hover:bg-winedeep transition-colors"
                      >
                        Proceed to Checkout →
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* ── CHECKOUT VIEW ── */}
            {view === "checkout" && (
              <motion.div
                key="checkout"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="px-8 py-6 flex flex-col gap-6"
              >
                {field("name", "Full Name", "Aanya Verma")}
                {field("email", "Email", "you@somewhere.in", "email")}
                {field("address", "Address", "House № 12, Sector 4")}
                {field("city", "City", "New Delhi")}
                {field("pin", "Pin Code", "110001")}

                <div className="border border-ink/12 rounded-lg px-5 py-4 flex items-center justify-between mt-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/60">TOTAL</p>
                  <p className="font-display text-3xl tabular-nums">₹{totalPrice()}</p>
                </div>

                <div className="space-y-3 pb-6">
                  <button
                    onClick={handleOrder}
                    className={`w-full rounded-full py-4 font-mono text-[10px] uppercase tracking-[0.25em] transition-all ${
                      allValid
                        ? "bg-wine text-cream hover:bg-winedeep"
                        : "bg-ink/10 text-ink/35 cursor-not-allowed"
                    }`}
                  >
                    Place Order
                  </button>
                  <button
                    onClick={() => setView("cart")}
                    className="w-full rounded-full border border-ink/20 text-ink py-3.5 font-mono text-[10px] uppercase tracking-[0.25em] hover:border-ink/40 transition-colors"
                  >
                    ← Back to Cart
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── CONFIRMED VIEW ── */}
            {view === "confirmed" && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col items-center justify-center px-8 py-20 text-center min-h-[60vh]"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-ember">
                  FIELD NOTE DISPATCHED
                </p>
                <h3 className="mt-4 font-display text-4xl text-ink leading-tight">
                  Your order is<br />
                  <span className="font-italic-display text-rust">on its way.</span>
                </h3>
                <p className="mt-5 font-serif text-base text-ink/70 leading-relaxed max-w-xs">
                  We&rsquo;ll send a confirmation to your email. Every Khoj jar ships with the field note.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-10 rounded-full bg-wine text-cream px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] hover:bg-winedeep transition-colors"
                >
                  Continue Exploring
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </aside>
    </>
  );
}

import { X, Minus, Plus } from "lucide-react";
import { useCart } from "../store/cart";

export function CartDrawer() {
  const { isOpen, close, items, setQty, totalPrice } = useCart();
  const list = Object.values(items);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-cream text-ink shadow-2xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-ink/10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
              Your Archive
            </p>
            <p className="font-display text-2xl">Cart</p>
          </div>
          <button onClick={close} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {list.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-display text-2xl">Your archive is empty.</p>
            <p className="mt-2 font-serif text-ink/60">
              Start collecting flavours across India.
            </p>
            <button
              onClick={close}
              className="mt-6 rounded-full bg-wine text-cream px-5 py-2.5 text-sm hover:bg-winedeep transition-colors"
            >
              Explore the Archive
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100%-89px)]">
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {list.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-display text-lg leading-tight">
                      {product.name}
                    </p>
                    <p className="text-xs text-ink/50 font-mono">
                      {product.origin}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center border border-ink/15 rounded-full">
                        <button
                          onClick={() => setQty(product.id, qty - 1)}
                          className="px-2 py-1"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-2 text-xs font-mono w-6 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => setQty(product.id, qty + 1)}
                          className="px-2 py-1"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <span className="ml-auto font-mono text-sm">
                        ₹{product.price * qty}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-ink/10 p-6">
              <div className="flex justify-between font-mono text-sm mb-4">
                <span className="uppercase tracking-widest text-ink/60">
                  Subtotal
                </span>
                <span className="tabular-nums">₹{totalPrice()}</span>
              </div>
              <button className="w-full rounded-full bg-wine text-cream py-3 text-sm hover:bg-winedeep transition-colors">
                Checkout →
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

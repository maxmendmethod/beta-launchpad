"use client";

import { useCart } from "@/contexts/CartContext";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";

function fmt(amount: string, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(parseFloat(amount));
}

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeItem, isLoading } = useCart();
  const lineCount = cart?.lines.reduce((s, l) => s + l.quantity, 0) ?? 0;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeCart}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-bold text-base">
            Your Cart{lineCount > 0 ? ` (${lineCount})` : ""}
          </h2>
          <button onClick={closeCart} className="p-1 rounded-md hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">
          {!cart || cart.lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-foreground/40">
              <ShoppingBag className="h-10 w-10" />
              <p className="text-sm font-bold">Your cart is empty</p>
            </div>
          ) : (
            cart.lines.map((line) => (
              <div key={line.id} className="flex gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold leading-tight">{line.merchandise.product.title}</p>
                  {line.sellingPlanAllocation && (
                    <p className="text-xs text-foreground/50 mt-0.5">
                      {line.sellingPlanAllocation.sellingPlan.name}
                    </p>
                  )}
                  <p className="text-xs text-foreground/40 mt-0.5">
                    {fmt(line.merchandise.price.amount, line.merchandise.price.currencyCode)} each
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <p className="text-sm font-bold">
                    {fmt(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        line.quantity > 1
                          ? updateQuantity(line.id, line.quantity - 1)
                          : removeItem(line.id)
                      }
                      disabled={isLoading}
                      className="w-6 h-6 flex items-center justify-center rounded border border-border hover:border-brand hover:text-brand disabled:opacity-40"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold">{line.quantity}</span>
                    <button
                      onClick={() => updateQuantity(line.id, line.quantity + 1)}
                      disabled={isLoading}
                      className="w-6 h-6 flex items-center justify-center rounded border border-border hover:border-brand hover:text-brand disabled:opacity-40"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => removeItem(line.id)}
                      disabled={isLoading}
                      className="ml-1 w-6 h-6 flex items-center justify-center rounded hover:text-red-500 disabled:opacity-40"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart && cart.lines.length > 0 && (
          <div className="border-t border-border px-5 py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Subtotal</span>
              <span className="text-sm font-bold">
                {fmt(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
              </span>
            </div>
            <p className="text-xs text-foreground/50">Taxes and shipping calculated at checkout</p>
            <a
              href={cart.checkoutUrl}
              className="block w-full rounded-md py-4 text-center text-base font-extrabold uppercase tracking-wide text-white bg-brand shadow-sm hover:bg-brand-hover hover:shadow-md transition-all"
            >
              Checkout
            </a>
          </div>
        )}
      </div>
    </>
  );
}

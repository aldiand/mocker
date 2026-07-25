/**
 * title: Product Detail
 * tags: tablet, product, detail, ecommerce
 * category: Product
 * device: tablet
 * order: 11
 */

import { ShoppingBag, Star, Heart, ArrowLeft, Check } from 'lucide-react';

export default function Detail() {
  return (
    <div className="flex h-full w-full flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border p-4">
        <button type="button" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Store
        </button>
        <div className="flex items-center gap-2 font-bold text-sm">
          <ShoppingBag className="h-4 w-4 text-primary" /> Store Catalog
        </div>
        <button type="button" className="p-2 rounded-full border border-border text-muted-foreground">
          <Heart className="h-4 w-4" />
        </button>
      </header>

      <main className="flex-1 grid grid-cols-2 gap-6 p-6">
        <div className="flex flex-col justify-center items-center rounded-2xl border border-border bg-card p-8">
          <div className="grid h-36 w-36 place-items-center rounded-2xl bg-primary/10 text-primary font-bold text-4xl">
            🎧
          </div>
        </div>

        <div className="flex flex-col justify-between py-2">
          <div>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">Audio Headphones</span>
            <h1 className="mt-3 text-2xl font-bold tracking-tight">Wireless Noise-Canceling Headphones</h1>
            <div className="mt-2 flex items-center gap-1 text-amber-500 text-xs font-medium">
              <Star className="h-3.5 w-3.5 fill-amber-500" /> 4.9 (128 reviews)
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Premium active noise cancellation, 30-hour battery life, and crystal-clear sound signature designed for studio professionals.
            </p>
            <div className="mt-4 text-2xl font-bold">$299.00</div>
          </div>

          <div className="space-y-3 pt-4">
            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition">
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
            <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-emerald-500" /> In stock · Free express shipping
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

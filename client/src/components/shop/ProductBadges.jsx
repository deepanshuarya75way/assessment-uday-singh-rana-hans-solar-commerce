import { Zap } from 'lucide-react';

export function ProductSaleBadge({
  saleDiscountPercent,
  label = 'Sale',
  size = 'sm',
}) {
  if (!saleDiscountPercent) {
    return null;
  }

  const classes =
    size === 'lg'
      ? 'px-3 py-1 text-sm'
      : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 font-bold uppercase tracking-wide text-white shadow-sm ${classes}`}
    >
      <Zap className={size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'} />
      {label} {saleDiscountPercent}% Off
    </span>
  );
}

export function ProductCardBadges({ product }) {
  const showSale = product.isOnSale && product.saleDiscountPercent;

  if (!showSale) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex items-start justify-end gap-2">
      <ProductSaleBadge saleDiscountPercent={product.saleDiscountPercent} />
    </div>
  );
}

export function ProductDetailBadges({ product }) {
  const showSale = product.isOnSale && product.saleDiscountPercent;

  if (!showSale) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <ProductSaleBadge
        saleDiscountPercent={product.saleDiscountPercent}
        size="lg"
      />
    </div>
  );
}

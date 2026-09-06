import { ShieldCheck, Zap } from 'lucide-react';

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

export function ProductSubsidyBadge({
  label = 'Government Subsidy',
  size = 'sm',
}) {
  const classes =
    size === 'lg'
      ? 'px-3 py-1 text-sm font-semibold tracking-normal'
      : 'px-2.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wide';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-sm ring-1 ring-emerald-500/20 ${classes}`}
    >
      <ShieldCheck className={size === 'lg' ? 'h-4 w-4 text-emerald-100 shrink-0' : 'h-3 w-3 text-emerald-100 shrink-0'} />
      <span>{label}</span>
    </span>
  );
}

export function ProductCardBadges({ product }) {
  const showSale = Boolean(product?.isOnSale && product?.saleDiscountPercent);
  const showSubsidy = Boolean(product?.isSubsidy || product?.isGovernmentSubsidy);

  if (!showSale && !showSubsidy) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap items-start justify-end gap-1.5 sm:gap-2">
      {showSubsidy && <ProductSubsidyBadge label="Government Subsidy" />}
      {showSale && <ProductSaleBadge saleDiscountPercent={product.saleDiscountPercent} />}
    </div>
  );
}

export function ProductDetailBadges({ product }) {
  const showSale = Boolean(product?.isOnSale && product?.saleDiscountPercent);
  const showSubsidy = Boolean(product?.isSubsidy || product?.isGovernmentSubsidy);

  if (!showSale && !showSubsidy) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {showSubsidy && (
        <ProductSubsidyBadge
          label="Government Subsidy Product"
          size="lg"
        />
      )}
      {showSale && (
        <ProductSaleBadge
          saleDiscountPercent={product.saleDiscountPercent}
          size="lg"
        />
      )}
    </div>
  );
}

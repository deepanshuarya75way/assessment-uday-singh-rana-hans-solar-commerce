import { Link } from 'react-router-dom';
import { ArrowLeft, Grid3X3, Package, ShoppingBag, Sparkles, Sun } from 'lucide-react';
import CategoryDescription from '@/components/shop/CategoryDescription';

export default function CategoryHero({ category, festival, productCount }) {
  if (festival) {
    return (
      <section className="relative overflow-hidden border-b border-solar-100 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900">
        <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-solar-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/"
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-solar-100 backdrop-blur-sm transition hover:bg-white/10 sm:text-sm"
            >
              <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Back to Home
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-solar-100 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-solar-300" />
              {festival.name}
            </span>
            {productCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-solar-600 px-3 py-1 text-[11px] font-semibold text-white shadow-sm shadow-solar-600/20">
                <Sun className="h-3.5 w-3.5" />
                {productCount} deal{productCount === 1 ? '' : 's'}
              </span>
            )}
          </div>
          <h1 className="mt-3 max-w-3xl text-2xl font-bold tracking-tight text-white sm:mt-4 sm:text-3xl lg:text-4xl lg:leading-tight">
            {festival.title}
          </h1>
          {festival.description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-300 sm:mt-3 sm:text-base lg:text-lg">
              {festival.description}
            </p>
          )}
        </div>
      </section>
    );
  }

  if (!category) {
    return (
      <section className="relative overflow-hidden border-b border-solar-100 bg-gradient-to-br from-solar-50 via-white to-emerald-50/60">
        <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-solar-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-solar-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-solar-700 shadow-sm">
              <ShoppingBag className="h-3.5 w-3.5" />
              HANS Solar Shop
            </span>
            {productCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-solar-600 px-3 py-1 text-[11px] font-semibold text-white shadow-sm shadow-solar-600/20">
                <Sun className="h-3.5 w-3.5" />
                {productCount} products
              </span>
            )}
          </div>
          <h1 className="mt-3 max-w-3xl text-2xl font-bold tracking-tight text-charcoal sm:mt-4 sm:text-3xl lg:text-4xl lg:leading-tight">
            Premium Solar Products
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal-light sm:mt-3 sm:text-base lg:text-lg">
            Browse panels, inverters, batteries and complete solar solutions for
            homes, businesses and industries.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div className="absolute inset-0">
        {category.image ? (
          <img
            src={category.image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-solar-100 via-white to-emerald-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/90 to-white/78 lg:from-white/94 lg:via-white/82 lg:to-white/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-9">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/shop"
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-solar-200 bg-white/95 px-3 py-1.5 text-xs font-medium text-solar-700 shadow-sm backdrop-blur-sm transition hover:border-solar-300 hover:bg-solar-50 sm:text-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            All Products
          </Link>
          <Link
            to="/shop/categories"
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm transition hover:border-solar-200 hover:text-solar-700 sm:text-sm"
          >
            <Grid3X3 className="h-3.5 w-3.5" />
            Categories
          </Link>
          {productCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-solar-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm sm:text-xs">
              <Package className="h-3.5 w-3.5" />
              {productCount} products
            </span>
          )}
        </div>

        <div className="mt-3.5 max-w-2xl sm:mt-4 lg:max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-solar-200 bg-solar-50/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-solar-700 backdrop-blur-sm sm:text-xs">
            <Grid3X3 className="h-3.5 w-3.5" />
            Product Category
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-charcoal sm:mt-2.5 sm:text-3xl lg:text-4xl lg:leading-tight">
            {category.name}
          </h1>
          <CategoryDescription
            description={category.description}
            className="mt-2 sm:mt-3"
          />
        </div>
      </div>
    </section>
  );
}

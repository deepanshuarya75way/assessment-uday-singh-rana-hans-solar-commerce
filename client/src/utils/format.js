export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export const getDiscountedPrice = (price, discountPercent) =>
  Math.round(Number(price) * (1 - Number(discountPercent) / 100));

export const getNormalProductPricing = (product) => {
  if (product.isOnSale && product.saleDiscountPercent > 0) {
    return {
      originalPrice: product.price,
      salePrice: getDiscountedPrice(product.price, product.saleDiscountPercent),
      discountPercent: product.saleDiscountPercent,
      type: 'normal',
    };
  }

  return {
    originalPrice: product.price,
    salePrice: product.price,
    discountPercent: 0,
    type: null,
  };
};

export const getEffectiveProductPricing = (product) => getNormalProductPricing(product);

export const getAmountSaved = (pricing) =>
  pricing.discountPercent > 0 ? pricing.originalPrice - pricing.salePrice : 0;

export const getProductSubsidyPricing = (product) => {
  if (!product) {
    return {
      originalPrice: 0,
      normalDiscountAmount: 0,
      normalDiscountPercent: 0,
      priceAfterDiscount: 0,
      subsidyDiscount: 0,
      priceBeforeGst: 0,
      gstEnabled: false,
      gstPercentage: 0,
      gstAmount: 0,
      finalPrice: 0,
      totalSavings: 0,
      isSubsidy: false,
      hasSubsidyDiscount: false,
      hasNormalDiscount: false,
    };
  }

  const normalPricing = getNormalProductPricing(product);
  const isSubsidy = Boolean(product.isGovernmentSubsidy || product.isSubsidy);
  const rawSubsidy = Number(product.subsidyDiscount);
  const subsidyDiscount = isSubsidy && Number.isFinite(rawSubsidy)
    ? Math.max(0, rawSubsidy)
    : 0;

  const originalPrice = normalPricing.originalPrice;
  const priceAfterDiscount = normalPricing.salePrice;
  const normalDiscountAmount = Math.max(0, originalPrice - priceAfterDiscount);
  const priceBeforeGst = Math.max(0, priceAfterDiscount - subsidyDiscount);

  const gstPricing = getGstPricing(
    priceBeforeGst,
    product.gstEnabled,
    product.gstPercentage,
  );

  const gstAmount = Math.round(gstPricing.gstAmount);
  const finalPrice = priceBeforeGst + gstAmount;
  const totalSavings = normalDiscountAmount + subsidyDiscount;
  const hasSubsidyDiscount = isSubsidy && subsidyDiscount > 0;
  const hasNormalDiscount = normalDiscountAmount > 0;

  return {
    originalPrice,
    normalDiscountAmount,
    normalDiscountPercent: normalPricing.discountPercent,
    priceAfterDiscount,
    subsidyDiscount,
    priceBeforeGst,
    gstEnabled: gstPricing.gstEnabled,
    gstPercentage: gstPricing.gstPercentage,
    gstAmount,
    finalPrice,
    totalSavings,
    isSubsidy,
    hasSubsidyDiscount,
    hasNormalDiscount,
  };
};

export const getGstPricing = (basePrice, gstEnabled, gstPercentage) => {
  const price = Number(basePrice) || 0;
  const enabled = Boolean(gstEnabled);
  const percent =
    enabled && Number.isFinite(Number(gstPercentage))
      ? Number(gstPercentage)
      : 0;
  const gstAmount = enabled ? (price * percent) / 100 : 0;

  return {
    gstEnabled: enabled,
    gstPercentage: enabled ? percent : 0,
    gstAmount,
    finalPrice: price + gstAmount,
  };
};

export const stripMediaUrl = (url) => {
  if (!url) {
    return '';
  }

  if (url.startsWith('/uploads/')) {
    return url.split('?')[0];
  }

  if (url.includes('res.cloudinary.com')) {
    const cleanUrl = url.split('?')[0];
    return cleanUrl.replace(/\/upload\/(?:(?!v\d+\/)[^/]+\/)+/, '/upload/');
  }

  try {
    const parsed = new URL(url);
    return parsed.pathname.startsWith('/uploads/')
      ? parsed.pathname
      : `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url.split('?')[0];
  }
};

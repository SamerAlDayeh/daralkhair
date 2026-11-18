export const hasBookPrice = (book) => {
  const price = book?.originalPrice ?? book?.price;
  return (
    price !== undefined &&
    price !== null &&
    price !== "" &&
    Number.isFinite(Number(price))
  );
};

export const applyBookDiscount = (book) => {
  const originalPriceValue = book.originalPrice ?? book.price;
  const requestedDiscount = Number(book.discountPercent);
  const discountPercent = Number.isFinite(requestedDiscount)
    ? Math.max(50, Math.min(requestedDiscount, 100))
    : 50;

  if (!hasBookPrice(book)) {
    return { ...book, isOffer: true, discountPercent };
  }

  const originalPrice = Number(originalPriceValue);

  return {
    ...book,
    originalPrice,
    price: Number((originalPrice * (1 - discountPercent / 100)).toFixed(2)),
    discountPercent,
    isOffer: true,
  };
};

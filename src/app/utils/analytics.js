export const logEvent = (eventName, metadata = {}) => {
  const event = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...metadata,
  };

  console.log('📊 ANALYTICS EVENT:', event);
};

// Product viewed
export const logProductViewed = (productId, productName) => {
  logEvent('product_viewed', {
    productId,
    productName,
  });
};

// Add to cart
export const logAddToCart = (productId, productName, quantity) => {
  logEvent('add_to_cart', {
    productId,
    productName,
    quantity,
  });
};

// Search performed
export const logSearchPerformed = (searchTerm, resultCount) => {
  logEvent('search_performed', {
    searchTerm,
    resultCount,
  });
};

// App backgrounded
export const logAppBackgrounded = () => {
  logEvent('app_backgrounded');
};
export const setPublicJsonCache = (res) => {
  // Use no-cache, must-revalidate so browsers always check with server using ETag.
  // When data is unchanged, server immediately returns 304 Not Modified.
  // When admin creates/updates data, the client receives fresh data immediately.
  res.set('Cache-Control', 'no-cache, must-revalidate');
};

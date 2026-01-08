export const GA_TRACKING_ID = "G-S76CW82F5L";

// Standard pageview tracking
export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

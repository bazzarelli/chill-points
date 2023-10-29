declare global {
  interface Window {
    gtag: any;
  }
}

type Event = {
  action: string;
  params: { [key: string]: number | string };
};

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// log the pageview with their URL
export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }: Event) => {
  window.gtag("event", action, params);
};

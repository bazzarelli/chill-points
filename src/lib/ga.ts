declare global {
  interface Window {
    gtag: any;
  }
}

// log the pageview with their URL
export const pageview = (url: string) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  });
};

type Event = {
  action: string;
  params: { [key: string]: number | string };
};

// log specific events happening.
export const event = ({ action, params }: Event) => {
  window.gtag("event", action, params);
};

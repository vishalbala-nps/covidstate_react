const base = "https://covidstatein.github.io/api";

const apiUrls = {
  historical:      `${base}/HistoricalData.json`,
  contacts:        `${base}/contacts.json`,
  faqs:            `${base}/faqs.json`,
  messages:        `${base}/messages.json`,
  stateHistorical: (state) => `${base}/${state.replace(/\s+/g, '')}HistoricalData.json`,
};

export default apiUrls;

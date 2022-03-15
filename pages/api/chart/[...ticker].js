export default async function handler(req, res) {
  const { ticker, range, region, lang, interval } = req.query;

  const APIlink = `https://yfapi.net/v8/finance/chart/${ticker}?range=${range}&region=${region}&interval=${interval}&lang=${lang}`;

  const options = {
    headers: {
      accept: "application / json",
      "X-API-KEY": process.env.API_KEY,
    },
  };

  async function fetchData() {
    const response = await fetch(APIlink, options);
    const data = await response.json();

    res.status(200).json(data);
  }

  await fetchData();
}

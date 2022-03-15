export default async function handler(req, res) {
  const { symbols } = req.query;

  const APIlink = `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbols}`;

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

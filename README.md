# Stocks Watchlist

### A simple dashboard for following your favorite stocks.

Live demo | [Stocks Watchlist](https://stocks-watchlist-ritwaldev.vercel.app/)

# How to use

You will need to sign up for a Yahoo Finance API account to get your API keys, then clone this repo and create a .env.local file and add the following key:

API_KEY= "YOUR-API-KEY-HERE"

# Note

Yahoo API free account limit is 100 requests per day. If you don't get charts data in the demo site, its probably because this limit has been exceeded.

# On road map

This is a list of features I would like to add to the app. If you would like to work on any feature, or want to add your own features, you are welcome to submit a pull request.

- Add WebSocket for real quote and chart updates. Tips: look into wss://streamer.finance.yahoo.com

- Add feature to persist watch list. options:

  A- Add tickers in watch list as url params and load watch list base on query params. This will make watch lists easier to share. Maybe also add a share wash list button that copies current url.

  B- Sign-up .. Not preferable

- Scrolling on mobile is currently awkward. Charts takes up most of the screen and user can't scroll page while touching chart.

- Yahoo Finance API only allows for 100 requests / day for the free tier which causes Demo site to be down more often than not. Consider switching to another more forgiving API, or upgrade membership for Demo site.

# Credits

By [ritwal](https://www.ritwal.com)

Built with React.js | Next.js | Bootstrap 5 | Lrightweight-charts

Data source Yahoo Finance API

import { Request, Response } from 'express';
import { Stock } from '../models/stock';
import axios from 'axios'

const JSON_PLACEHOLDER_API = 'https://www.sec.gov/files/company_tickers_exchange.json'
const USER_AGENT = "Afzal Ali (afzalali2728@gmail.com)"

let stocksByTicker: Record<string, Stock> | null = null;  // In-memory storage for stocks
const tickerAccessFrequency: Record<string, number> = {};

// Hepler: Fetch stocks from an external API
export const fetchStocks = async () => {
  try {
    const response = await axios.get(JSON_PLACEHOLDER_API, {
      headers: {
        'User-Agent': USER_AGENT
      }
    });
    const fields = response.data.fields;
    const data = response.data.data;
    stocksByTicker = data.reduce((acc: Record<string, Stock>, stockData: any[]) => {
      const stock: Stock = {
        cik: stockData[fields.indexOf('cik')],
        name: stockData[fields.indexOf('name')],
        ticker: stockData[fields.indexOf('ticker')],
        exchange: stockData[fields.indexOf('exchange')]
      };
      acc[stock.ticker] = stock;
      return acc;
    }, {});
  } catch (err: any) {
    console.error(`Unable to fetch stocks: ${err.message || err.response?.message}`);
    throw err;
  }
}

// Get ticker info
export const getStockByTicker = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!stocksByTicker) {
      await fetchStocks();
    }
    const { ticker } = req.params;
    const stock = stocksByTicker ? stocksByTicker[ticker] : null;
    if (stock) {
      tickerAccessFrequency[ticker] = (tickerAccessFrequency[ticker] || 0) + 1;
      res.json(stock);
    } else {
      res.status(404).json({ message: 'Stock not found' });
    }
  } catch (err: any) {
    res.status(500).send(`Unable to fetch stock: ${err.message || err.response?.message}`);
  }
};

// Get tickers access frequency
export const getStockAccessFrequency = (req: Request, res: Response): void => {
  res.json(tickerAccessFrequency);
};

// Ticker access summary
export const stockAccessSummary = (_req: Request, res: Response): void => {
  res.render('stocks/dashboard', { tickerAccessFrequency });
};

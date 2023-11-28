import axios from "axios";
import * as Bitquery from "./components/callBitquery";
const BITQUERY_API = "your key";

// function adjustExtremeValues(high, low, open, close, threshold) {
//   const maxAllowedHigh = Math.max(open, close) * threshold;
//   const minAllowedLow = Math.min(open, close) / threshold;

//   return {
//     adjustedHigh: high > maxAllowedHigh ? maxAllowedHigh : high,
//     adjustedLow: low < minAllowedLow ? minAllowedLow : low,
//   };
// }

export const getBars = async (
  symbolInfo,
  resolution,
  periodParams,
  onHistoryCallback,
  onErrorCallback
) => {
  try {
  
    const fromTime = new Date(periodParams.from * 1000).toISOString();
    const toTime = new Date(periodParams.to * 1000).toISOString();
    console.log("fromTime:", fromTime);
    console.log("toTime:", toTime);
    const requiredBars = 302
    console.log("requiredBars", requiredBars);

    const bars = new Array(periodParams.countBack + 1);
    let time = new Date(periodParams.to * 1000);
    time.setUTCHours(0);
    time.setUTCMinutes(0);
    time.setUTCMilliseconds(0);

    // Fetch data based on periodParams
    const response = await axios.post(
      Bitquery.endpoint,
      {
        query: Bitquery.TOKEN_DETAILS, // query for daily candles
      
        mode: "cors",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": BITQUERY_API,
        },
      }
    );

    console.log("response ", response);
    for (let i = 302; i > -1; i--) {
      const data = response.data.data.EVM.DEXTradeByTokens[i];

      if (data) {
        // Convert prices and apply threshold check
        const open = Number(data.Trade.open.toFixed(18));
        const close = Number(data.Trade.close.toFixed(18));
        let high = Number(data.Trade.high.toFixed(18));
        let low = Number(data.Trade.low.toFixed(18));
        const resdate = new Date(data.Block.Time);
     
        // // Adjust extreme high/low values - there might be a better way but removing these allows the chart to render correctly
        // const { adjustedHigh, adjustedLow } = adjustExtremeValues(
        //   high,
        //   low,
        //   open,
        //   close,
        //   1.005
        // ); // 1.5 is an example threshold

        bars[i] = {
          // time: time.getTime(),
          time: resdate,
          open: open,
          high: high,
          low: low,
          close: close,
          volume: data.Trade.volume,
        };
      } else {
        // Set default empty bar - if the token is new and doesn't have enough bars to fill the periodParams.countBack bars
        bars[i] = {
          time: time.getTime(),
         
          open: 0,
          high: 0,
          low: 0,
          close: 0,
          volume: 0,
        };
      }

      time.setUTCDate(time.getUTCDate() - 1);
    }


    if (bars.length === 0) {
      onHistoryCallback([], { noData: true });
    } else {
      onHistoryCallback(bars, { noData: false });
    }
  } catch (err) {
    console.error(err);
    onErrorCallback(err);
  }
};

export const subscribeBars = (
  symbolInfo,
  resolution,
  onRealtimeCallback,
  subscriberUID,
  onResetCacheNeededCallback
) => {
  // console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
  // Implement your subscription logic here 
};

export const unsubscribeBars = (subscriberUID) => {
  // console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
  // Implement your unsubscription logic here
};

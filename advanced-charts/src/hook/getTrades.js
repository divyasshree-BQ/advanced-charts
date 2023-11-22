import { useState, useEffect } from 'react';
import { tradeClient, TOKEN_DETAILS, TOKEN_DETAILS } from '../components/callBitquery';

const BITQUERY_API = "your key";

const useTradeSubscription = () => {
  const [latestTrade, setLatestTrade] = useState(null);
  const [error, setError] = useState(null);
  console.log("useTradeSubscription")
  useEffect(() => {
    let isActive = true;
    const unsubscribe = tradeClient.subscribe(
      { 
        query: TOKEN_DETAILS, 
        headers: {
          "X-API-KEY": BITQUERY_API
        }
      },
      {
        next(data) {
          console.log("useTradeSubscription data",data )
          if (!isActive) return;
          // console.log('Subscription data:', data);
          setLatestTrade(data);
        },
        error(err) {
          setError(err);
          console.error('Subscription error:', err);
        },
        complete() {
          // console.log('Subscription complete');
        },
      }
    );

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, []);
  console.log("latestTrade ",latestTrade)
  return { latestTrade, error };
};

export default useTradeSubscription;

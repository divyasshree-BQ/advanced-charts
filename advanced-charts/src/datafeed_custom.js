import { onReady } from './onReady';
import { resolveSymbol } from './resolveSymbol';
import { getBars, subscribeBars, unsubscribeBars } from './getBars';

const Datafeed = {
  onReady,
  resolveSymbol,
  getBars,
  subscribeBars, 
  unsubscribeBars,
};

export default Datafeed;

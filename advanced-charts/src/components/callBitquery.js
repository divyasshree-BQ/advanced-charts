export const endpoint = "https://streaming.bitquery.io/graphql";

export const TOKEN_DETAILS = `
{
  EVM(network: eth, dataset: combined) {
    DEXTradeByTokens(
      orderBy: {ascending: Block_Time}
      where: {Trade: {Currency: {SmartContract: {is: "0xdac17f958d2ee523a2206206994597c13d831ec7"}}, Side: {Currency: {SmartContract: {is: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}}}}}
      limit: {count: 302}
    ) {
      Block {
        Time(interval: {in: minutes})
      }
      volume: sum(of: Trade_Amount)
      Trade {
        high: Price(maximum: Trade_Price)
        low: Price(minimum: Trade_Price)
        open: Price(minimum: Block_Number)
        close: Price(maximum: Block_Number)
      }
      count
    }
  }
}

  `;

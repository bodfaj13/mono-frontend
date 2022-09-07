export interface transactionInterface {
  _id: string,
  type: string,
  amount: string,
  narration: boolean,
  date: string,
  balance: string,
  currency: string,
  category: string,
}

export type transactionList = transactionInterface[]
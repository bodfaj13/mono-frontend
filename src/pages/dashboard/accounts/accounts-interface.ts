export interface accountInterface {
  _id: string,
  userId: string,
  accountId: string,
  isLinked: boolean,
  dataStatus: string,
  authMethod: string,
  accountName: string,
  currency: string,
  accountType: string,
  accountNumber: string,
  balance: number,
  bvn: string,
  bankName: string,
  bankCode: string,
  bankType: string,
  dateLinked: number
}

export type accountList = accountInterface[]
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { message, Table } from 'antd'
import { getAccountTransactions } from '../../../api/accounts';
import { commaNumber } from '../../../utils/helpers';
import moment from 'moment';
import { transactionInterface, transactionList } from './transaction-interface';
import { useParams } from 'react-router-dom';
import { accountInterface } from '../accounts/accounts-interface';


const Transactions = () => {
  const { accountId } = useParams()

  const [transactions, setTransactions] = useState<transactionList>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [accountDetails, setAccountDetails] = useState<accountInterface | null>(null)

  const request = useMemo(() => {
    return {
      size: pageSize,
      page: currentPage,
    }
  }, [pageSize, currentPage])


  const columns = [
    {
      title: 'AMOUNT (NGN)',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: number, record: any) => {
        return (
          <span>
            {commaNumber(Number(text / 100).toFixed(2))}
          </span>
        )
      }
    },
    {
      title: 'BALANCE (NGN)',
      dataIndex: 'balance',
      key: 'balance',
      render: (text: number, record: any) => {
        return (
          <span>
            {commaNumber(Number(text / 100).toFixed(2))}
          </span>
        )
      }
    },
    {
      title: 'NARRATION',
      dataIndex: 'narration',
      key: 'narration',
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
      render: (text: any, record: any) => {
        return (
          <span>
            {moment(text).format('YYYY-MM-DD')}
          </span>
        )
      }
    }
  ]

  /**
 * Table pagination
 * @param pagination 
 * @param filters 
 * @param sorter 
 */
  const handlePagination = (pagination: any, filters: any, sorter: any) => {
    const { current, pageSize } = pagination
    setCurrentPage(current)
    setPageSize(pageSize)
  };


  const getTransactions = useCallback(
    async () => {
      if (accountId !== '' && accountId !== undefined) {
        setLoading(true)

        try {
          const res = await getAccountTransactions(accountId || '', {
            ...request
          })

          setLoading(false)

          const { totalContent, content, accountDetails } = res.data.data

          setTotal(totalContent)
          setTransactions(content)
          setAccountDetails(accountDetails)


        } catch (error: any) {
          setLoading(false)
          if (error?.response?.data) {
            const errorMessage = error?.response?.data?.message
            message.error(errorMessage)
          } else {
            message.error("Something went wrong.")
          }
        }
      }
    },
    [request, accountId],
  )


  useEffect(() => {
    getTransactions()

  }, [getTransactions])



  return (
    <div className="transactions-main">
      <div className="content-top">
        <div className="info">
          <h1>Account Transactions</h1>
          <span>
            List of linked bank account transactions
          </span>
        </div>
      </div>

      <div className="table-holder">
        <ul>
          <li>
            <b>Account Name</b>: {accountDetails?.accountName}
          </li>
          <li>
            <b>Account Number</b>: {accountDetails?.accountNumber}
          </li>
          <li>
            <b>Balance</b>: {
              accountDetails?.balance
                ?
                ` NGN ${commaNumber(Number(accountDetails?.balance / 100))}` :
                null
            }
          </li>
          <li>
            <b>Bank Name</b>: {accountDetails?.bankName}
          </li>
        </ul>

        <Table
          loading={loading}
          columns={columns}
          dataSource={transactions}
          rowKey={(item: transactionInterface) => item._id}
          pagination={{
            current: currentPage,
            pageSize,
            total
          }}
          onChange={handlePagination}
          size="small"
          scroll={{ x: 600 }}
        />
      </div>
    </div>
  )
}

export default Transactions
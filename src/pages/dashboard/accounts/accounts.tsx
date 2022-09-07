import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { Button, message, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { accountInterface, accountList } from './accounts-interface';
import { getLinkedAccounts, linkAccount, unLinkBankAccount } from '../../../api/accounts';
import appDetails from '../../../appdetails';
import { commaNumber, openNotificationWithIcon } from '../../../utils/helpers';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Accounts = () => {
  const navigate = useNavigate()

  const [accounts, setAccounts] = useState<accountList>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [unlinking, setUnlinking] = useState(false)
  const [currentId, setCurrentId] = useState('')

  const request = useMemo(() => {
    return {
      size: pageSize,
      page: currentPage,
    }
  }, [pageSize, currentPage])


  const unLinkAccount = async (currentId: string, accountId: string) => {
    setUnlinking(true)
    setCurrentId(currentId)

    try {
      await unLinkBankAccount(currentId, accountId)

      setUnlinking(false)
      setCurrentId('')

      openNotificationWithIcon('success', "Unlink Account", "Account has been unliked successfully")


      getAccounts()
    } catch (error) {
      setUnlinking(false)
      message.error('Something went wrong')
    }
  }


  const columns = [
    {
      title: 'ACCOUNT NAME',
      dataIndex: 'accountName',
      key: 'accountName',
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
      title: 'ACCOUNT TYPE',
      dataIndex: 'accountType',
      key: 'accountType',
    },
    {
      title: 'ACCOUNT NUMBER',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
    },
    {
      title: 'BANK NAME',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: 'DATE LINKED',
      dataIndex: 'dateLinked',
      key: 'dateLinked',
      render: (text: any, record: any) => {
        return (
          <span>
            {moment(text).format('YYYY-MM-DD')}
          </span>
        )
      }
    },
    {
      title: 'ACTION',
      dataIndex: '',
      key: '',
      render: (text: any, record: any) => {
        return (
          <Button
            disabled={loading || unlinking}
            loading={unlinking && currentId === record._id}
            className={`purple-btn raised-btn smaller-btn ${loading || unlinking ? 'grey-btn' : ''}`}
            onClick={() => {
              unLinkAccount(record._id, record.accountId)
            }}
          >
            Unlink
          </Button>
        )
      }
    },
    {
      title: 'VIEW',
      dataIndex: '',
      key: '',
      render: (text: any, record: any) => {
        return (
          <Button
            disabled={loading || unlinking}
            className={`purple-btn raised-btn smaller-btn ${loading || unlinking ? 'grey-btn' : ''}`}
            onClick={() => {
              navigate(`/dashboard/transactions/${record.accountId}`)
            }}
          >
            View Transactions
          </Button>
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


  const getAccounts = useCallback(
    async () => {
      setLoading(true)
      try {
        const res = await getLinkedAccounts({
          ...request
        })

        setLoading(false)

        const { totalContent, content } = res.data.data

        setTotal(totalContent)
        setAccounts(content)

      } catch (error: any) {
        setLoading(false)
        if (error?.response?.data) {
          const errorMessage = error?.response?.data?.message
          message.error(errorMessage)
        } else {
          message.error("Something went wrong.")
        }
      }
    },
    [request],
  )

  const linkBankAccount = useCallback(
    async (code: string) => {
      setLoading(true)
      try {
        await linkAccount(code)

        openNotificationWithIcon('success', "Account Linked", "Account linked successfully")

        getAccounts()

      } catch (error: any) {
        setLoading(false)
        if (error?.response?.data) {
          const errorMessage = error?.response?.data?.message
          message.error(errorMessage)
        } else {
          message.error("Something went wrong.")
        }
      }
    },
    [getAccounts],
  )


  useEffect(() => {
    getAccounts()

  }, [getAccounts])


  useEffect(() => {
    // var window: any;
    if (window !== undefined) {
      var connect: any;
      var config = {
        key: appDetails.REACT_APP_MONO_PUBLIC_KEY,
        onSuccess: (response: any) => {
          linkBankAccount(response.code)
        },
        onClose: () => {
          // console.log('user closed the widget.')
        }
      }
      connect = new (window as any).Connect(config)
      connect.setup();
      var launch: any = document.getElementById('launch-btn')
      if (launch) {
        launch.onclick = (e: any) => {
          connect.open();
        }
      }
    }
  }, [linkBankAccount])

  return (
    <div className="accounts-main">
      <div className="content-top">
        <div className="info">
          <h1>Linked Accounts</h1>
          <span>
            List of linked bank accounts
          </span>
        </div>

        <div className="action">
          <Button className="purple-btn small-btn raised-btn" id="launch-btn">
            <PlusOutlined />  Link Account
          </Button>
        </div>
      </div>

      <div className="table-holder">
        <Table
          loading={loading}
          columns={columns}
          dataSource={accounts}
          rowKey={(item: accountInterface) => item._id}
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

export default Accounts
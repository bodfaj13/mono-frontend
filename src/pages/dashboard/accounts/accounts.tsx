import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { Button, message, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { accountInterface, accountList } from './accounts-interface';
import { getLinkedAccounts, linkAccount } from '../../../api/accounts';
import appDetails from '../../../appdetails';
import { openNotificationWithIcon } from '../../../utils/helpers';

const Accounts = () => {
  const [accounts, setAccounts] = useState<accountList>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  const request = useMemo(() => {
    return {
      size: pageSize,
      page: currentPage,
    }
  }, [pageSize, currentPage])


  const columns = [
    {
      title: 'ACCOUNT NAME',
      
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

      } catch (error) {
        setLoading(false)
        message.error('Something went wrong')
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

      } catch (error) {
        setLoading(false)
        message.error('Something went wrong')
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
    <div className="accoints-main">
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
        />
      </div>
    </div>
  )
}

export default Accounts
import React, { useState } from 'react'
import { Button, message, Popconfirm } from 'antd'
import { removeAccount } from '../../../api/userauth';
import { openNotificationWithIcon } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../core/actions/useractions/useractions';

const Settings = () => {
  const navigate = useNavigate()
  const dispatch: any = useDispatch()

  const [loading, setLoading] = useState(false)

  const deleteAccount = async () => {
    setLoading(true)
    try {
      await removeAccount()

      setLoading(true)

      openNotificationWithIcon("success", "Delete Account", "Account deleted successfully")

      dispatch(logoutUser())

      navigate('/')
    } catch (error: any) {
      setLoading(false)
      if (error?.response?.data) {
        const errorMessage = error?.response?.data?.message
        message.error(errorMessage)
      } else {
        message.error("Something went wrong.")
      }
    }
  };

  return (
    <div className="settings-main">
      <div className="content-top">
        <div className="info">
          <h1>Settings</h1>
          <span>
            You can delete account
          </span>
        </div>
      </div>

      <div className="delete-holder">
        <Popconfirm
          title="Are you sure you want to delete this account?"
          onConfirm={() => {
            deleteAccount()
          }}
          okButtonProps={{
            className: "purple-btn raised-btn smaller-btn"
          }}
          cancelButtonProps={{
            className: "purple-btn raised-btn smaller-btn"
          }}
        >
          <Button
            loading={loading}
            disabled={loading}
            className={`purple-btn raised-btn ${loading ? 'grey-btn' : ''}`}
          >
            Delete Account
          </Button>
        </Popconfirm>
      </div>
    </div>
  )
}

export default Settings
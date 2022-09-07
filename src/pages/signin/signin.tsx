import React, { useState } from 'react'
import Outerpage from '../../components/theme/outerpage/outerpage'
import { Alert, Button, Form, message } from 'antd'
import Textinput from '../../components/theme/textinput/textinput'
import Passowrdinput from '../../components/theme/passowrdinput/passowrdinput'
import { useNavigate } from 'react-router-dom'
import { userSigninPayload } from '../../api/userauth/userauth-interface'
import { signin } from '../../api/userauth'
import { openNotificationWithIcon } from '../../utils/helpers'
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../core/actions/useractions/useractions'

const Signin = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch: any = useDispatch()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  /**
* Update the form instance with it appropriate  values
* @param name string
* @param value string
*/
  const updateField = (name: string, value: string) => {
    form.setFields([
      {
        name,
        value,
        errors: []
      }
    ])
  }

  /**
 * Submits the form
 * @param values Object
 */
  const onFinish = async (values: userSigninPayload) => {
    setLoading(true)
    setError(null)

    try {
      const res = await signin(values)

      setLoading(false)

      const { token, refreshToken } = res.data.data

      const { data, exp }: any = jwt_decode(token)

      dispatch(loginUser({
        token,
        refreshToken,
        exp,
        user: data,
        success: true,
      }))

      navigate('/dashboard')

      openNotificationWithIcon('success', 'Log in Successful')
    } catch (error: any) {
      setLoading(false)
      if (error?.response?.data) {
        const errorMessage = error?.response?.data?.message
        setError(errorMessage)
      } else {
        message.error("Something went wrong.")
      }
    }
  }

  return (
    <div className="signin">
      <Outerpage
        infoText="Securely login to your account"
      >
        {
          error !== null &&
          <div className="error-holder">
            <Alert
              message={error}
              type="error"
              closable
              onClose={() => {
                setError(null)
              }}
            />
          </div>
        }

        <div className="signin-form">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Invalid Email',
                },
                {
                  required: true,
                  message: 'Input is required'
                },
              ]}
            >
              <Textinput
                placeHolder="Email"
                name="email"
                updateField={updateField}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Input is required'
                },
              ]}
            >
              <Passowrdinput
                placeHolder="Passoword"
                name="password"
                updateField={updateField}
              />
            </Form.Item>
            <Form.Item>
              <Button
                block
                htmlType="submit"
                loading={loading}
                disabled={loading}
                className={`purple-btn raised-btn ${loading ? 'grey-btn' : ''}`}
              >
                LOG IN
              </Button>
            </Form.Item>
          </Form>

          <p className="text-extra">
            Don’t have an account? <a href="/signup" onClick={(e) => {
              e.preventDefault();
              navigate('/signup')
            }}>Sign up </a>
          </p>
        </div>
      </Outerpage>
    </div>
  )
}

export default Signin
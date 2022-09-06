import React, { useState } from 'react'
import Outerpage from '../../components/theme/outerpage/outerpage'
import { Button, Form, Row, Col, message } from 'antd'
import Textinput from '../../components/theme/textinput/textinput'
import Passowrdinput from '../../components/theme/passowrdinput/passowrdinput'
import { userSignupPayload } from '../../api/userauth/userauth-interface'
import { useNavigate } from 'react-router-dom'
import { openNotificationWithIcon, validatePassword } from '../../utils/helpers'
import { signup } from '../../api/userauth'

const Signup = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })


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

    setErrors(prevState => ({
      ...prevState,
      [name]: ''
    }))
  }

  /**
   * Submits the form
   * @param values Object
   */
  const onFinish = async (values: userSignupPayload) => {
    const { password } = values

    setLoading(true)
    const newErrors = { ...errors }

    newErrors['email'] = ''
    newErrors['password'] = ''

    if (!validatePassword(password)) {
      newErrors['password'] = 'Password must contain minimun of eight characters, at least one uppercase letter, one lonwercase letter, one number and one special character'
    } else {
      newErrors['password'] = ''
    }

    setErrors(prevState => ({
      ...prevState,
      ...newErrors,
    }))

    if (Object.values(newErrors).every((item) => item === '')) {
      try {
        await signup({
          ...values
        })

        setLoading(false)

        openNotificationWithIcon('success', 'Sign Up Successful', 'Log in to access your account.')

        navigate('/signin')
      } catch (error: any) {
        setLoading(false)

        if (error?.response?.data) {
          const errors = error?.response?.data?.error
          Object.entries(errors).forEach(([key, value]) => {
            setErrors(prevState => ({
              ...prevState,
              [key]: value
            }))
          })
        } else {
          message.error("Something went wrong.")
        }
      }
    } else {
      setLoading(false)
    }
  }

  /**
 * Checks validation errors for phone field
 * Checks validation error for pasword field
 * @param  errorInfo Object
 */
  const onFinishFailed = (errorInfo: any) => {
    const newErrors = { ...errors }
    if (!validatePassword(errorInfo.values.cipherCode)) {
      newErrors['password'] = 'Password must contain minimun of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
    } else {
      newErrors['password'] = ''
    }

    setErrors(prevState => ({
      ...prevState, ...newErrors
    }))
  }


  return (
    <div className="signup">
      <Outerpage
        infoText="Track all your bank expenses in one place"
      >
        <div className="signup-form">
          <Form
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={16}>
              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  name="firstName"
                  rules={[{
                    required: true,
                    message: 'Input is required'
                  }]}
                >
                  <Textinput
                    placeHolder="First Name"
                    name="firstName"
                    updateField={updateField}
                  />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} xs={24}>
                <Form.Item
                  name="lastName"
                  rules={[{
                    required: true,
                    message: 'Input is required'
                  }]}
                >
                  <Textinput
                    placeHolder="Last Name"
                    name="lastName"
                    updateField={updateField}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              validateStatus={errors?.email.length > 0 ? 'error' : undefined}
              help={errors?.email.length > 0 ? errors.email : undefined}
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
                hasError={errors?.email.length > 0 ? true : false}
                updateField={updateField}
              />
            </Form.Item>
            <Form.Item
              validateStatus={errors?.password.length > 0 ? 'error' : undefined}
              help={errors?.password.length > 0 ? errors.password : undefined}
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
                hasError={errors?.password.length > 0 ? true : false}
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
                GET STARTED
              </Button>
            </Form.Item>
          </Form>

          <p className="text-extra">
            Already have an account?  <a href="/signup" onClick={(e) => {
              e.preventDefault();
              navigate('/signin')
            }}>Sign in </a>
          </p>
        </div>
      </Outerpage>
    </div>
  )
}

export default Signup
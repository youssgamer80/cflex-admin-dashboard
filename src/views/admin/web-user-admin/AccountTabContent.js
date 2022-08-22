// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import Select from 'react-select'
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'

// ** Reactstrap Imports
import { Toast, ToastBody, ToastHeader, Row, Col, Form, Card, Input, Label, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'

// ** Utils
import { selectThemeColors } from '@utils'
import avatar from '@src/assets/images/avatars/avatar-blank.png'
import InputPasswordToggle from '@components/input-password-toggle'
// ** Demo Components
import DeleteAccount from './DeleteAccount'
import useJwt from '@src/auth/jwt/useJwt'

const close = (
  <button type='button' className='ms-1 btn-close'>
    <span>×</span>
  </button>
)

const countryOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' }
]


const AccountTabs = () => {
  // ** Hooks
  const defaultValues = {
    lastName: '',
    firstName: ''
  }
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** States
  const [setAvatar] = useState(null)

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const onSubmit = data => {

    console.log(Object.values(data).every(field => field.length > 0))
    if (Object.values(data).length > 0) {

      const obj = {}
      const keys = Object.keys(data)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (key === 'firstName') {
          obj['prenom'] = data[key]
        } else if (key === 'lastName') {
          obj['nom'] = data[key]
        } else if (key === 'role') {
          obj['role'] = [data['role']['value']]
        } else {
          obj[key] = data[key]
        }
      }
      obj['username'] = obj['email']
      console.log(obj)
      useJwt.register(obj).then(res => {
        console.log(res)
        if (res.data.status === 200) {
          <Toast>
            <ToastHeader close={close} icon='success'>Vuexy</ToastHeader>
            <ToastBody>
              Utilisateur créé avec succès !
            </ToastBody>
          </Toast>
        }
      }).catch(err => {
        console.log(err)

      })

      return null
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
      console.log(errors)
    }
  }

  const handleImgReset = () => {
    setAvatar(require('@src/assets/images/avatars/avatar-blank.png').default)
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Créer un compte</CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>
          <div className='d-flex'>
            <div className='me-25'>
              <img className='rounded me-50' src={avatar} alt='Generic placeholder image' height='100' width='100' />
            </div>
            <div className='d-flex align-items-end mt-75 ms-1'>
              <div>
                <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                  Télécharger
                  <Input type='file' onChange={onChange} hidden accept='image/*' />
                </Button>
                <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                  Réinitialiser
                </Button>
                <p className='mb-0'>Ajouter une image JPG, GIF or PNG. Taille Max 800kB</p>
              </div>
            </div>
          </div>
          <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
            <Row>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='lastName'>
                  Nom
                </Label>
                <Controller
                  name='lastName'
                  control={control}
                  render={({ field }) => (
                    <Input id='lastName' placeholder='Doe' invalid={errors.lastName && true} {...field} />
                  )}
                />
                {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='firstName'>
                  Prénoms
                </Label>
                <Controller
                  name='firstName'
                  control={control}
                  render={({ field }) => (
                    <Input id='firstName' placeholder='John' invalid={errors.firstName && true} {...field} />
                  )}
                />
                {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='emailInput'>
                  E-mail
                </Label>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input id='emailInput' type='email' name='email' placeholder='Email'  {...field} />
                  )}
                />

              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='phNumber'>
                  Numéro de téléphone
                </Label>
                <Controller
                  name='telephone'
                  control={control}
                  render={({ field }) => (
                    <Cleave
                      id='phNumber'
                      name='phNumber'
                      className='form-control'
                      placeholder='07 00 00 00 00'
                      options={{ phone: true }}
                      invalid={errors.lastName && true}
                      {...field} />
                  )}
                />

              </Col>

              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='password'
                  name='password'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Mot de passe'
                      htmlFor='passwordAccount'
                      className='input-group-merge'
                      {...field}
                    />
                  )}
                />
                {errors.password && (
                  <FormFeedback className='d-block'>{errors.password.message}</FormFeedback>
                )}
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='role'>
                  Role
                </Label>

                <Controller
                  control={control}
                  id='role'
                  name='role'
                  render={({ field }) => (
                    <Select
                      id='role'
                      isClearable={false}
                      className='react-select'
                      classNamePrefix='select'
                      options={countryOptions}
                      theme={selectThemeColors}
                      {...field}
                    />
                  )}
                />
              </Col>


              <Col className='mt-2' sm='12'>
                <Button type='submit' className='me-1' color='primary'>
                  Enregistrer
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <DeleteAccount />
    </Fragment>
  )
}

export default AccountTabs

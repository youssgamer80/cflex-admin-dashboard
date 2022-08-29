// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import Select from 'react-select'
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'
import { yupResolver } from '@hookform/resolvers/yup'
import classnames from 'classnames'
import toast from 'react-hot-toast'
// ** Reactstrap Imports
import { Toast, ToastBody, ToastHeader, Row, Col, Form, Card, Input, Label, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'
import * as yup from 'yup'
// ** Utils
import { selectThemeColors } from '@utils'
import avatar from '@src/assets/images/avatars/avatar-blank.png'
import InputPasswordToggle from '@components/input-password-toggle'
// ** Demo Components
import DeleteAccount from './DeleteAccount'
import useJwt from '@src/auth/jwt/useJwt'


const countryOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' }
]
const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} obligatoire`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} au moins ${min} charactères`
  } else {
    return ''
  }
}


const AccountTabs = () => {
  const SignupSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, obj => showErrors('le mot de passe doit contenir', obj.value.length, obj.min))
      .required(),
    telephone: yup
      .string()
      .min(10, obj => showErrors('le numéro de téléphone doit contenir', obj.value.length, obj.min))
      .required()
  })
  // ** Hooks
  const {
    control,
    reset,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignupSchema)
  })
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
  const checkIsValid = data => {
    return Object.values(data).every(field => (field !== undefined))
  }
  const [data, setData] = useState({})
  const onSubmit = data => {
    console.log(data)
    setData(data)
    if (checkIsValid(data)) {

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
        if (res.status === 200) {
          toast.success("Utilisateur créé !!!")
          reset()
        }
      }).catch(err => {
        console.log(err)
        toast.error("Une erreur est survenue, veuillez réessayer")

      })

      return null
    } else {
      for (const key in data) {
        if (data[key] === undefined) {
          setError(key, {
            type: key
          })
        }
      }
      console.log('jj', errors)
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
                  name='nom'
                  control={control}
                  render={({ field }) => (
                    <Input id='lastName' placeholder='Doe' invalid={errors.nom && true} {...field} />
                  )}
                />
                {errors.nom && <FormFeedback>Veuillez saisir un nom valide</FormFeedback>}
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='firstName'>
                  Prénoms
                </Label>
                <Controller
                  name='prenom'
                  control={control}
                  render={({ field }) => (
                    <Input id='firstName' placeholder='John' invalid={errors.prenom && true} {...field} />
                  )}
                />
                {errors && errors.prenom && <FormFeedback>Veuillez saisir un prenom valide</FormFeedback>}
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
                      invalid={errors.telephone && true}
                      {...field} />
                  )}
                />
                {errors && errors.telephone && <FormFeedback>{errors.telephone.message}</FormFeedback>}
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
                      className={classnames('select', { 'is-invalid': data !== undefined ? data.role === undefined : true })}
                      classNamePrefix='select'
                      options={countryOptions}
                      theme={selectThemeColors}
                      invalid={errors.role && true}
                      {...field}
                    />
                  )}
                />
                {errors.role && (
                  <FormFeedback className='d-block'>Veuillez selectionner un role</FormFeedback>
                )}
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
      {/* <DeleteAccount /> */}
    </Fragment>
  )
}

export default AccountTabs

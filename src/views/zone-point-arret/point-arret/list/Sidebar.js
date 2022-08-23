// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addUser } from '../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  Nom: '',
  Longitude: '',
  Latitude: '',
  Zone: ''
}

const countryOptions = [
  {
    name: 'Zone',
    minWidth: '138px',
    sortable: true,
    sortField: 'zone',
    selector: row => row.idZoneFk.libelle,
    cell: row => <span className='text-capitalize'>{row.idZoneFk.libelle}</span>
  }
  
]

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null)
  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = data => {
    setData(data)
    if (checkIsValid(data)) {
      toggleSidebar()
      dispatch(
        addUser({
          status: 'active',
          nom: data.nom,
          longitude: data.longitude,
          latitude: data.latitude,
          zone: data.idZoneFk
        })
      )
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError('country', {
            type: 'manual'
          })
        }
        if (data[key] !== null && data[key].length === 0) {
          console.log(data)
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setRole('subscriber')
    setPlan('basic')
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Nouveau point d arret'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='nom'>
           Nom <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='Nom'
            control={control}
            render={({ field }) => (
              <Input id='nom'  invalid={errors.nom && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='longitude'>
          Longitude <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='Longitude'
            control={control}
            render={({ field }) => (
              <Input id='longitude'  invalid={errors.longitude && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='latitude'>
          Latitude <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='Latitude'
            control={control}
            render={({ field }) => (
              <Input id='latitude'  invalid={errors.latitude && true} {...field} />
            )}
          />
        </div>
       
        <div className='mb-1'>
          <Label className='form-label' for='zone'>
            Zone <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='zone'
            control={control}
            render={({ field }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix='select'
                options={countryOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.zone === null })}
                {...field}
              />
            )}
          />
        </div>
     <Button type='submit' className='me-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers

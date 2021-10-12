import { ErrorMessage, useField, useFormikContext } from 'formik'
import CreatableSelect from 'react-select/creatable'
import styled from 'styled-components'
import { FieldError } from './FieldError'
import { inputStyles } from './styles'
import { Fieldset, Label } from 'src/lib'

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: 'none!important',
    boxShadow: 'none'
  }),
  input: (provided, state) => ({
    ...provided
  }),
  menu: (provided, state) => ({
    ...provided,
    backdropFilter: 'blur(20px)'
  }),
  option: (provided, state) => ({
    ...provided
  })
}

const MultiSelect = styled(CreatableSelect)`
  ${inputStyles};
  padding: 0;
`

/**
 * Example props that need to be passed to formikContainer fields: 
 * 
 * {
    control: 'multiselect',
    type: 'text',
    label: 'Random',
    name: 'random',
    parser: (value) => {
      return value.value
    }
    options: [
      {
        value: 'apple',
        label: 'apple'
      },
      {
        value: 'orange',
        label: 'orange'
      }
    ]
  }
 */

export const MultiSelectField = ({ onCreate, ...props }) => {
  const [field, meta] = useField(props)
  const { setFieldValue, values } = useFormikContext()

  const onChange = value => {
    let parsedValue = value
    if (props.parser) {
      parsedValue = props.parser(value)
    }

    setFieldValue(props.name, parsedValue)
  }

  const onCreateOption = async value => await onCreate(value)

  const inputProps = {
    ...field,
    ...props,
    onChange
  }

  return (
    <Fieldset>
      <Label htmlFor={props.name}>{props.label}</Label>
      <MultiSelect
        closeMenuOnSelect={false}
        isMulti={true}
        onCreateOption={onCreateOption}
        styles={customStyles}
        {...inputProps}
      />
      <ErrorMessage name={props.name} component={FieldError} {...meta} />
    </Fieldset>
  )
}

export default MultiSelectField

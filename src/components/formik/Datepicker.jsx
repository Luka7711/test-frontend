import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import styled from 'styled-components'
import FieldError from './FieldError'
import { inputStyles } from './styles'
import { Label, Fieldset } from 'src/lib'
import 'react-datepicker/dist/react-datepicker.css'

const DateViewDS = styled(DateView)`
  ${inputStyles};
`

export const DatePicker = ({ label, name, error, ...rest }) => (
  <Fieldset>
    <Label htmlFor={name}>{label}</Label>
    <Field name={name} error={error}>
      {({ form: { setFieldValue }, field }) => {
        const { value } = field
        return (
          <DateViewDS
            id={name}
            {...field}
            {...rest}
            selected={value}
            onChange={val => setFieldValue(name, val)}
          />
        )
      }}
    </Field>
    <ErrorMessage name={name} component={FieldError} />
  </Fieldset>
)

export default DatePicker

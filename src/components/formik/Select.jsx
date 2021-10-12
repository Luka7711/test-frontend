import { Field as FormikField, ErrorMessage } from 'formik'
import { Label, Fieldset } from 'src/lib'
import { inputStyles } from './styles'
import FieldError from './FieldError'
import styled from 'styled-components'

const Field = styled(FormikField)`
  ${inputStyles};
`

export const Select = ({ label, name, options, error, ...rest }) => (
  <Fieldset>
    <Label htmlFor={name}>{label}</Label>
    <Field component="select" id={name} name={name} error={error ? 1 : 0} {...rest}>
      {options?.map(option => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </Field>
    <ErrorMessage name={name} component={FieldError} />
  </Fieldset>
)

export default Select

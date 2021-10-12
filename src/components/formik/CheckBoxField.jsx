import { ErrorMessage, Field as FormikField } from 'formik'
import styled from 'styled-components'
import { Fieldset, Label } from 'src/lib'
import { colors } from 'src/theme'
import FieldError from './FieldError'
import { inputStyles } from './styles'

const Field = styled(FormikField)`
  ${inputStyles};
  ${({ checked }) => (checked ? `background-color:${colors.action};` : '')};
`

export const CheckBoxField = ({ error, label, name, value = false, ...props }) => (
  <Fieldset>
    <span>
      <Field
        id={name}
        checked={value}
        name={name}
        error={error ? 1 : 0}
        type={`checkbox`}
        value={value}
        {...props}
      />
      <Label htmlFor={name}>{label}</Label>
    </span>

    <ErrorMessage name={name} component={FieldError} />
  </Fieldset>
)

export default CheckBoxField

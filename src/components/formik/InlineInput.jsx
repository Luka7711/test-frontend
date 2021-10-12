import { Field as FormikField, ErrorMessage } from 'formik'
import styled from 'styled-components'
import { Fieldset } from 'src/lib'
import { colors, shapes, typography } from 'src/theme'
import FieldError from './FieldError'

const InlineFieldset = styled(Fieldset)`
  padding: 0;
`

const InlineField = styled(FormikField)`
  background-color: ${colors.transparent};
  border: ${({ error }) => (error ? `1px solid ${colors.danger}` : `1px solid transparent`)};
  border-radius: ${shapes.square};
  color: ${({ theme, error }) => (error ? colors.danger : theme.text)};
  font-size: ${({ size }) =>
    size?.length && typography.size[size] ? typography.size[size] : typography.size.xl};
  font-weight: ${({ weight }) =>
    weight?.length && typography.weight[weight]
      ? typography.weight[weight]
      : typography.weight.light};
  letter-spacing: 1px;
  transition: all 0.3s linear;

  &:focus {
  }

  &:hover {
    background-color: ${({ theme }) => theme.hoverFormFields};
  }
`

export const InlineInput = ({ label, name, error, ...rest }) => {
  return (
    <InlineFieldset>
      <InlineField id={name} name={name} placeholder={label} error={error ? 1 : 0} {...rest} />
      <ErrorMessage name={name} component={FieldError} />
    </InlineFieldset>
  )
}

export default InlineInput

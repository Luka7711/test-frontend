import { ErrorMessage, Field as FormikField } from 'formik'
import styled from 'styled-components'
import { Fieldset, Label } from 'src/lib'
import { colors, shapes, typography } from 'src/theme'
import FieldError from './FieldError'

const InlineInput = styled(FormikField)`
  align-items: center;
  background-color: transparent;
  border: ${({ theme }) => `1px solid ${theme.border}`};
  border-radius: ${shapes.box};
  cursor: pointer;
  display: inline-flex;
  height: ${typography.size.xs};
  margin: 0 0.5rem 0 0;
  position: relative;
  width: ${typography.size.xs};

  :checked ~ span:after {
    display: block;
  }
`

const InlineCheckmark = styled.span`
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.border}`};
  border-radius: ${shapes.box};
  display: inline-flex;
  height: ${typography.size.xs};
  position: absolute;
  width: ${typography.size.xs};
  z-index: -1;

  ${({ checked }) => (checked ? `background-color:${colors.action};` : '')};

  :after {
    border: solid white;
    border-width: 0 3px 3px 0;
    content: '';
    display: none;
    height: 10px;
    left: 5px;
    position: absolute;
    transform: rotate(45deg);
    top: 1px;
    width: 5px;
  }

  :hover {
    ${({ checked, theme }) =>
      checked ? `opacity:0.9;` : `background-color:${theme.hoverFormFields};`};
  }
`

const InlineLabel = styled(Label)`
  align-items: center;
  display: inline-flex;
  font-weight: ${typography.weight.regular};
  font-size: ${typography.size.xs};
  line-height: 1;
`

const InlineWrapper = styled.span`
  align-items: center;
  display: flex;
  grid-area: value;
  margin: 5px 0;
  min-height: 40px;
`

export const InlineCheckbox = ({ htmlFor, label, name, onChange, value, ...props }) => (
  <InlineWrapper>
    <InlineInput
      id={name}
      checked={!!value}
      name={name}
      type={`checkbox`}
      value={value}
      onChange={onChange}
      {...props}
    />
    <InlineCheckmark checked={!!value} />
    <InlineLabel htmlFor={htmlFor}>{label}</InlineLabel>
  </InlineWrapper>
)

export const InputWithCheckbox = ({ checkbox, label, name, error, ...rest }) => {
  return (
    <Fieldset>
      <InlineCheckbox htmlFor={name} label={label} {...checkbox} />
      <InlineInput id={name} name={name} error={error ? 1 : 0} {...rest} />
      <ErrorMessage name={name} component={FieldError} />
    </Fieldset>
  )
}

// import { inputStyles } from './styles'

// const Field = styled(FormikField)`
//   ${inputStyles};
// `

// export const InlineCheckbox = ({ name, onChange, value, ...props }) => (
//   <StyledInlineCheckbox
//     id={name}
//     checked={value}
//     name={name}
//     type="checkbox"
//     value={value}
//     onChange={onChange}
//     {...props}
//   />
// )

// export const InputWithCheckbox = ({ checkbox, label, name, error, ...rest }) => {
//   return (
//     <Fieldset>
//       <span>
//         <InlineCheckbox {...checkbox} />
//         <Label htmlFor={name}>{label}</Label>
//       </span>
//       <Field id={name} name={name} error={error ? 1 : 0} {...rest} />
//       <ErrorMessage name={name} component={FieldError} />
//     </Fieldset>
//   )
// }

export default InputWithCheckbox

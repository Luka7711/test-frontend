import { Fragment } from 'react'
import { Field, ErrorMessage } from 'formik'
import styled from 'styled-components'
import FieldError from './FieldError'
import { Label, Fieldset, Input } from 'src/lib'

const FieldsetDS = styled(Fieldset)`
  flex-direction: row;
  flex-wrap: wrap;
`

export const Range = ({ name, error, label, options, ...rest }) => (
  <FieldsetDS>
    <Label size="xs" dimensions={{ w: '100%', m: '0 0 1rem 0' }} htmlFor={name}>
      {label}
    </Label>
    <Field name={name} {...rest}>
      {({ field }) => {
        const { value } = field
        console.log(value)
        return (
          <Fragment>
            <Label>{options[0]}</Label>
            <Input
              dimensions={{ p: 'unset' }}
              type="range"
              min={`${options[0]}`}
              max={`${options[1]}`}
              step="1"
              id={name}
              name={name}
              {...field}
              value={value}
            />
            <Label>{options[1]}</Label>
          </Fragment>
        )
      }}
    </Field>
    <ErrorMessage name={name} component={FieldError} />
  </FieldsetDS>
)

export default Range

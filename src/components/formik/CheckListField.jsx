import { Fragment } from 'react'
import { Field, ErrorMessage } from 'formik'
import styled from 'styled-components'
import FieldError from './FieldError'
import { Label, Fieldset, Input } from 'src/lib'

const CheckListFieldset = styled(Fieldset)`
  flex-direction: row;
  flex-wrap: wrap;
`

export const CheckListField = ({ name, error, label, options, ...rest }) => (
  <CheckListFieldset>
    <Label size="xs" dimensions={{ w: '100%', m: '0 0 1rem 0' }}>
      {label}
    </Label>
    <Field name={name} {...rest}>
      {({ field }) => {
        return options.map(option => (
          <Fragment key={option.name}>
            <Input
              {...field}
              type="checkbox"
              id={option.value}
              value={option.value}
              checked={field.value.includes(option.value)}
              dimensions={{ p: 'unset', m: 'unset' }}
            />
            <Label
              htmlFor={option.value}
              size="xxs"
              dimensions={{ m: '0 1rem 0 1rem', p: 'unset' }}
            >
              {option.name}
            </Label>
          </Fragment>
        ))
      }}
    </Field>
    <ErrorMessage name={name} component={FieldError} />
  </CheckListFieldset>
)

export default CheckListField

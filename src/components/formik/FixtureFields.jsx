import { useState } from 'react'
import { Field as FormikField, FieldArray, ErrorMessage, useFormikContext } from 'formik'
import styled from 'styled-components'
import { Button, Fieldset, Label } from 'src/lib'
import { InlineCheckbox } from './InputWithCheckbox'
import { FieldError } from './FieldError'
import { inputStyles } from './styles'

const FixtureFieldsHeading = styled.div``

const FixtureFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 1fr;
  grid-template-areas: 'name price qty delete';
  }
  gap: 0px 4px;
`

const FixtureFieldsFieldset = styled.fieldset`
  width: 100%;
`

const FixtureFieldsLabel = styled(Label)`
  grid-area: label;
`

const AddButton = styled(Button)`
  grid-area: add;
  padding: 0;
`

const NameField = styled(FormikField)`
  ${inputStyles};
  grid-area: name;
  min-width: 10px;
`

const PriceField = styled(FormikField)`
  ${inputStyles};
  grid-area: price;
  min-width: 10px;
`

const QuantityField = styled(FormikField)`
  ${inputStyles};
  grid-area: qty;
  min-width: 10px;
`

const DeleteButton = styled(Button)`
  grid-area: delete;
  padding: 0;
  place-self: center;
  width: 3rem;
`

const FIXTURE_FIELD = {}

const FixtureField = ({ children, index, options, onClick, ...props }) => {
  return (
    <FixtureFieldsFieldset style={{ margin: index === 0 ? '0' : '.25rem 0 0 0' }}>
      <FixtureFieldContainer>
        <NameField name={`fixtures[${index}].name`} placeholder={`Enter fixture`} />
        <PriceField name={`fixtures[${index}].price`} placeholder="$" type='number'/>
        <QuantityField name={`fixtures[${index}].quantity`} placeholder='Qty' type='number'/>
        <DeleteButton
          color="danger"
          disabled={index === 0}
          isClickable
          type="button"
          variant="filled"
          onClick={onClick}
        >
          -
        </DeleteButton>
      </FixtureFieldContainer>
      {children}
      <ErrorMessage name={`fixtures[${index}].name`} component={FieldError} />
      <ErrorMessage name={`fixtures[${index}].value`} component={FieldError} />
    </FixtureFieldsFieldset>
  )
}

export const FixtureFields = ({ model, name, label, ...props }) => {
  const {
    setFieldValue,
    values: { fixtures = [] }
  } = useFormikContext()

  if (!fixtures?.length) {
    fixtures.push(FIXTURE_FIELD)
  }

  return fixtures ? (
    <FieldArray
      name={name}
      render={helpers => {
        return (
        <Fieldset>
          <FixtureFieldsHeading>
            <FixtureFieldsLabel htmlFor={name}>{label}</FixtureFieldsLabel>
            <AddButton
              variant={`transparent`}
              color={`action`}
              size={`xxxs`}
              type={`button`}
              weight={`medium`}
              isClickable
              onClick={() => {
                helpers.push(FIXTURE_FIELD)
                if (props.recalculateHeight) { 
                  props.recalculateHeight() 
                }
              }}
            >
              + new field
            </AddButton>
          </FixtureFieldsHeading>

          {fixtures.map((field, index) => (
            <FixtureField
              key={`${name}${index}`}
              index={index}
              onClick={() => fixtures.length - 1 !== 0 && helpers.remove(index)}
              itemTypeName={name}
              {...field}
            />
          ))}
        </Fieldset>
      )}}
    />
  ) : null
}

export default FixtureFields

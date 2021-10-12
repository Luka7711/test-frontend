import { useState } from 'react'
import { Field as FormikField, FieldArray, ErrorMessage, useFormikContext } from 'formik'
import styled from 'styled-components'
import { Button, Fieldset, Label } from 'src/lib'
import { InlineCheckbox } from './InputWithCheckbox'
import { FieldError } from './FieldError'
import { inputStyles } from './styles'

const DimensionFieldsHeading = styled.div``

const DimensionFieldContainer = styled.div`
  display: grid;
  
  ${({usePercent}) => usePercent
  ? `grid-template-columns: 3fr 2fr 1fr;
  grid-template-areas: 'name percent delete';`
  : `grid-template-columns: 3fr 2fr 2fr 1fr;
  grid-template-areas: 'name width length delete';`
  }
  gap: 0px 4px;
`

const DimensionFieldsFieldset = styled.fieldset`
  width: 100%;
`

const DimensionFieldsLabel = styled(Label)`
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

const WidthField = styled(FormikField)`
  ${inputStyles};
  grid-area: width;
  min-width: 10px;
`

const LengthField = styled(FormikField)`
  ${inputStyles};
  grid-area: length;
  min-width: 10px;
`

const PercentField = styled(FormikField)`
  ${inputStyles};
  grid-area: percent;
  min-width: 10px;
`

const DeleteButton = styled(Button)`
  grid-area: delete;
  padding: 0;
  place-self: center;
  width: 3rem;
`

const DIMENSION_FIELD = {}

const DimensionField = ({ children, index, options, usePercent, onClick, ...props }) => {
  return (
    <DimensionFieldsFieldset style={{ margin: index === 0 ? '0' : '.25rem 0 0 0' }}>
      <DimensionFieldContainer usePercent={usePercent}>
        <NameField name={`dimensions[${index}].floor.name`} placeholder={`Floor name`} />
        {usePercent 
          ? <PercentField name={`dimensions[${index}].percent`} placeholder="Percent" type='number'/>
          : (
            <>
              <WidthField name={`dimensions[${index}].width`} placeholder="Width" />
              <LengthField name={`dimensions[${index}].length`} placeholder='Length' />    
            </>
          )
        }
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
      </DimensionFieldContainer>
      {children}
      <ErrorMessage name={`dimensions[${index}].name`} component={FieldError} />
      <ErrorMessage name={`dimensions[${index}].value`} component={FieldError} />
    </DimensionFieldsFieldset>
  )
}

export const DimensionFields = ({ model, name, label, ...props }) => {
  const [usePercent, setUsePercent] = useState(false)

  const {
    setFieldValue,
    values: { dimensions = [] }
  } = useFormikContext()

  if (!dimensions?.length) {
    dimensions.push(DIMENSION_FIELD)
  }

  return dimensions ? (
    <>
      <span>
        <InlineCheckbox
          name='percentage'
          onChange={event => setUsePercent(!usePercent)}
          value={!!usePercent}
        />
        <Label>Percentages</Label>
      </span>
      <FieldArray
        name={name}
        render={helpers => {
          return (
          <Fieldset>
            <DimensionFieldsHeading>
              <DimensionFieldsLabel htmlFor={name}>{label}</DimensionFieldsLabel>
              <AddButton
                variant={`transparent`}
                color={`action`}
                size={`xxxs`}
                type={`button`}
                weight={`medium`}
                isClickable
                onClick={() => {
                  helpers.push(DIMENSION_FIELD)
                  if (props.recalculateHeight) { 
                    props.recalculateHeight() 
                  }
                }}
              >
                + new field
              </AddButton>
            </DimensionFieldsHeading>

            {dimensions.map((field, index) => (
              <DimensionField
                key={`${name}${index}`}
                index={index}
                onClick={() => dimensions.length - 1 !== 0 && helpers.remove(index)}
                usePercent={usePercent}
                itemTypeName={name}
                {...field}
              />
            ))}
          </Fieldset>
        )}}
      />
    </>
  ) : null
}

export default DimensionFields

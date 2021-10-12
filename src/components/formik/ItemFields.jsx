import { Field as FormikField, FieldArray, ErrorMessage, useFormikContext } from 'formik'
import styled from 'styled-components'
import { Button, Fieldset, Label } from 'src/lib'
import { TIME_INTERVAL_TYPES } from 'src/data'
import { FieldError } from './FieldError'
import { inputStyles } from './styles'

const ItemFieldsHeading = styled.div``

const ItemFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 1fr;
  grid-template-areas: 'name price qty delete';
  gap: 0px 4px;
`

const ItemFieldsFieldset = styled.fieldset`
  width: 100%;
`

const ItemFieldsLabel = styled(Label)`
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

// const FrequencyField = styled(FormikField)`
//   ${inputStyles};
//   grid-area: freq;
//   min-width: 10px;
// `

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

const ITEM_FIELD = {}

// const FrequencyOptions = ({ frequencies, name, ...props }) => (
//   <FrequencyField component={`select`} name={name} {...props}>
//     {Object.keys(frequencies).map(frequency => (
//       <option key={frequency} value={frequencies[frequency]}>
//         {frequency}
//       </option>
//     ))}
//   </FrequencyField>
// )

const ItemField = ({ children, index, itemTypeName, options, onClick, ...props }) => {

  return (
    <ItemFieldsFieldset style={{ margin: index === 0 ? '0' : '.25rem 0 0 0' }}>
      <ItemFieldContainer>
        <NameField name={`${itemTypeName}[${index}].name`} placeholder={`Enter ${itemTypeName}`} />
        {/* <FrequencyOptions
          name={`${itemTypeName}[${index}].frequency`}
          frequencies={TIME_INTERVAL_TYPES}
        /> */}
        <PriceField name={`${itemTypeName}[${index}].price`} placeholder="$" type='number' />
        <QuantityField name={`${itemTypeName}[${index}].quantity`} placeholder='Qty' type='number' />
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
      </ItemFieldContainer>
      {children}
      <ErrorMessage name={`${itemTypeName}[${index}].name`} component={FieldError} />
      <ErrorMessage name={`${itemTypeName}[${index}].value`} component={FieldError} />
    </ItemFieldsFieldset>
  )
}

export const ItemFields = ({ model, name, label, ...props }) => {
  const {
    setFieldValue,
    values: { supplies = [], equipment = [] }
  } = useFormikContext()

  let item_fields
  if (name === 'supplies' ) {
    item_fields = supplies
  } else if (name === 'equipment') {
    item_fields = equipment
  }

  if (!item_fields?.length) {
    item_fields.push(ITEM_FIELD)
  }

  return item_fields ? (
    <FieldArray
      name={name}
      render={helpers => {
        return (
        <Fieldset>
          <ItemFieldsHeading>
            <ItemFieldsLabel htmlFor={name}>{label}</ItemFieldsLabel>
            <AddButton
              variant={`transparent`}
              color={`action`}
              size={`xxxs`}
              type={`button`}
              weight={`medium`}
              isClickable
              onClick={() => {
                helpers.push(ITEM_FIELD)
                if (props.recalculateHeight) { 
                  props.recalculateHeight() 
                }
              }}
            >
              + new field
            </AddButton>
          </ItemFieldsHeading>

          {item_fields.map((field, index) => (
            <ItemField
              key={`${name}${index}`}
              index={index}
              onClick={() => item_fields.length - 1 !== 0 && helpers.remove(index)}
              itemTypeName={name}
              {...field}
            />
          ))}
        </Fieldset>
      )}}
    />
  ) : null
}

export default ItemFields

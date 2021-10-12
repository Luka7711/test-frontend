import { ErrorMessage, useField, useFormikContext } from 'formik'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { Fieldset, Label, List, ListItem, LocationPicker, Typography } from 'src/lib'
import { shapes, typography } from 'src/theme'
import { FieldError } from './FieldError'

const LocationList = styled(List)`
  align-items: center;
  display: flex;
  flex-flow: row wrap;
  margin: 0.5rem 0;
  width: 100%;
`

const LocationItem = styled(ListItem)`
  align-items: center;
  background-color: ${({ color, theme }) =>
    color?.length ? transparentize(0.95, color) : transparentize(0.95, theme.inverseCard)};
  border-radius: ${shapes.square};
  color: ${({ color, theme }) => (color?.length ? color : theme.text)};
  cursor: pointer;
  display: flex;
  font-size: ${typography.size.xxs};
  font-weight: ${typography.weight.medium};
  padding: 0.25rem 0.5rem;
`

const Locations = ({ maxVisible = 3, locations, ...props }) => {
  //console.log('locations to render', locations)
  if (!locations?.length) {
    return null
  }

  return (
    <LocationList>
      {locations?.map(({ value, label }, index) => {
        if (index + 1 > maxVisible) {
          return
        }
        return (
          <LocationItem key={value} {...props} dimensions={{ m: '5px 0' }}>
            <Typography variant="p" dimensions={{ w: '100%' }}>
              {label}
            </Typography>
          </LocationItem>
        )
      })}
      {locations.length > maxVisible ? (
        <Typography variant="p" dimensions={{ w: '100%', m: '5px 0' }}>
          + {locations.length - maxVisible} more
        </Typography>
      ) : null}
    </LocationList>
  )
}

export const LocationsField = props => {
  const [field, meta] = useField(props)
  const {
    setFieldValue,
    values: { locations }
  } = useFormikContext()

  const onChange = value => {
    console.log('ON CHANGE VALUE LOCATIONS FILED', value)
    let parsedValue = value
    if (props.parser) {
      parsedValue = props.parser(`${value.label}`)
    }
    setFieldValue(props.name, parsedValue)
  }

  return (
    <Fieldset>
      <Label htmlFor={props.name}>
        <Locations locations={locations} />
        <LocationPicker field={field} onChange={onChange} {...props} />
        <ErrorMessage name={props.name} component={FieldError} {...meta} />
      </Label>
    </Fieldset>
  )
}

export default LocationsField

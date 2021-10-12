import { useState } from 'react'
import { ErrorMessage, useField, useFormikContext } from 'formik'
import styled from 'styled-components'
import { FieldError } from './FieldError'
import { inputStyles } from './styles'
import { Fieldset, Label, List, ListItem, useGoogleMaps } from 'src/lib'
import { Formatter } from 'src/utils'

const Autocomplete = styled.input`
  ${inputStyles};
`

/**
 * @component
 * @function AddressField A component that renders a Google Maps Autocomplete field
 * This component uses Formik Context so that it can access values from the entire form.
 *
 * @arg {Function} onAddress REQUIRED -- a function YOU PASS to hold the state of the field value
 * @arg {Object} props primarily Formik field props (name, label, id, type, value, etc)
 *
 * @returns a Google Maps Autocomplete field and Suggestions from the Maps API
 */
export const AddressField = ({ onAddress, ...props }) => {
  const [field, meta] = useField(props)
  const [mapRef, google] = useGoogleMaps()
  const [suggestions, setSuggestions] = useState([])
  const {
    setFieldValue,
    values: { address_one, ...values }
  } = useFormikContext()

  /**
   * @const {Object} autocomplete the Google Maps Autocomplete Service (for place predictions)
   * @const {Object} places the Google Maps Places Service (for place details)
   * @const {Object} sessionToken the Google Maps Session Token
   * (a session begins on user input and ends when a prediction is selected)
   */
  let autocomplete = null
  let places = null
  let sessionToken = null
  if (google) {
    new google.maps.Map(mapRef, { center: { lat: -33.866, lng: 151.196 }, zoom: 15 })
    autocomplete = new google.maps.places.AutocompleteService({ types: ['geocode'] })
    places = new google.maps.places.PlacesService(mapRef)
    sessionToken = new google.maps.places.AutocompleteSessionToken()
  }

  /**
   * @function getPredictions Based on Google Maps API example
   * https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service
   *
   * Get place predictions from the Google Maps Autocomplete API based on user input.
   *
   * @arg {String} input the current value of the address field
   */
  function getPredictions(input) {
    if (!input.length) {
      console.warn(`Autocomplete input empty: `, input)
      return
    }

    if (!autocomplete || !sessionToken) {
      console.warn(`Autocomplete not ready: `, autocomplete, sessionToken)
      return
    }

    autocomplete.getPlacePredictions({ input, sessionToken }, (predictions, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.warn('Failed to get predictions: ', predictions, status, input)
        return
      }

      setSuggestions(predictions)
    })
  }

  async function onChange(event) {
    const { value } = event.target

    setFieldValue(props.name, value)
    await getPredictions(value)
  }

  /**
   * @function onSelect An event handler fired when a user selects a place suggestion
   *
   * This method requires a valid sessionToken for use with the Google Maps API, which is
   * instantiated within this component.
   *
   * After retrieving place details, this method attempts to set field values for all of the form's
   * address fields.
   *
   * The Suggestion state is reset to an empty array after a selection occurs.
   *
   * The place details are stored in local component 'addressData' state for safekeeping.
   *
   * @arg {Object} event not used
   * @arg {Object} item the selected place suggestion from the Google Maps Autocomplete API
   * @property {String} place_id the place ID of the selected suggestion
   * @property {String} description the place description of the selected suggestion
   */
  async function onSelect(event, item) {
    const options = {
      placeId: item.place_id,
      fields: [
        `address_components`,
        `formatted_address`,
        `formatted_phone_number`,
        `geometry`,
        `icon`,
        `name`,
        `place_id`,
        `url`,
        `utc_offset_minutes`,
        `vicinity`,
        `website`
      ],
      sessionToken
    }

    /**
     * Documentation on Place Data:
     * https://developers.google.com/maps/documentation/javascript/place-data-fields
     */
    await places.getDetails(options, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let countryCode
        let number

        /**
         * @property {Object} geometry -> @property {Object} location place coordinates (lat, lng)
         */
        if (!place?.geometry) {
          console.warn('No place geometry: ', place, place?.geometry)
          return
        }

        /**
         * @property {Object} formatted_phone_number
         * TODO: Make international
         */
        if (place.hasOwnProperty('formatted_phone_number')) {
          countryCode = '+1'
          number = place.formatted_phone_number.replace('+1', '')
        } else {
          countryCode = ''
          number = ''
        }

        const latitude = place.geometry.location.lat()
        const longitude = place.geometry.location.lng()

        /**
         * @property {Object} address_components
         * https://developers.google.com/places/web-service/details#fields
         */
        const placeDetails = place.address_components.reduce(
          (loc, component) => ({
            ...loc,
            place_id: place.place_id,
            formatted_address: place.formatted_address,
            google_map_link: place.url,
            phone: `${countryCode}${number}`,
            latitude,
            longitude,
            [component.types[0]]: component.short_name
          }),
          {}
        )

        /**
         * Format Google's location data how Route wants it.
         */
        const addressConfig = {
          street_number: 'street_number',
          route: 'route',
          floor: 'floor',
          room: 'room',
          neighborhood: 'neighborhood',
          locality: 'city',
          administrative_area_level_1: 'state',
          administrative_area_level_2: 'zone',
          administrative_area_level_3: 'region',
          postal_code: 'zipcode',
          postal_code_suffix: 'zipcode_suffix',
          country: 'country',
          latitude: 'latitude',
          longitude: 'longitude',
          formatted_address: 'formatted_address',
          google_map_link: 'google_map_link',
          phone: 'phone'
        }

        let location = Formatter.object(placeDetails, addressConfig)

        if (typeof onAddress === 'function') {
          onAddress(location)
        }

        if (typeof address_one !== 'undefined') {
          let addressOne = ''

          if (location?.street_number && typeof location?.street_number !== 'undefined') {
            addressOne += location.street_number
          }

          if (location?.route && typeof location?.route !== 'undefined') {
            addressOne += ` ${location.route}`
          }

          setFieldValue(props.name, addressOne.trim())

          if (location?.city && typeof values?.city !== 'undefined') {
            setFieldValue('city', location.city)
          }

          if (location?.state && typeof values?.state !== 'undefined') {
            setFieldValue('state', location.state)
          }

          if (location?.zipcode && typeof values?.zipcode !== 'undefined') {
            setFieldValue('zipcode', location.zipcode)
          }

          if (location?.country && typeof values?.country !== 'undefined') {
            setFieldValue('country', location.country)
          }
        } else {
          if (location?.formatted_address && typeof location?.formatted_address !== 'undefined') {
            setFieldValue(props.name, location.formatted_address)
          }
        }

        setSuggestions([])
      }
    })
  }

  const inputProps = {
    ...field,
    ...props,
    onChange
  }

  return (
    <>
      <input id={`map`} hidden />
      <Fieldset>
        <Label htmlFor={props.name}>{props.label}</Label>
        <Autocomplete autoComplete={`hidden`} {...inputProps} />
        <ErrorMessage name={props.name} component={FieldError} {...meta} />
      </Fieldset>

      {suggestions?.length ? (
        <List>
          {suggestions.map(item => (
            <ListItem
              id={item.place_id}
              key={item.place_id}
              onClick={event => onSelect(event, item)}
              style={{ cursor: 'pointer' }}
              {...props}
            >
              {item.description}
            </ListItem>
          ))}
        </List>
      ) : null}
    </>
  )
}

export default AddressField

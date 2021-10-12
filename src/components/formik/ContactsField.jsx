// import { ErrorMessage, useField, useFormikContext } from 'formik'
// import { Fieldset, Label } from 'src/lib'
// import { ContactPicker } from '../pickers'
// import { FieldError } from './FieldError'

// export const ContactsField = props => {
//   const [field, meta] = useField(props)
//   const {
//     setFieldValue,
//     values: { contacts }
//   } = useFormikContext()

//   function onChange(value) {
//     // console.log('onChange: ', value)
//     let parsedValue = value
//     if (props.parser) {
//       parsedValue = props.parser(value)
//     }

//     setFieldValue(props.name, parsedValue)
//   }

//   return (
//     <Fieldset>
//       <Label htmlFor={props.name}>
//         <ContactPicker field={field} onChange={onChange} {...props} />
//         <ErrorMessage name={props.name} component={FieldError} {...meta} />
//       </Label>
//     </Fieldset>
//   )
// }

// export default ContactsField

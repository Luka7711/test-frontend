import { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'

export const FormikPage = ({
  children,
  enableReinitialize,
  fields,
  initialValues,
  validationSchema,
  serverError,
  onSubmit,
  ...props
}) => {
  const _onSubmit = async (values, { resetForm, setSubmitting, ...rest }) => {
    console.log('_onSubmit', values)
    const data = Object.keys(values).reduce((all, key) => {
      const isArray = fields instanceof Array || Array.isArray(fields)
      const match = isArray
        ? fields.find(({ name }) => name === key)
        : Object.keys(fields).find(fieldKey => fields[fieldKey].name === key)
      const isNumber = match?.type ? match?.type === 'number' : fields[match].type === 'number'
      const notNumberValue = typeof values[match] !== 'number'
      if (isNumber && notNumberValue) {
        return all
      }
      return {
        ...all,
        [key]: values[key]
      }
    }, {})

    console.log('data from _onSubmit', data)
    
    await onSubmit(data, { resetForm, setSubmitting, ...rest })
    setSubmitting(false)

    const hasErrors = serverError && typeof serverError !== 'undefined'
    if (!enableReinitialize && !hasErrors) {
      resetForm(initialValues)
    }
  }

  return (
    <Formik
      enableReinitialize={enableReinitialize}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={_onSubmit}
      {...props}
    >
      {formik => {
        const [mounted, setMounted] = useState(false)
        /**
         * This cleanup is required in order to avoid rendering errors on mount / unmount
         * during asynchronous form submissions and onChange calls.
         *
         * Link to issue on Formik GitHub: https://github.com/formium/formik/issues/2430
         */
        let disabled = false
        let isLoading = false
        let valid = !(formik.dirty && formik.isValid)
        let isSubmitting = formik.isSubmitting

        useEffect(() => {
          let isCurrent = true

          if (mounted) {
            if (disabled !== valid) {
              disabled = valid
            }
            if (isLoading !== isSubmitting) {
              isLoading = isSubmitting
            }
          }

          if (!!isCurrent) {
            setMounted(true)
          }

          return () => {
            isCurrent = false
            setMounted(false)
          }
        }, [isSubmitting, valid])

        return <Form>{children}</Form>
      }}
    </Formik>
  )
}

export default FormikPage

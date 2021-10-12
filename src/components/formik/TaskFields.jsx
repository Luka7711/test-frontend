import { Field as FormikField, FieldArray, ErrorMessage, useFormikContext } from 'formik'
import styled from 'styled-components'
import { Button, Fieldset, Label } from 'src/lib'
import { FieldError } from './FieldError'
import { inputStyles } from './styles'

const TaskFieldsHeading = styled.div``

const TaskFieldContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-areas: 'name delete';
  gap: 0px 4px;
`

const TaskFieldsFieldset = styled.fieldset`
  width: 100%;
`

const TaskFieldsLabel = styled(Label)`
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

const DeleteButton = styled(Button)`
  grid-area: delete;
  padding: 0;
  place-self: center;
  width: 3rem;
`

const TASK_FIELD = {}

const TaskField = ({ children, index, taskTypeName, options, onClick, ...props }) => {

  return (
    <TaskFieldsFieldset style={{ margin: index === 0 ? '0' : '1rem 0 0 0' }}>
      <TaskFieldContainer>
        <NameField name={`${taskTypeName}[${index}].name`} placeholder={`Enter ${taskTypeName}`} />
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
      </TaskFieldContainer>
      {children}
      <ErrorMessage name={`${taskTypeName}[${index}].name`} component={FieldError} />
      <ErrorMessage name={`${taskTypeName}[${index}].value`} component={FieldError} />
    </TaskFieldsFieldset>
  )
}

export const TaskFields = ({ model, name, label, ...props }) => {
  const {
    setFieldValue,
    values: { tasks = [] }
  } = useFormikContext()

  if (!tasks?.length) {
    tasks.push(TASK_FIELD)
  }

  return tasks ? (
    <FieldArray
      name={name}
      render={helpers => {
        return (
        <Fieldset>
          <TaskFieldsHeading>
            <TaskFieldsLabel htmlFor={name}>{label}</TaskFieldsLabel>
            <AddButton
              variant={`transparent`}
              color={`action`}
              size={`xxxs`}
              type={`button`}
              weight={`medium`}
              isClickable
              onClick={() => {
                helpers.push(TASK_FIELD)
                if (props.recalculateHeight) { 
                  props.recalculateHeight() 
                }
              }}
            >
              + new field
            </AddButton>
          </TaskFieldsHeading>

          {tasks.map((field, index) => (
            <TaskField
              key={`${name}${index}`}
              index={index}
              onClick={() => tasks.length - 1 !== 0 && helpers.remove(index)}
              taskTypeName={name}
              {...field}
            />
          ))}
        </Fieldset>
      )}}
    />
  ) : null
}

export default TaskFields

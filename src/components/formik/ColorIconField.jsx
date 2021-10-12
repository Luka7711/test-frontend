import { useState } from 'react'
import { ErrorMessage, useField, useFormikContext } from 'formik'
import styled from 'styled-components'
import { FieldError } from './FieldError'
import {
  ColorPicker,
  Icon,
  IconPicker,
  Fieldset,
  Label,
  OutsideClick,
  PickerPopover
} from 'src/lib'
import { shapes, typography } from 'src/theme'

const PickerFieldset = styled(Fieldset)`
  margin-right: 1rem;
  max-width: 40px;
  padding: 0;
`

const FieldAnchor = styled.a`
  background: transparent;
  border: ${({ theme }) => `2px dashed ${theme.text}`};
  border-radius: ${shapes.square};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: ${({ value }) => (!value.length ? 'block' : 'none')};
  font-size: ${typography.size.xxxs};
  font-weight: ${typography.weight.regular};
  height: 40px;
  line-height: 3;
  opacity: 1;
  text-align: center;
  width: 40px;

  :hover {
    background-color: ${({ theme }) => theme.hoverFormFields};
    border: ${({ theme }) => `2px dashed ${theme.text}`};
    color: ${({ theme }) => theme.text};
    opacity: 0.9;
  }
`

export const ColorIconField = props => {
  const [stage, setStage] = useState('icon')
  const [toggled, toggle] = useState(false)
  const [field, meta] = useField(props)
  const {
    setFieldValue,
    values: { color_icon }
  } = useFormikContext()

  function onOpen(event) {
    toggle(true)
  }

  function onClose(event) {
    setStage('icon')
    toggle(false)
  }

  function onIconSelect(event, icon) {
    setFieldValue(props.name, { ...color_icon, icon })
    setStage('color')
  }

  function onColorSelect(color, event) {
    setFieldValue(props.name, { ...color_icon, color: color.hex })
  }

  const inputProps = {
    ...field,
    ...props,
    onClick: onOpen
  }

  return (
    <OutsideClick active={toggled} onClick={onClose}>
      <PickerFieldset>
        <Label htmlFor={props.name}>
          {color_icon?.icon?.length ? (
            <Icon
              color={color_icon.color}
              icon={color_icon.icon}
              shape={`circle`}
              transition={`lighten`}
              wrapper
              wrapperProps={{ dimensions: { h: '3rem', w: '3rem' } }}
              {...inputProps}
            />
          ) : (
            <FieldAnchor {...inputProps}>{props.label}</FieldAnchor>
          )}
        </Label>
        <ErrorMessage name={props.name} component={FieldError} {...meta} />

        {toggled && (
          <PickerPopover size={stage}>
            {stage === 'icon' ? (
              <IconPicker
                icon={color_icon.icon}
                onSelect={onIconSelect}
                onStage={event => setStage('color')}
              />
            ) : (
              <ColorPicker
                color={color_icon.color}
                onSelect={onColorSelect}
                onStage={event => setStage('icon')}
              />
            )}
          </PickerPopover>
        )}
      </PickerFieldset>
    </OutsideClick>
  )
}

export default ColorIconField

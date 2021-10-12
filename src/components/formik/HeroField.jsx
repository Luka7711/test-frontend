import { useState } from 'react'
import { ErrorMessage, useField, useFormikContext } from 'formik'
import styled from 'styled-components'
import {
  Fieldset,
  ColorPicker,
  Emoji,
  EmojiPicker,
  Icon,
  IconPicker,
  ImagePicker,
  OutsideClick,
  PickerPopover,
  PickerTabs,
  RemoteImage,
  RemoteSVG
} from 'src/lib'
import { colors, shapes, typography } from 'src/theme'
import { Formatter } from 'src/utils'
import { FieldError } from './FieldError'

const DEFAULT_HERO = {
  name: '',
  size: 0,
  type: '',
  url: '',
  color: '',
  emoji: '',
  icon: ''
}
const TABS = ['upload', 'emoji', 'icon']

const Placeholder = styled.a`
  background: transparent;
  border: ${({ theme }) => `2px dashed ${theme.text}`};
  border-radius: ${shapes.square};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: ${({ value }) => (!value?.length ? 'block' : 'none')};
  font-size: ${typography.size.xxxs};
  font-weight: ${typography.weight.regular};
  height: 40px;
  width: 40px;
  line-height: 3;
  opacity: 1;
  text-align: center;

  :hover {
    background-color: ${({ theme }) => theme.hoverFormFields};
    border: ${({ theme }) => `2px dashed ${theme.text}`};
    color: ${({ theme }) => theme.text};
    opacity: 0.9;
  }
`

const DeleteButton = styled.div`
  background-color: ${colors.danger};
  border-radius: ${shapes.circle};
  color: ${colors.lightest};
  cursor: pointer;
  font-size: ${typography.size.xxxs};
  font-weight: ${typography.weight.semibold};
  height: 1rem;
  opacity: 1;
  position: absolute;
  text-align: center;
  top: -0.5rem;
  right: -0.5rem;
  width: 1rem;

  :active,
  :focus,
  :hover {
    opacity: 0.9;
  }
`

const HeroFieldset = styled(Fieldset)`
  margin-right: 1rem;
  max-width: 40px;
  padding: 0;
  position: relative;

  ${DeleteButton} {
    display: ${({ toggled }) => (toggled ? 'block' : 'none')};
    opacity: 0;
    transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 100ms;
  }

  :active,
  :focus,
  :hover {
    ${DeleteButton} {
      display: block;
      opacity: 1;
    }
  }
`

const Hero = ({ hero, label = 'hero', ...props }) => {
  const { id, color, emoji, icon, name, size, type, url } = hero

  if (url?.length) {
    if (type.includes('svg')) {
      return <RemoteSVG url={url} height={'3rem'} width={'3rem'} {...props} />
    }

    return <RemoteImage alt={name} height={48} src={url} width={48} {...props} />
  }

  if (emoji) {
    return (
      <Emoji
        emoji={emoji}
        size={24}
        shape={`circle`}
        transition={`lighten`}
        wrapper
        wrapperProps={{ dimensions: { h: '3rem', w: '3rem' } }}
        {...props}
      />
    )
  }

  if (icon) {
    return (
      <Icon
        icon={icon}
        color={color}
        shape={`circle`}
        transition={`lighten`}
        wrapper
        wrapperProps={{ dimensions: { h: '3rem', w: '3rem' } }}
        {...props}
      />
    )
  }

  return <Placeholder {...props}>{label}</Placeholder>
}

export const HeroField = ({ tabs = TABS, ...props }) => {
  const [toggled, toggle] = useState(false)
  const [stage, setStage] = useState('icon')
  const [tab, setTab] = useState(TABS[2])
  const [field, meta] = useField(props)
  const {
    setFieldValue,
    values: { hero = [DEFAULT_HERO] }
  } = useFormikContext()

  console.log('hero', hero[0])

  const currentHero = hero[0]

  function onOpen(event) {
    // console.log('onOpen: ', event)
    setStage('icon')
    toggle(true)
  }

  function onClear(event) {
    setFieldValue(props.name, [DEFAULT_HERO])
  }

  function onClose(event) {
    setStage('icon')
    toggle(false)
  }

  function onImageSelect(value) {
    // console.log('onImageSelect: ', value)

    if (value?.length) {
      let { id, name, size, type, url, ...rest } = value[0]

      if (!id) {
        id = Formatter.parseAssetId(name, url)
      }

      setFieldValue(props.name, [{ ...currentHero, id, name, size, type, url, ...rest }])
    } else {
      setFieldValue(props.name, [{ ...currentHero, name: '', size: '', type: '', url: '' }])
    }
  }

  function onEmojiSelect(value) {
    // console.log('onEmojiSelect: ', value)
    setFieldValue(props.name, [{ ...currentHero, emoji: value.id }])
  }

  function onIconSelect(event, value) {
    // console.log('onIconSelect: ', value)
    setFieldValue(props.name, [{ ...currentHero, icon: value }])
    setStage('color')
  }

  function onColorSelect(value, event) {
    //  console.log('onColorSelect: ', value)
    setFieldValue(props.name, [{ ...currentHero, color: value.hex }])
  }

  const fieldProps = {
    ...field,
    ...props
  }

  const PopoverContent = () => {
    switch (tab) {
      case TABS[0]: {
        return <ImagePicker name={props.label} image={currentHero} onSelect={onImageSelect} />
      }
      case TABS[1]: {
        return <EmojiPicker name={props.label} emoji={currentHero.emoji} onSelect={onEmojiSelect} />
      }
      case TABS[2]: {
        return stage === 'icon' ? (
          <IconPicker
            name={props.label}
            color={currentHero?.color}
            icon={currentHero?.icon}
            onSelect={onIconSelect}
            onStage={event => setStage('color')}
          />
        ) : (
          <ColorPicker
            name={props.label}
            color={currentHero?.color}
            icon={currentHero?.icon}
            onSelect={onColorSelect}
            onStage={event => setStage('icon')}
          />
        )
      }
      default: {
        return stage === 'icon' ? (
          <IconPicker
            name={props.label}
            icon={currentHero?.icon}
            onSelect={onIconSelect}
            onStage={event => setStage('color')}
          />
        ) : (
          <ColorPicker
            color={currentHero?.color}
            name={props.label}
            onSelect={onColorSelect}
            onStage={event => setStage('icon')}
          />
        )
      }
    }
  }

  const isHero =
    currentHero?.color?.length ||
    currentHero?.emoji?.length ||
    currentHero?.icon?.length ||
    currentHero?.url?.length

  return (
    <OutsideClick active={toggled} onClick={onClose}>
      <HeroFieldset toggled={toggled}>
        <Hero hero={currentHero} onClick={onOpen} {...fieldProps} />
        {isHero ? <DeleteButton onClick={onClear}>X</DeleteButton> : null}

        {toggled ? (
          <PickerPopover size={tab !== TABS[2] ? tab : stage}>
            <PickerTabs tabs={tabs} currentTab={tab} setTab={setTab} />
            <PopoverContent />
          </PickerPopover>
        ) : null}

        {/* <ErrorMessage name={props.name} component={FieldError} {...meta} {...props} /> */}
      </HeroFieldset>
    </OutsideClick>
  )
}

export default HeroField

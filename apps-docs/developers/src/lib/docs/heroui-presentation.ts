// vx-bot/INFO: Generated from HeroUI docs (Apache-2.0); see content/docs-react-v3/LICENSE-HeroUI.
export const relatedComponents: Record<string, string[]> = {
  accordion: ['disclosuregroup', 'disclosure'],
  alert: ['closebutton', 'button', 'spinner'],
  alertdialog: ['button', 'closebutton'],
  autocomplete: ['list-box', 'popover', 'input'],
  avatar: ['avatargroup', 'separator', 'badge'],
  avatargroup: ['avatar', 'badge', 'chip'],
  badge: ['avatar', 'chip'],
  breadcrumbs: ['link', 'separator', 'tabs'],
  button: ['popover', 'tooltip', 'form'],
  buttongroup: ['button', 'dropdown', 'chip'],
  calendar: ['rangecalendar', 'datefield', 'datepicker'],
  card: ['surface', 'avatar', 'form'],
  checkbox: ['label', 'checkboxgroup', 'description'],
  checkboxgroup: ['checkbox', 'label', 'fieldset'],
  chip: ['avatar', 'closebutton', 'separator'],
  closebutton: ['alert', 'alertdialog', 'chip'],
  colorarea: ['colorswatch', 'colorswatchpicker', 'colorfield'],
  colorfield: ['colorswatch', 'colorswatchpicker', 'colorpicker'],
  colorpicker: ['colorarea', 'colorslider', 'colorswatch'],
  colorslider: ['colorswatch', 'colorswatchpicker', 'colorpicker'],
  colorswatch: ['colorswatchpicker', 'colorfield', 'colorarea'],
  colorswatchpicker: ['colorswatch', 'colorfield', 'colorarea'],
  combobox: ['list-box', 'popover', 'input'],
  datefield: ['datepicker', 'calendar', 'label'],
  datepicker: ['calendar', 'rangecalendar', 'datefield'],
  daterangepicker: ['rangecalendar', 'calendar', 'datefield'],
  description: ['textfield', 'input', 'textarea'],
  disclosure: ['accordion', 'disclosuregroup', 'button'],
  disclosuregroup: ['accordion', 'disclosure', 'button'],
  drawer: ['modal', 'button', 'closebutton'],
  dropdown: ['button', 'popover', 'separator'],
  errormessage: ['taggroup'],
  fielderror: ['textfield', 'input', 'textarea'],
  fieldset: ['textfield', 'label', 'checkboxgroup'],
  form: ['button', 'fieldset', 'textfield'],
  input: ['textfield', 'textarea', 'label'],
  inputgroup: ['textfield', 'input', 'label'],
  inputotp: ['input', 'form', 'surface'],
  kbd: [],
  label: ['input', 'textarea', 'fieldset'],
  link: ['breadcrumbs'],
  listbox: ['select', 'combobox', 'avatar'],
  meter: [],
  modal: ['button', 'tooltip', 'select'],
  numberfield: ['label', 'description', 'fielderror'],
  pagination: ['button', 'link'],
  popover: ['button', 'tooltip', 'select'],
  progressbar: [],
  progresscircle: [],
  radiogroup: ['fieldset', 'surface', 'description'],
  rangecalendar: ['calendar', 'datefield', 'datepicker'],
  scrollshadow: [],
  searchfield: ['label', 'description', 'fielderror'],
  select: ['list-box', 'popover', 'label'],
  separator: ['card', 'chip', 'avatar'],
  sheet: ['drawer', 'modal', 'button'],
  skeleton: ['card', 'avatar'],
  slider: ['label', 'form', 'description'],
  spinner: [],
  surface: ['checkboxgroup', 'fieldset', 'inputotp'],
  switch: ['label', 'description', 'button'],
  table: ['pagination', 'checkbox', 'chip'],
  tabs: ['breadcrumbs'],
  taggroup: ['label', 'description', 'errormessage'],
  text: [],
  textarea: ['textfield', 'input', 'label'],
  textfield: ['input', 'textarea', 'fieldset'],
  timefield: ['label', 'fielderror', 'description'],
  toast: ['button', 'alert', 'closebutton'],
  togglebutton: ['button', 'switch', 'checkbox'],
  togglebuttongroup: ['togglebutton', 'buttongroup', 'button'],
  toolbar: ['buttongroup', 'togglebuttongroup', 'separator'],
  tooltip: ['button', 'popover'],
  typography: []
}

export const relatedShowcases = [
  {
    name: 'apple-iphone-disclosure',
    title: 'Apple iPhone 17 Pro Disclosure',
    description:
      'Product feature showcase with disclosure groups inspired by Apple',
    posterUrl:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/showcases/1.jpg',
    components: ['DisclosureGroup', 'Disclosure', 'Button']
  },
  {
    name: 'apple-iphone-camera-zoom',
    title: 'Apple iPhone 17 Pro Camera Zoom',
    description:
      "Interactive camera zoom showcase inspired by Apple's iPhone 17 Pro",
    posterUrl:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/showcases/2.jpg',
    components: ['Tabs']
  }
]

export const componentGalleryGroups = {
  web: [
    {
      category: 'Buttons',
      components: [
        '(buttons)/button',
        '(buttons)/button-group',
        '(buttons)/close-button',
        '(buttons)/toggle-button',
        '(buttons)/toggle-button-group'
      ]
    },
    {
      category: 'Forms',
      components: [
        '(forms)/checkbox',
        '(forms)/checkbox-group',
        '(forms)/description',
        '(forms)/error-message',
        '(forms)/field-error',
        '(forms)/fieldset',
        '(forms)/form',
        '(forms)/input',
        '(forms)/input-group',
        '(forms)/input-otp',
        '(forms)/label',
        '(forms)/number-field',
        '(forms)/radio-group',
        '(forms)/search-field',
        '(forms)/text-field',
        '(forms)/text-area'
      ]
    },
    {
      category: 'Date and Time',
      components: [
        '(date-and-time)/calendar',
        '(date-and-time)/date-field',
        '(date-and-time)/date-picker',
        '(date-and-time)/date-range-picker',
        '(date-and-time)/range-calendar',
        '(date-and-time)/time-field'
      ]
    },
    {
      category: 'Navigation',
      components: [
        '(navigation)/accordion',
        '(navigation)/breadcrumbs',
        '(navigation)/disclosure',
        '(navigation)/disclosure-group',
        '(navigation)/link',
        '(navigation)/pagination',
        '(navigation)/tabs'
      ]
    },
    {
      category: 'Overlays',
      components: [
        '(overlays)/alert-dialog',
        '(overlays)/drawer',
        '(overlays)/modal',
        '(overlays)/popover',
        '(overlays)/toast',
        '(overlays)/tooltip',
        '(overlays)/sheet'
      ]
    },
    {
      category: 'Collections',
      components: [
        '(collections)/dropdown',
        '(collections)/list-box',
        '(collections)/tag-group'
      ]
    },
    {
      category: 'Controls',
      components: ['(controls)/slider', '(controls)/switch']
    },
    {
      category: 'Feedback',
      components: [
        '(feedback)/alert',
        '(feedback)/meter',
        '(feedback)/progress-bar',
        '(feedback)/progress-circle',
        '(feedback)/skeleton',
        '(feedback)/spinner'
      ]
    },
    {
      category: 'Layout',
      components: [
        '(layout)/card',
        '(layout)/separator',
        '(layout)/surface',
        '(layout)/toolbar'
      ]
    },
    {
      category: 'Media',
      components: ['(media)/avatar', '(media)/avatar-group']
    },
    {
      category: 'Pickers',
      components: [
        '(pickers)/autocomplete',
        '(pickers)/combo-box',
        '(pickers)/select'
      ]
    },
    {
      category: 'Typography',
      components: ['(typography)/kbd', '(typography)/typography']
    },
    {
      category: 'Data Display',
      components: [
        '(data-display)/badge',
        '(data-display)/chip',
        '(data-display)/table'
      ]
    },
    {
      category: 'Colors',
      components: [
        '(colors)/color-area',
        '(colors)/color-field',
        '(colors)/color-picker',
        '(colors)/color-slider',
        '(colors)/color-swatch',
        '(colors)/color-swatch-picker'
      ]
    },
    {
      category: 'Utilities',
      components: ['(utilities)/scroll-shadow']
    }
  ],
  native: [
    {
      category: 'Buttons',
      components: [
        '(buttons)/button',
        '(buttons)/close-button',
        '(buttons)/link-button'
      ]
    },
    {
      category: 'Collections',
      components: ['(collections)/menu', '(collections)/tag-group']
    },
    {
      category: 'Controls',
      components: ['(controls)/slider', '(controls)/switch']
    },
    {
      category: 'Forms',
      components: [
        '(forms)/checkbox',
        '(forms)/control-field',
        '(forms)/description',
        '(forms)/field-error',
        '(forms)/input',
        '(forms)/input-group',
        '(forms)/input-otp',
        '(forms)/label',
        '(forms)/radio-group',
        '(forms)/search-field',
        '(forms)/select',
        '(forms)/text-area',
        '(forms)/text-field'
      ]
    },
    {
      category: 'Navigation',
      components: [
        '(navigation)/accordion',
        '(navigation)/list-group',
        '(navigation)/tabs'
      ]
    },
    {
      category: 'Overlays',
      components: [
        '(overlays)/bottom-sheet',
        '(overlays)/dialog',
        '(overlays)/popover',
        '(overlays)/toast'
      ]
    },
    {
      category: 'Feedback',
      components: [
        '(feedback)/alert',
        '(feedback)/skeleton',
        '(feedback)/skeleton-group',
        '(feedback)/spinner'
      ]
    },
    {
      category: 'Layout',
      components: ['(layout)/card', '(layout)/separator', '(layout)/surface']
    },
    {
      category: 'Media',
      components: ['(media)/avatar']
    },
    {
      category: 'Data Display',
      components: ['(data-display)/chip']
    },
    {
      category: 'Typography',
      components: ['(typography)/text']
    },
    {
      category: 'Utilities',
      components: [
        '(utilities)/pressable-feedback',
        '(utilities)/scroll-shadow'
      ]
    }
  ]
}

export const componentGalleryMedia: {
  imageBaseUrl: string
  nativeVideoBaseUrl: string
  nativeVideoNames: Record<string, string>
} = {
  imageBaseUrl:
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/related-components',
  nativeVideoBaseUrl:
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/native/components/videos',
  nativeVideoNames: {
    'skeleton-group': 'skeleton'
  }
}

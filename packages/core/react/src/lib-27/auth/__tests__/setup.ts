import '@testing-library/jest-dom/vitest'
import { afterAll, beforeAll } from 'vitest'

const elementFromPoint = Object.getOwnPropertyDescriptor(
  document,
  'elementFromPoint'
)
const scrollIntoView = Object.getOwnPropertyDescriptor(
  Element.prototype,
  'scrollIntoView'
)
const publicKeyCredential = Object.getOwnPropertyDescriptor(
  window,
  'PublicKeyCredential'
)
let pointerTarget: Element | null = null
const recordPointerTarget = (event: Event) => {
  pointerTarget = event.target instanceof Element ? event.target : null
}

const getAnimations = Object.getOwnPropertyDescriptor(
  Element.prototype,
  'getAnimations'
)

beforeAll(() => {
  document.addEventListener('pointerdown', recordPointerTarget, true)
  document.addEventListener('mousedown', recordPointerTarget, true)
  Object.defineProperty(document, 'elementFromPoint', {
    configurable: true,
    value: () => pointerTarget
  })
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    configurable: true,
    value: () => undefined
  })
  Object.defineProperty(window, 'PublicKeyCredential', {
    configurable: true,
    value: { isConditionalMediationAvailable: async () => true }
  })
  Object.defineProperty(Element.prototype, 'getAnimations', {
    configurable: true,
    value: () => []
  })
})

afterAll(() => {
  document.removeEventListener('pointerdown', recordPointerTarget, true)
  document.removeEventListener('mousedown', recordPointerTarget, true)
  if (elementFromPoint)
    Object.defineProperty(document, 'elementFromPoint', elementFromPoint)
  else Reflect.deleteProperty(document, 'elementFromPoint')
  if (scrollIntoView)
    Object.defineProperty(Element.prototype, 'scrollIntoView', scrollIntoView)
  else Reflect.deleteProperty(Element.prototype, 'scrollIntoView')
  if (publicKeyCredential)
    Object.defineProperty(window, 'PublicKeyCredential', publicKeyCredential)
  else Reflect.deleteProperty(window, 'PublicKeyCredential')
  if (getAnimations)
    Object.defineProperty(Element.prototype, 'getAnimations', getAnimations)
  else Reflect.deleteProperty(Element.prototype, 'getAnimations')
})

export const requireElement = <T extends Element>(element: T | null): T => {
  if (!element) throw new Error('Expected the element to exist')
  return element
}

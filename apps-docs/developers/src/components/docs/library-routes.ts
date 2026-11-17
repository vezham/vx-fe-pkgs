import { type UiLibrary, uiLibraries } from '../../config/ui-libraries'

export const getUiLibraryRoute = (library: UiLibrary) =>
  `/{-$lang}${uiLibraries[library].routeBase}/$platform/$` as const

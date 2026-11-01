import { createTamizhiClient } from '@vezham/tamizhi-client'

const apiURL = import.meta.env.V_TAMIZHI_API_URL
export const tamizhiClient = apiURL
  ? createTamizhiClient({ baseURL: apiURL, credentials: 'include' })
  : undefined

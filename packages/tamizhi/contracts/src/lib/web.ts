import { z } from 'zod'

export const webSourceSchema = z
  .object({
    id: z.string().max(128),
    url: z.string().url().max(2048),
    title: z.string().max(500),
    domain: z.string().max(253),
    retrievedAt: z.string().max(64),
    snippet: z.string().max(1000).optional()
  })
  .strict()
export const webDocumentSchema = z
  .object({
    pageId: z.string().max(128).optional(),
    url: z.string().url().max(2048).optional(),
    title: z.string().max(500).optional(),
    content: z.string().max(16000).optional(),
    headings: z.array(z.string().max(500)).max(30).optional(),
    sources: z.array(webSourceSchema).max(6).optional(),
    retrievedAt: z.string().max(64).optional()
  })
  .strict()

export type WebSource = z.infer<typeof webSourceSchema>
export type WebDocument = z.infer<typeof webDocumentSchema>

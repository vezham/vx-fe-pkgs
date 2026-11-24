import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$lang}/docs/assets/')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/{-$lang}/docs/assets/icons',
      params: { lang: params.lang }
    })
  }
})

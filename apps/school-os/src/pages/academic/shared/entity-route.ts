export const createEntityRoute = (moduleRoutePath: string) => {
  const getBasePath = (pathname: string) => {
    const routeIndex = pathname.indexOf(moduleRoutePath)

    if (routeIndex < 0) {
      return pathname.replace(/\/$/, '')
    }

    return pathname.slice(0, routeIndex + moduleRoutePath.length)
  }

  const getRowIdFromPath = (pathname: string) => {
    const basePath = getBasePath(pathname)

    if (!pathname.startsWith(`${basePath}/`)) {
      return null
    }

    const [id] = pathname.slice(basePath.length + 1).split('/')

    return id ? decodeURIComponent(id) : null
  }

  const getRowUrl = (row: { id: string }, mode: 'view' | 'edit' = 'view') => {
    const url = new URL(window.location.href)

    url.pathname = `${getBasePath(url.pathname)}/${encodeURIComponent(row.id)}`
    url.searchParams.set('mode', mode)
    url.searchParams.delete('id')
    url.hash = ''

    return url.toString()
  }

  const updateDrawerQuery = (
    nextState: { id?: string; mode: 'create' | 'view' | 'edit' } | null,
    replace = false
  ) => {
    const url = new URL(window.location.href)
    const basePath = getBasePath(url.pathname)

    if (nextState) {
      url.pathname =
        nextState.mode === 'create' || !nextState.id
          ? basePath
          : `${basePath}/${encodeURIComponent(nextState.id)}`
      url.searchParams.delete('id')
      url.searchParams.set('mode', nextState.mode)
    } else {
      url.pathname = basePath
      url.searchParams.delete('mode')
      url.searchParams.delete('id')
    }

    window.history[replace ? 'replaceState' : 'pushState'](
      null,
      '',
      `${url.pathname}${url.search}${url.hash}`
    )
  }

  return { getBasePath, getRowIdFromPath, getRowUrl, updateDrawerQuery }
}

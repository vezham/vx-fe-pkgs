import { useLocation } from '@tanstack/react-router'

const NavigationDemoContent = () => {
  const { href } = useLocation()

  return <p className="text-muted font-mono text-sm break-all">{href}</p>
}

export default NavigationDemoContent

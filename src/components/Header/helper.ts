import LocalStorage from '@/lib/localStorage'

export interface Link {
  href: string,
  title: string,
  secured?: boolean,
  isLogin?: boolean,
  handler?: () => void
}

export const links: Link[] = [
  {
    href: '/',
    title: 'Home'
  },
  {
    href: '/search',
    title: 'Search'
  },
  {
    href: '/fridge',
    title: 'Fridge',
    secured: true
  },
  {
    href: '/authorization',
    title: 'Sign in',
    isLogin: true
  },
  {
    href: '/',
    title: 'Log out',
    secured: true,
    handler: LocalStorage.removeUser
  }
]

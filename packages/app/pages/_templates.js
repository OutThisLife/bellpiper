import dynamic from 'next/dynamic'

export default {
  '/': dynamic(import('./home')),
  'pay': dynamic(import('./pay')),
  'journal': dynamic(import('./journal')),
  'report': dynamic(import('./report')),
  'simulator': dynamic(import('./simulator'))
}

import React from 'react'

/**
 * Registry of components available for page composition.
 * storybook-blank version — maps to shadcn/ui primitives.
 *
 * storybook-blank contains only primitive components (Card, Alert, etc.),
 * not section-level CMS components. This registry demonstrates the pattern
 * using composable layout blocks instead of full-page sections.
 *
 * Pattern is identical to the main storybook registry — only import paths differ.
 */

// Inline fallback using React.createElement — no JSX in .ts files
const UnknownComponent = ({ contentType }: { id: string; contentType: string }) =>
  React.createElement(
    'div',
    { className: 'm-5 rounded border border-red-400 p-5' },
    React.createElement('p', { className: 'font-semibold' }, 'Component Not Found'),
    React.createElement(
      'p',
      { className: 'text-sm text-gray-500' },
      'Type ',
      React.createElement('span', { className: 'font-mono font-bold' }, contentType),
      ' is not registered.'
    )
  )

// Lazy-import wrappers to avoid barrel import issues with shadcn/ui
// Add components here as the design system grows
export const componentRegistry: Record<string, React.ComponentType<any>> = {
  // Primitives available in storybook-blank
  // Extend this list as more section-level components are added
}

export const resolveComponent = (type: string): React.ComponentType<any> =>
  componentRegistry[type] ?? UnknownComponent

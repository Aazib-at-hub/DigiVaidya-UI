# DigiVaidya Frontend Developer Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [Development Workflow](#development-workflow)
6. [Component Architecture](#component-architecture)
7. [Styling Guidelines](#styling-guidelines)
8. [State Management](#state-management)
9. [API Integration](#api-integration)
10. [Testing](#testing)
11. [Build & Deployment](#build--deployment)
12. [Best Practices](#best-practices)

## Project Overview

DigiVaidya is a modern healthcare management application built with React and TypeScript. The frontend provides an intuitive interface for managing patients, reports, and medical data.

### Key Features
- Patient management system
- Dashboard with analytics
- Reports generation
- Responsive design
- Modern UI components

## Tech Stack

### Core Technologies
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library based on Radix UI
- **Routing**: React Router (if implemented)
- **State Management**: React Context/Redux (to be confirmed)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript
- **Testing**: Vitest/Jest + React Testing Library

## Project Structure

```
DigiVaidya-main/
├── client/                     # Frontend source code
│   ├── components/            
│   │   ├── ui/               # Reusable UI components
│   │   └── patients/         # Feature-specific components
│   ├── pages/                # Page components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── App.tsx               # Root component
│   └── global.css            # Global styles
├── server/                   # Backend API
├── shared/                   # Shared utilities
├── public/                   # Static assets
├── netlify/                  # Netlify functions
└── Configuration files
```

### Key Directories

#### `/client/components/ui/`
Contains reusable UI components following a consistent design system:
- `button.tsx` - Button component with variants
- `card.tsx` - Card container component
- `form.tsx` - Form components and validation
- `input.tsx` - Input field component
- `dialog.tsx` - Modal/dialog component
- And many more...

#### `/client/components/patients/`
Feature-specific components for patient management:
- `PatientForm.tsx` - Patient registration/edit form
- `patientSchema.ts` - Validation schemas

#### `/client/pages/`
Page-level components:
- `Dashboard.tsx` - Main dashboard
- `Patients.tsx` - Patient listing page
- `Reports.tsx` - Reports page
- `Results.tsx` - Results page

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm (latest version)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aazib-at-hub/DigiVaidya-UI.git
   cd DigiVaidya-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   - Copy `.env.example` to `.env` (if available)
   - Configure environment variables:
     ```env
     API_URL=https://api.example.com
     VITE_APP_NAME=DigiVaidya
     VITE_FEATURE_FLAG=true
     ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:8080
   - The app will automatically reload on file changes

## Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Git Workflow

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -m "feat: description"`
3. Push branch: `git push origin feature/feature-name`
4. Create Pull Request

### Commit Convention
Follow conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests

## Component Architecture

### Component Structure
```tsx
// components/ui/button.tsx
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline"
  size?: "default" | "sm" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

export { Button }
```

### Component Guidelines

1. **Use TypeScript interfaces** for all props
2. **Forward refs** for UI components
3. **Use cn() utility** for conditional classes
4. **Export components** with named exports
5. **Document complex components** with JSDoc

### Custom Hooks

Location: `/client/hooks/`

Example:
```tsx
// hooks/use-mobile.tsx
import { useEffect, useState } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  return isMobile
}
```

## Styling Guidelines

### Tailwind CSS

The project uses Tailwind CSS for styling with a custom configuration.

#### Key Classes
- **Layout**: `flex`, `grid`, `container`
- **Spacing**: `p-4`, `m-2`, `gap-4`
- **Colors**: Custom color palette defined in `tailwind.config.ts`
- **Typography**: `text-sm`, `font-medium`, `leading-tight`

#### Component Styling Pattern
```tsx
const Card = ({ children, className, ...props }) => (
  <div
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
)
```

#### CSS Variables
Custom properties defined in `global.css`:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... */
}
```

### Design Tokens

- **Colors**: Primary, secondary, accent colors
- **Typography**: Font sizes, weights, line heights
- **Spacing**: Consistent spacing scale
- **Shadows**: Card and element shadows
- **Borders**: Border radius and widths

## State Management

### Current Approach
- **Local State**: useState for component-level state
- **Context API**: For sharing state across components
- **Custom Hooks**: For reusable stateful logic

### Future Considerations
- Consider Redux Toolkit for complex state management
- Zustand for simpler global state needs
- React Query for server state management

## API Integration

### API Client
Location: `/shared/api.ts`

```tsx
// shared/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = {
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    return response.json()
  },
  
  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}
```

### Data Fetching Patterns

```tsx
// Example: Patient data fetching
import { useEffect, useState } from 'react'
import { api } from '@shared/api'

export function usePatients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get('/patients')
      .then(setPatients)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { patients, loading, error }
}
```

## Testing

### Testing Strategy
- **Unit Tests**: Component logic and utilities
- **Integration Tests**: Component interactions
- **E2E Tests**: Critical user flows

### Testing Setup
```bash
npm run test          # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Example Test
```tsx
// components/ui/button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })
})
```

## Build & Deployment

### Production Build
```bash
npm run build
```

Output directory: `dist/spa/`

### Deployment Options

#### Netlify (Recommended)
- Automatic deployments from GitHub
- Environment variables via Netlify dashboard
- Build command: `npm run build`
- Publish directory: `dist/spa`

#### Vercel
- Connect GitHub repository
- Auto-detects Vite configuration
- Serverless functions support

### Environment Variables
- `VITE_API_URL` - API base URL
- `VITE_APP_NAME` - Application name
- `VITE_FEATURE_FLAG` - Feature toggles

## Best Practices

### Code Quality
1. **Use TypeScript** for all new code
2. **Follow ESLint rules** - fix warnings and errors
3. **Write meaningful component names** and props
4. **Keep components small** and focused
5. **Use custom hooks** for reusable logic

### Performance
1. **Lazy load pages** with React.lazy()
2. **Optimize images** - use appropriate formats and sizes
3. **Code splitting** for large components
4. **Memoization** for expensive computations

### Accessibility
1. **Semantic HTML** elements
2. **ARIA labels** for interactive elements
3. **Keyboard navigation** support
4. **Color contrast** compliance
5. **Screen reader** testing

### Security
1. **Sanitize user inputs**
2. **Validate environment variables**
3. **Use HTTPS** in production
4. **Secure API endpoints**

## Troubleshooting

### Common Issues

#### Development Server Issues
```bash
# Clear cache and restart
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### Build Issues
```bash
# Type checking
npm run type-check

# Check for linting errors
npm run lint
```

#### Styling Issues
- Check Tailwind configuration
- Verify CSS imports
- Inspect browser developer tools

### Getting Help

1. **Check documentation** first
2. **Search existing issues** on GitHub
3. **Ask team members** for guidance
4. **Create detailed bug reports** with reproduction steps

## Contributing

### Code Review Checklist
- [ ] TypeScript types are properly defined
- [ ] Components are tested
- [ ] Styling follows design system
- [ ] Code is properly documented
- [ ] No console.log statements
- [ ] Accessibility considerations met

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing done

## Screenshots
Include relevant screenshots
```

---

**Last Updated**: September 2025  
**Maintainer**: Frontend Team  
**Questions?** Contact the development team or create an issue on GitHub.

# NoteCards

A small SPA (single-page app) for notes using TypeScript, Vue 3, Nuxt 3, and TailwindCSS.

---

## 🚀 Technologies Used

- **Vue 3** & **Nuxt 3**: Modern, performant, and modular frontend framework.
- **TypeScript**: Type-safe codebase for reliability and maintainability.
- **Pinia**: State management for reactive data flow.
- **TailwindCSS**: Utility-first CSS for rapid UI development.
- **CLSX & Tailwind-merge**: For robust and conflict-free Tailwind class merging.
- **Simple-git-hooks & nano-staged**: Automated code formatting and linting.
- **Prettier & ESLint**: Code style and quality enforcement.

---

## ✨ Key Features

- **Notes CRUD**: Create, read, update, and delete notes with different card types (default, image, checkbox).
- **Dynamic Routing**: Each note has its own dynamic route for detailed view and editing.
- **Reusable Components**: Modular UI components (Card, Input, TextArea, Select, Modal, etc.) for maintainability.
- **Smooth Animations**: Subtle transitions and hover effects for a polished user experience.
- **Pixel-Perfect UI**: Attention to detail for crisp, consistent visuals across browsers.
- **Responsive Design**: Fully responsive grid and layouts for all device sizes.
- **Filter & Search**: Filter notes by type using a custom FilterSelect component.
- **Image Upload**: Add images to notes with instant preview.
- **Pinia state store** — Centralized and reactive state management.
- **Accessibility**: Semantic HTML, keyboard navigation, and ARIA attributes for inclusive UX.
- **SEO Optimized**: Dynamic meta tags and descriptions for each note/page.
- **High Performance**: Lazy loading, optimized assets, and best practices for fast load times.

---

## 🛠️ Functionalities

- **Add New Note**: Modal form with dynamic fields based on card type.
- **Edit Note**: Prefilled modal for updating existing notes.
- **Delete Note**: Confirmation modal to prevent accidental deletions.
- **Checkbox Notes**: Interactive checklist cards with persistent state.
- **Image Notes**: Upload and display images in notes.
- **Type Filtering**: Instantly filter notes by type with multi-select dropdown.

---

## 📁 Code Structure

- `/components`: Reusable UI and logic components (Card, Button, Modal, etc.)
- `/pages`: Nuxt pages, including dynamic `[id].vue` for single note view.
- `/stores`: Pinia stores for state management.
- `/data`: Static JSON data for initial notes.
- `/types`: TypeScript interfaces and types.
- `/assets`: Images and static assets.
- `/utils`: Utility functions (e.g., class merging).

---

## ♿ SEO, Accessibility & Best Practices

- **SEO**: Dynamic titles and meta descriptions per page.
- **Accessibility**: Focus management, ARIA labels, keyboard-friendly modals and forms.
- **Performance**: Optimized images, minimal bundle size, and efficient state updates.
- **Responsiveness**: Tailwind breakpoints and grid utilities for all screens.

---

## 🧩 Extras

### Automated Formatting & Linting

- **Simple-git-hooks** and **nano-staged**: Run Prettier and ESLint automatically before each commit.
- **Prettier**: Consistent code formatting.
- **ESLint**: Enforces code quality and best practices.

### Utility Libraries

- **CLSX** and **Tailwind-merge**: Safely merge and deduplicate Tailwind classes for dynamic styling.

### Component Design

- **Reusable Components**: All UI elements are modular and composable.
- **Smooth Animations**: Transitions and hover states for interactive feedback.

### TypeScript

- **Strict Typing**: All data and props are strongly typed for safety and IDE support.

---

## 📝 Development

### Setup

```bash
# pnpm
pnpm install
```

### Development Server

```bash
# pnpm
pnpm dev
```

---

## 📄 License

MIT

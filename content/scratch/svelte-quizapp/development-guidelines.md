# Development Guidelines

## Svelte 5 Syntax Requirements

### Runes Usage
- ALWAYS use Svelte 5 Runes syntax
- NEVER use legacy Svelte syntax with '$' prefix
- Use `let` with `$state` for reactive state declarations:
  ```ts
  // ✅ Correct
  let count = $state(0);
  let items = $state<string[]>([]);
  
  // ❌ Incorrect
  const count = $state(0);
  $: doubled = count * 2;
  ```

### Props Declaration
- Use `$props` for component props:
  ```ts
  // ✅ Correct
  const props = $props<{
    title: string;
    onSubmit: () => void;
  }>();
  
  // ❌ Incorrect
  export let title: string;
  export let onSubmit: () => void;
  ```

### Derived Values
- Use `$derived` for computed values:
  ```ts
  // ✅ Correct
  let total = $derived(items.reduce((sum, item) => sum + item.price, 0));
  
  // ❌ Incorrect
  $: total = items.reduce((sum, item) => sum + item.price, 0);
  ```

## XML Content Requirements

### Markdown in XML
- ALWAYS wrap markdown content in CDATA sections when inside XML elements
- This prevents XML parsing errors from special characters in markdown
  ```xml
  <!-- ✅ Correct -->
  <content><![CDATA[
  ## Heading

  - List item 1
  - List item 2

  > Blockquote
  ]]></content>
  
  <!-- ❌ Incorrect -->
  <content>
  ## Heading

  - List item 1
  - List item 2

  > Blockquote
  </content>
  ```

## Accessibility (a11y) Requirements

### Zero Warnings Policy
- All components MUST have zero a11y warnings
- Run accessibility checks during development
- Fix warnings immediately when detected

### Button Requirements
- All buttons MUST have:
  - Descriptive text or aria-label
  - Proper role attribute when needed
  - Keyboard navigation support
  ```html
  <!-- ✅ Correct -->
  <button 
    type="button"
    aria-label="Toggle menu"
    class="toolbar-btn"
  >
    <svg aria-hidden="true">...</svg>
  </button>
  
  <!-- ❌ Incorrect -->
  <button class="toolbar-btn">
    <svg>...</svg>
  </button>
  ```

### Form Controls
- All form inputs MUST have:
  - Associated labels
  - Proper aria attributes
  - Clear error states
  ```html
  <!-- ✅ Correct -->
  <label for="name">Full Name</label>
  <input 
    id="name"
    type="text"
    aria-invalid={hasError}
    aria-describedby="name-error"
  />
  <div id="name-error" role="alert">
    {errorMessage}
  </div>
  
  <!-- ❌ Incorrect -->
  <input type="text" placeholder="Enter name" />
  ```

### Interactive Elements
- Ensure proper focus management
- Maintain logical tab order
- Provide visible focus indicators
- Support keyboard interactions

### ARIA Landmarks
- Use appropriate landmark roles
- Ensure unique landmark labels
- Maintain proper nesting
  ```html
  <!-- ✅ Correct -->
  <header role="banner">
    <nav aria-label="Main">...</nav>
  </header>
  <main role="main">...</main>
  <footer role="contentinfo">...</footer>
  ```

## Code Style

### TypeScript
- Use strict type checking
- Avoid `any` types
- Define interfaces for data structures
- Use type assertions sparingly

### Component Structure
- Keep components focused and single-purpose
- Extract reusable logic into separate files
- Follow a consistent file organization pattern

### CSS/Styling
- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Maintain consistent spacing and sizing

## Performance Considerations

### State Management
- Keep state as local as possible
- Use `$derived` for computed values
- Avoid unnecessary state updates

### Rendering Optimization
- Use proper keying for lists
- Avoid expensive computations in render
- Lazy load components when appropriate

## Testing Requirements

### Component Testing
- Test all user interactions
- Verify accessibility features
- Test responsive behavior

### State Testing
- Verify state transitions
- Test derived state calculations
- Check error handling

## Documentation

### Component Documentation
- Document props and events
- Include usage examples
- Document accessibility features

### Code Comments
- Explain complex logic
- Document workarounds
- Include references to related code
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Placeholder from '@tiptap/extension-placeholder';
  import type { Question, Answer } from '$lib/types';

  const props = $props<{
    question: Question;
    answer: Answer | undefined;
    onAnswer: (answer: Answer) => void;
  }>();

  let element: HTMLElement;
  let editor = $state<Editor | null>(null);

  onMount(() => {
    editor = new Editor({
      element,
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3]
          },
          bulletList: {
            keepMarks: true,
            keepAttributes: false
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false
          }
        }),
        Placeholder.configure({
          placeholder: 'Write your answer here...'
        })
      ],
      content: props.answer?.value?.toString() || '',
      onUpdate: ({ editor }) => {
        props.onAnswer({
          questionId: props.question.id,
          value: editor.getHTML()
        });
      }
    });
  });

  onDestroy(() => {
    editor?.destroy();
  });

  function toggleBold() {
    editor?.chain().focus().toggleBold().run();
  }

  function toggleItalic() {
    editor?.chain().focus().toggleItalic().run();
  }

  function toggleBulletList() {
    editor?.chain().focus().toggleBulletList().run();
  }

  function toggleOrderedList() {
    editor?.chain().focus().toggleOrderedList().run();
  }

  function toggleHeading() {
    editor?.chain().focus().toggleHeading({ level: 2 }).run();
  }

  function toggleCodeBlock() {
    editor?.chain().focus().toggleCodeBlock().run();
  }
</script>

<div class="markdown-editor">
  <div class="toolbar" role="toolbar" aria-label="Text formatting">
    <button 
      type="button"
      class="toolbar-btn"
      aria-label="Toggle bold"
      title="Bold"
      onclick={toggleBold}
      class:active={editor?.isActive('bold')}
      aria-pressed={editor?.isActive('bold')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
      </svg>
    </button>
    
    <button 
      type="button"
      class="toolbar-btn"
      aria-label="Toggle italic"
      title="Italic"
      onclick={toggleItalic}
      class:active={editor?.isActive('italic')}
      aria-pressed={editor?.isActive('italic')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="19" y1="4" x2="10" y2="4"/>
        <line x1="14" y1="20" x2="5" y2="20"/>
        <line x1="15" y1="4" x2="9" y2="20"/>
      </svg>
    </button>
    
    <button 
      type="button"
      class="toolbar-btn"
      aria-label="Toggle bullet list"
      title="Bullet List"
      onclick={toggleBulletList}
      class:active={editor?.isActive('bulletList')}
      aria-pressed={editor?.isActive('bulletList')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="9" y1="6" x2="20" y2="6"/>
        <line x1="9" y1="12" x2="20" y2="12"/>
        <line x1="9" y1="18" x2="20" y2="18"/>
        <circle cx="4" cy="6" r="2"/>
        <circle cx="4" cy="12" r="2"/>
        <circle cx="4" cy="18" r="2"/>
      </svg>
    </button>
    
    <button 
      type="button"
      class="toolbar-btn"
      aria-label="Toggle numbered list"
      title="Numbered List"
      onclick={toggleOrderedList}
      class:active={editor?.isActive('orderedList')}
      aria-pressed={editor?.isActive('orderedList')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="10" y1="6" x2="21" y2="6"/>
        <line x1="10" y1="12" x2="21" y2="12"/>
        <line x1="10" y1="18" x2="21" y2="18"/>
        <path d="M4 6h1v4"/>
        <path d="M4 10h2"/>
        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>
      </svg>
    </button>
    
    <button 
      type="button"
      class="toolbar-btn"
      aria-label="Toggle heading"
      title="Heading"
      onclick={toggleHeading}
      class:active={editor?.isActive('heading', { level: 2 })}
      aria-pressed={editor?.isActive('heading', { level: 2 })}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 12h16"/>
        <path d="M4 18V6"/>
        <path d="M20 18V6"/>
      </svg>
    </button>
    
    <button 
      type="button"
      class="toolbar-btn"
      aria-label="Toggle code block"
      title="Code Block"
      onclick={toggleCodeBlock}
      class:active={editor?.isActive('codeBlock')}
      aria-pressed={editor?.isActive('codeBlock')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    </button>
  </div>

  <div 
    bind:this={element} 
    class="editor-content"
    role="textbox"
    aria-multiline="true"
    aria-label="Rich text editor"
  />
</div>

<style>
  .markdown-editor {
    @apply border border-gray-300 rounded-lg overflow-hidden;
  }

  .toolbar {
    @apply flex flex-wrap gap-2 p-3 border-b border-gray-200 bg-gray-50;
  }

  .toolbar-btn {
    @apply p-1.5 rounded text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500;
  }

  .toolbar-btn.active {
    @apply bg-gray-200 text-gray-800;
  }

  .toolbar-btn svg {
    @apply w-4 h-4;
  }

  .editor-content {
    @apply p-4;
  }

  :global(.ProseMirror) {
    @apply outline-none min-h-[200px] leading-relaxed text-gray-700;
  }
  
  :global(.ProseMirror p) {
    @apply mb-4 last:mb-0;
  }

  :global(.ProseMirror h1) {
    @apply text-2xl font-semibold mb-6 mt-8 first:mt-0;
  }

  :global(.ProseMirror h2) {
    @apply text-xl font-semibold mb-4 mt-6;
  }

  :global(.ProseMirror h3) {
    @apply text-lg font-semibold mb-3 mt-5;
  }
  
  :global(.ProseMirror p.is-editor-empty:first-child::before) {
    @apply text-gray-400 float-left pointer-events-none h-0;
    content: attr(data-placeholder);
  }

  :global(.ProseMirror ul) {
    @apply list-disc pl-6 mb-4 space-y-1;
  }

  :global(.ProseMirror ol) {
    @apply list-decimal pl-6 mb-4 space-y-1;
  }

  :global(.ProseMirror li) {
    @apply mb-1;
  }

  :global(.ProseMirror li p) {
    @apply mb-1;
  }

  :global(.ProseMirror li ul, .ProseMirror li ol) {
    @apply mt-1 mb-1;
  }

  :global(.ProseMirror pre) {
    @apply bg-slate-900 p-4 rounded-lg mb-4 font-mono text-sm leading-6 overflow-x-auto shadow-sm;
  }

  :global(.ProseMirror pre code) {
    @apply text-slate-50 bg-transparent p-0 block;
  }

  :global(.ProseMirror code) {
    @apply font-mono bg-slate-100 px-1.5 py-0.5 rounded text-sm text-slate-800;
  }

  :global(.ProseMirror blockquote) {
    @apply border-l-4 border-gray-200 pl-4 italic text-gray-600 mb-4;
  }
</style>
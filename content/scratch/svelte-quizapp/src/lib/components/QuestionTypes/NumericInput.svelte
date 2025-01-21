<script lang="ts">
  import type { Question, Answer } from '$lib/types';

  const props = $props<{
    question: Question;
    answer: Answer | undefined;
    onAnswer: (answer: Answer, error?: string) => void;
  }>();

  let value = $state(props.answer?.value?.toString() || '');
  let error = $state<string | null>(null);

  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const numValue = parseFloat(input.value);
    
    if (!isNaN(numValue)) {
      if (props.question.maxValue !== undefined && numValue > props.question.maxValue) {
        error = `Value cannot exceed ${props.question.maxValue}`;
        props.onAnswer({
          questionId: props.question.id,
          value: numValue
        }, error);
        return;
      }
      if (props.question.minValue !== undefined && numValue < props.question.minValue) {
        error = `Value must be at least ${props.question.minValue}`;
        props.onAnswer({
          questionId: props.question.id,
          value: numValue
        }, error);
        return;
      }
      
      error = null;
      value = input.value;
      props.onAnswer({
        questionId: props.question.id,
        value: numValue
      }, null);
    }
  }
</script>

<div class="space-y-2">
  <input
    type="number"
    step="1"
    min={props.question.minValue}
    max={props.question.maxValue}
    value={value}
    oninput={handleInput}
    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
    class:border-red-500={error}
    placeholder="Enter a number..."
    aria-label={props.question.text}
    aria-invalid={!!error}
    aria-describedby={error ? `${props.question.id}-error` : undefined}
  />
  
  {#if error}
    <p 
      id="{props.question.id}-error" 
      class="text-red-500 text-sm"
      role="alert"
    >
      {error}
    </p>
  {/if}
</div>
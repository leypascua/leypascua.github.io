<script lang="ts">
  import type { Question, Answer } from '$lib/types';

  const props = $props<{
    question: Question;
    answer: Answer | undefined;
    onAnswer: (answer: Answer, error?: string) => void;
  }>();

  let selectedValues = $state<string[]>((props.answer?.value as string[]) || []);
  let error = $state<string | null>(null);

  function handleChange(value: string) {
    if (props.question.allowMultiple) {
      const index = selectedValues.indexOf(value);
      if (index === -1) {
        // Check maxValue before adding
        if (props.question.maxValue !== undefined && selectedValues.length >= props.question.maxValue) {
          error = `You can select up to ${props.question.maxValue} options`;
          props.onAnswer({
            questionId: props.question.id,
            value: [...selectedValues]
          }, error);
          return;
        }
        selectedValues.push(value);
        error = null;
      } else {
        selectedValues.splice(index, 1);
        error = null;
      }
    } else {
      selectedValues.length = 0;
      selectedValues.push(value);
      error = null;
    }
    
    props.onAnswer({
      questionId: props.question.id,
      value: [...selectedValues]
    }, error);
  }
</script>

<div class="space-y-4">
  {#each props.question.choices || [] as choice}
    <label class="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
      <input
        type={props.question.allowMultiple ? 'checkbox' : 'radio'}
        name={props.question.id}
        value={choice.value}
        checked={selectedValues.includes(choice.value)}
        onchange={() => handleChange(choice.value)}
        class="h-5 w-5 text-blue-600"
        aria-invalid={!!error}
        aria-describedby={error ? `${props.question.id}-error` : undefined}
      />
      <span class="text-gray-700">{choice.text}</span>
    </label>
  {/each}
  
  {#if error}
    <p 
      id="{props.question.id}-error" 
      class="text-red-500 text-sm mt-2"
      role="alert"
    >
      {error}
    </p>
  {/if}
</div>
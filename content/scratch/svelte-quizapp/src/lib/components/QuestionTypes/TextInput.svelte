<script lang="ts">
  import type { Question, Answer } from '$lib/types';

  const props = $props<{
    question: Question;
    answer: Answer | undefined;
    onAnswer: (answer: Answer) => void;
  }>();

  let value = $state(props.answer?.value?.toString() || '');

  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    value = input.value;
    props.onAnswer({
      questionId: props.question.id,
      value: input.value
    });
  }
</script>

<input
  type="text"
  value={value}
  oninput={handleInput}
  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  placeholder="Type your answer here..."
/>
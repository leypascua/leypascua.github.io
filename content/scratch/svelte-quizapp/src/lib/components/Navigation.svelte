<script lang="ts">
  const props = $props<{
    canGoBack: boolean;
    canGoForward: boolean;
    isLastQuestion: boolean;
    submitRemarks?: string;
    isFirstPage: boolean;
    submitted: boolean;
    onPrevious: () => void;
    onNext: () => void;
  }>();
</script>

<div class="flex flex-col items-center mt-8 max-w-[960px] mx-auto">
  <div class="flex justify-between w-full">
    {#if props.canGoBack}
      <button
        class="px-6 py-2 rounded-lg bg-white border border-[#dee2e6] text-[#212529] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        onclick={props.onPrevious}
      >
        Previous
      </button>
    {:else}
      <div></div>
    {/if}
    
    {#if props.isFirstPage && props.submitted}
      <div class="text-gray-600">A response has already been submitted</div>
    {:else}
      <button
        class="px-6 py-2 rounded-lg bg-[#0d6efd] text-white hover:bg-[#0b5ed7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={!props.canGoForward}
        onclick={props.onNext}
      >
        {props.isLastQuestion ? 'Submit' : 'Next'}
      </button>
    {/if}
  </div>

  {#if props.isLastQuestion && props.submitRemarks}
    <p class="text-gray-600 text-sm mt-4 text-center">{props.submitRemarks}</p>
  {/if}
</div>
<script lang="ts">
  import { onMount } from 'svelte';
  import QuestionCard from './lib/components/QuestionCard.svelte';
  import Navigation from './lib/components/Navigation.svelte';
  import ProgressBar from './lib/components/ProgressBar.svelte';
  import type { Page, Answer } from './lib/types';
  import { QuizService } from './lib/services/quizService';

  let pages = $state<Page[]>([]);
  let currentPageIndex = $state(0);
  let answers = $state<Answer[]>([]);
  let errors = $state<Record<string, string>>({});
  let submitted = $state(false);
  let showingThankYou = $state(false);

  let currentPage = $derived(pages[currentPageIndex]);
  let hasErrors = $derived(Object.keys(errors).length > 0);
  let canGoForward = $derived(
    !hasErrors && 
    (currentPage?.questions.every(q => 
      !q.required || answers.some(a => a.questionId === q.id)
    ) ?? false)
  );
  let isLastPage = $derived(currentPageIndex === pages.length - 1);
  let showSubmit = $derived(currentPage?.submit === true);
  let isFirstPage = $derived(currentPageIndex === 0);

  onMount(async () => {
    try {
      const quizService = QuizService.getInstance();
      pages = await quizService.loadQuiz();
      
      // Check if already submitted
      const savedSubmission = localStorage.getItem('quizSubmitted');
      if (savedSubmission === 'true') {
        submitted = true;
      }
    } catch (error) {
      console.error('Error loading quiz:', error);
    }
  });

  function handleAnswer(answer: Answer, error?: string) {
    const index = answers.findIndex(a => a.questionId === answer.questionId);
    
    if (index >= 0) {
      answers[index] = answer;
    } else {
      answers = [...answers, answer];
    }

    // Update errors
    if (error) {
      errors[answer.questionId] = error;
    } else {
      delete errors[answer.questionId];
      errors = errors; // Trigger reactivity
    }
  }

  function validateCurrentPage(): boolean {
    let isValid = true;

    // Clear existing errors first
    errors = {};

    // Check each question on the current page
    currentPage?.questions.forEach(question => {
      const answer = answers.find(a => a.questionId === question.id);

      // Required field validation
      if (question.required && !answer) {
        errors[question.id] = 'This field is required';
        isValid = false;
        return;
      }

      // Multiple choice validation
      if (question.type === 'multiple-choice' && answer) {
        const selectedValues = answer.value as string[];
        if (question.maxValue !== undefined && selectedValues.length > question.maxValue) {
          errors[question.id] = `You can select up to ${question.maxValue} options`;
          isValid = false;
        }
      }

      // Numeric validation
      if (question.type === 'numeric' && answer) {
        const value = answer.value as number;
        if (question.maxValue !== undefined && value > question.maxValue) {
          errors[question.id] = `Value cannot exceed ${question.maxValue}`;
          isValid = false;
        }
        if (question.minValue !== undefined && value < question.minValue) {
          errors[question.id] = `Value must be at least ${question.minValue}`;
          isValid = false;
        }
      }
    });

    // Trigger reactivity for errors
    errors = errors;
    return isValid;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePrevious() {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      scrollToTop();
    }
  }

  function handleNext() {
    // Validate all questions on the current page
    if (!validateCurrentPage()) {
      return; // Stop if there are validation errors
    }

    if (currentPage.submit) {
      handleSubmit();
    } else if (currentPageIndex < pages.length - 1) {
      currentPageIndex++;
      scrollToTop();
    }
  }

  function handleSubmit() {
    // Final validation before submission
    if (!validateCurrentPage()) {
      return;
    }
    
    // Save submission state
    localStorage.setItem('quizSubmitted', 'true');
    submitted = true;
    showingThankYou = true;
    
    console.log('Quiz completed! Answers:', answers);
  }

  function handleReset() {
    localStorage.removeItem('quizSubmitted');
    submitted = false;
    showingThankYou = false;
    answers = [];
    currentPageIndex = 0;
    errors = {};
    scrollToTop();
  }
</script>

<main class="min-h-screen bg-[#f8f9fa] py-8 px-4">
  {#if !showingThankYou && pages.length > 0}
    <ProgressBar currentPage={currentPageIndex} totalPages={pages.length} />
  {/if}

  {#if showingThankYou}
    <div class="max-w-[960px] mx-auto">
      <div class="prose prose-sm bg-white rounded-lg shadow-sm p-6 text-center">
        <h1 class="text-3xl font-bold text-[#212529] mb-6">Thank You!</h1>
        <p class="text-gray-600">Your responses have been submitted successfully.</p>
      </div>
    </div>
  {:else if currentPage}
    <div class="max-w-[960px] mx-auto">
      <h1 class="text-3xl font-bold text-[#212529] mb-6">{currentPage.title}</h1>
      
      {#if currentPage.layout === 'side-by-side'}
        <div class="lg:grid lg:grid-cols-2 lg:gap-8">
          {#if currentPage.content}
            <div class="prose prose-sm bg-white rounded-lg shadow-sm p-6 mb-6 lg:mb-0">
              {@html currentPage.content}
            </div>
          {/if}
          
          {#if currentPage.questions?.length > 0}
            <div class="space-y-6">
              {#each currentPage.questions as question}
                <QuestionCard
                  question={question}
                  answer={answers.find(a => a.questionId === question.id)}
                  onAnswer={handleAnswer}
                />
              {/each}
            </div>
          {/if}
        </div>
      {:else}
        {#if currentPage.content}
          <div class="prose prose-sm bg-white rounded-lg shadow-sm p-6 mb-6 w-full">
            {@html currentPage.content}
          </div>
        {/if}
        
        {#if currentPage.questions?.length > 0}
          <div class="space-y-6">
            {#each currentPage.questions as question}
              <QuestionCard
                question={question}
                answer={answers.find(a => a.questionId === question.id)}
                onAnswer={handleAnswer}
              />
            {/each}
          </div>
        {/if}
      {/if}
      
      <Navigation
        canGoBack={currentPageIndex > 0}
        canGoForward={canGoForward && !submitted}
        isLastQuestion={showSubmit}
        submitRemarks={currentPage.submitRemarks}
        isFirstPage={isFirstPage}
        submitted={submitted}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {#if currentPageIndex === 0 && submitted}
        <button
          onclick={handleReset}
          class="fixed bottom-4 left-4 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          reset
        </button>
      {/if}
    </div>
  {:else}
    <div class="text-center">
      <p class="text-gray-600">Loading questions...</p>
    </div>
  {/if}
</main>
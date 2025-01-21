import { marked } from 'marked';
import type { Page, Question } from '$lib/types';

export class QuizService {
  private static instance: QuizService;
  
  private constructor() {}
  
  static getInstance(): QuizService {
    if (!QuizService.instance) {
      QuizService.instance = new QuizService();
    }
    return QuizService.instance;
  }
  
  async loadQuiz(): Promise<Page[]> {
    try {
      const response = await fetch('/questions.xml');
      const text = await response.text();
      return this.parseQuizXml(text);
    } catch (error) {
      console.error('Error loading questions:', error);
      throw error;
    }
  }
  
  private parseQuizXml(xmlText: string): Page[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    const pageElements = xmlDoc.getElementsByTagName('page');
    return Array.from(pageElements).map((p) => ({
      id: p.getAttribute('id') || crypto.randomUUID(),
      title: p.getElementsByTagName('title')[0]?.textContent || '',
      content: this.parseContent(p.getElementsByTagName('content')[0]),
      layout: p.getAttribute('layout') as Page['layout'],
      submit: p.getAttribute('submit') === 'true',
      submitRemarks: p.getAttribute('submit-remarks') || 'This is the last page. Click \'Submit\' to send your answers.',
      questions: Array.from(p.getElementsByTagName('questions')[0]?.getElementsByTagName('question') || []).map((q) => ({
        id: q.getAttribute('id') || crypto.randomUUID(),
        type: q.getAttribute('type') as Question['type'],
        text: q.getElementsByTagName('text')[0]?.textContent || '',
        required: q.getAttribute('required') === 'true',
        choices: Array.from(q.getElementsByTagName('choice')).map((c) => ({
          value: c.getAttribute('value') || crypto.randomUUID(),
          text: c.textContent || ''
        })),
        allowMultiple: q.getAttribute('allowMultiple') === 'true',
        minValue: parseFloat(q.getAttribute('minValue') || 'NaN'),
        maxValue: parseFloat(q.getAttribute('maxValue') || 'NaN')
      }))
    }));
  }

  private parseContent(contentElement: Element | null): string | undefined {
    if (!contentElement) return undefined;
    
    // Get the content, whether it's in CDATA or not
    const content = contentElement.textContent?.trim();
    if (!content) return undefined;
    
    // Parse the markdown content
    return marked.parse(content);
  }
}
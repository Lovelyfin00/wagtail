import { Application } from '@hotwired/stimulus';
import { ActionController } from './ActionController';

describe('ActionController', () => {
  beforeEach(()=>{
    document.body.innerHTML = `
    <button class="button no" data-controller="w-action" 
    data-w-action-url-value = "https://www.github.com" data-action="click->w-action#enableAction"
    >Enable</button>
    `;
    Application.start().register('w-action', ActionController);
  })
  it('it should enable the workflow on click', () => {
    
  });
});

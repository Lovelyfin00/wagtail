import type { Definition } from '@hotwired/stimulus';

import { ActionController } from './ActionController';
import { AutoFieldController } from './AutoFieldController';

/**
 * Important: Only add default core controllers that should load with the base admin JS bundle.
 */
export const coreControllerDefinitions: Definition[] = [
  { controllerConstructor: ActionController, identifier: 'w-action' },
  { controllerConstructor: AutoFieldController, identifier: 'w-auto-field' },
];

import React, { useState } from 'react';

import { StimulusWrapper } from '../../storybook/StimulusWrapper';
import { ActionController } from './ActionController';
import { WAGTAIL_CONFIG } from '../config/wagtailConfig';

export default {
    title: 'Shared / ActionController',
    argTypes: {
      debug: {
        control: 'boolean',
        defaultValue: false,
      },
    },
};

const definitions = [
    {
      identifier: 'w-action',
      controllerConstructor: ActionController,
    },
];

const Template = ({ debug = false }, args) => {
  
    return (
      <StimulusWrapper debug={debug} definitions={definitions}>

        <button type="button"
            class="button button-small button-secondary"
            data-action="w-action#post"
            data-controller="w-action"
            data-w-action-redirect-value={args.redirectValue}
            data-w-action-url-value={args.urlValue}
            onClick={(event) => {
                event.preventDefault();
            }}>Lock
        </button>
            
        <p>
          postLock with url {args.urlValue}
        </p>
      </StimulusWrapper>
    );
};
  
export const Base = Template.bind({});
  
Base.args = {
    redirectValue: false,
    urlValue: "",
};
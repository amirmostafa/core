/*author: amostafa*/
import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

export class CustomMissingTranslationHandler implements MissingTranslationHandler {

  constructor() {
  }

  handle(params: MissingTranslationHandlerParams) {
    console.warn(`Missing Translation for ${params.key}`);
    return params.key;
  }
}

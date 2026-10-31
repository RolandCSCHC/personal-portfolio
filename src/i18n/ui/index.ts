import type { Locale } from '../locales';
import { assertSameShape } from './check';
import { ui as en } from './en';
import { ui as es } from './es';
import type { Ui } from './type';

assertSameShape(en, es, 'ui');

const dictionaries = { en, es } satisfies Record<Locale, Ui>;

export function getUi(locale: Locale): Ui {
  return dictionaries[locale];
}

export type { Ui };

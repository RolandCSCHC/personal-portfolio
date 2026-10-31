const storageKey = 'theme';

export type ThemeChoice = 'light' | 'dark' | 'system';

function isThemeChoice(value: string | null): value is ThemeChoice {
  return value === 'light' || value === 'dark' || value === 'system';
}

function systemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function readStoredChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(storageKey);
    return isThemeChoice(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

export function applyTheme(choice: ThemeChoice): void {
  const root = document.documentElement;
  root.dataset.theme = choice === 'system' ? systemTheme() : choice;
  root.dataset.themeChoice = choice;
}

export function initThemeControls(select: HTMLSelectElement): void {
  const fromDocument = document.documentElement.dataset.themeChoice ?? null;
  const choice = isThemeChoice(fromDocument)
    ? fromDocument
    : readStoredChoice();

  select.value = choice;

  select.addEventListener('change', () => {
    if (!isThemeChoice(select.value)) {
      return;
    }

    try {
      localStorage.setItem(storageKey, select.value);
    } catch {
      // Private browsing can block storage. The choice still applies for this view.
    }

    applyTheme(select.value);
  });

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (readStoredChoice() === 'system') {
        applyTheme('system');
      }
    });
}

const storageKey = 'theme';

export type ThemeChoice = 'light' | 'dark';

function isThemeChoice(value: string | null): value is ThemeChoice {
  return value === 'light' || value === 'dark';
}

function readStoredChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(storageKey);
    return isThemeChoice(stored) ? stored : 'light';
  } catch {
    return 'light';
  }
}

export function applyTheme(choice: ThemeChoice): void {
  document.documentElement.dataset.theme = choice;
}

function markControl(button: HTMLButtonElement, choice: ThemeChoice): void {
  const label =
    choice === 'dark' ? button.dataset.labelLight : button.dataset.labelDark;
  if (label) {
    button.setAttribute('aria-label', label);
  }
}

export function initThemeControl(button: HTMLButtonElement): void {
  const fromDocument = document.documentElement.dataset.theme ?? null;
  let choice = isThemeChoice(fromDocument) ? fromDocument : readStoredChoice();

  markControl(button, choice);

  button.addEventListener('click', () => {
    choice = choice === 'dark' ? 'light' : 'dark';

    try {
      localStorage.setItem(storageKey, choice);
    } catch {
      // Private browsing can block storage. The choice still applies for this view.
    }

    applyTheme(choice);
    markControl(button, choice);
  });
}

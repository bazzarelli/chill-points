export type GamePreferences = {
  userMinutesGoal: number;
  userCycleSpeed: number;
  userGameLength: number;
};

export function createPreferencesSaveScheduler(
  savePreferences: (preferences: GamePreferences) => void,
  delayMs = 400,
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastSavedPreferences: GamePreferences | null = null;

  const hasChangedSinceLastSave = (preferences: GamePreferences) => {
    if (!lastSavedPreferences) {
      return true;
    }

    return (
      lastSavedPreferences.userMinutesGoal !== preferences.userMinutesGoal ||
      lastSavedPreferences.userCycleSpeed !== preferences.userCycleSpeed ||
      lastSavedPreferences.userGameLength !== preferences.userGameLength
    );
  };

  const schedule = (preferences: GamePreferences) => {
    if (!hasChangedSinceLastSave(preferences)) {
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      savePreferences(preferences);
      lastSavedPreferences = preferences;
      timeoutId = null;
    }, delayMs);
  };

  const cancelPending = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return {
    schedule,
    cancelPending,
  };
}

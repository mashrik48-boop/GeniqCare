const Store = (() => {
  const KEY = 'geniqcare_state_v1';

  function defaultState() {
    return {
      lang: (navigator.language || 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'fr', // FR default per spec
      units: 'metric',
      theme: 'light',
      textSize: 'default',
      reduceMotion: false,
      auth: { loggedIn: false, email: null },
      onboardingComplete: false,
      onboardingStep: 1,
      user: {
        firstName: '', lastName: '', dob: '', gender: '', height: '',
        goals: [], diet: [], topics: []
      },
      userSupplements: [],      // { id, sku, name, dosage, timesPerDay, reminderTimes: [], active }
      doseLog: {},              // date -> { supplementId_time: {taken, takenAt} }
      labResults: [
        { nutrient: 'b12', value: 165, unit: 'pg/mL', date: '2026-06-02', source: 'lab' },
        { nutrient: 'vitd', value: 62, unit: 'nmol/L', date: '2026-05-14', source: 'lab' },
        { nutrient: 'iron', value: 90, unit: 'µg/dL', date: '2026-04-20', source: 'self' },
      ],
      appointments: [],
      notifications: [
        { id: 'n1', type: 'welcome', read: false, date: new Date().toISOString() }
      ],
      notifPrefs: {
        dose: { push: true, email: false, sms: false },
        appt: { push: true, email: true, sms: false },
        order: { push: true, email: true, sms: false },
        content: { push: false, email: true, sms: false },
      },
      savedArticles: [],
      orders: [],
      subscriptions: [],
      chat: { open: false, messages: [], stage: 'idle', slotChoice: null },
    };
  }

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return Object.assign(defaultState(), parsed);
    } catch (e) {
      return defaultState();
    }
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  return {
    get(path) {
      return path.split('.').reduce((o, k) => (o == null ? o : o[k]), state);
    },
    set(path, value) {
      const parts = path.split('.');
      let obj = state;
      for (let i = 0; i < parts.length - 1; i++) {
        if (obj[parts[i]] == null) obj[parts[i]] = {};
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = value;
      save();
    },
    all() { return state; },
    reset() { state = defaultState(); save(); },
    save,
  };
})();

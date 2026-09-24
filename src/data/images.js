/* ---------------------------------------------------------------------------
   Photo slots.

   Each key is a file name the site looks for in
       src/static/assets/img/food/

   Drop in <slot>.jpg (or .png / .webp) and it is picked up on the next build —
   no code changes. Until then the slot falls back to `use`, and slots marked
   `optional` simply render nothing rather than showing the wrong dish.

   `shot` is the brief: what to photograph. It is printed by `npm run photos`.
--------------------------------------------------------------------------- */

const slots = {
  hero: {
    use: null,
    shot: 'Wide, landscape. A full karahi mid-cook in the iron wok, steam rising. This is the first thing every visitor sees — shoot it in landscape, not portrait, and leave empty space on the left for the headline.'
  },
  karahi: {
    use: 'hero',
    shot: 'A finished karahi from directly above, still in the wok, green chillies and ginger on top.'
  },
  'karahi-lahori': {
    use: 'karahi', optional: true,
    shot: 'Lahori karahi — tomato-red, black pepper visible, ginger matchsticks on top.'
  },
  'karahi-shinwari': {
    use: 'karahi', optional: true,
    shot: 'Shinwari karahi — paler, oil separated at the edge, whole green chillies.'
  },
  'karahi-white': {
    use: 'karahi', optional: true,
    shot: 'White karahi — creamy, no tomato colour at all. This one has to look clearly different from the others.'
  },
  'karahi-chatkhara': {
    use: 'karahi', optional: true,
    shot: 'Chatkhara karahi — lemon wedges alongside, lots of green chilli.'
  },
  bbq: {
    use: 'hero',
    shot: 'Skewers over live coals, close up, with flame and smoke visible. Shoot it while the meat is actually on the grill.'
  },
  'bbq-platter': {
    use: 'bbq', optional: true,
    shot: 'The 35 SAR BBQ Mix Platter as it leaves the kitchen — the full tray, from slightly above.'
  },
  'chapli-kabab': {
    use: 'karahi', optional: true,
    shot: 'Beef Chapli Kabab, one of the daily specials. Close and low, so the crisp lacy edge reads.'
  },
  'afghani-kabab': {
    use: 'bbq', optional: true,
    shot: 'Beef Afghani Kabab on the flat skewer, the other daily special.'
  },
  daal: { use: 'hero', shot: 'Daal karahi with the garlic tarka just poured over, coriander on top.' },
  biryani: { use: 'hero', shot: 'A plate of chicken biryani or beef pulao, with the meat showing through the rice.' },
  naan: { use: 'hero', shot: 'Fresh naan in the basket — kabul naan and roghni naan together, blistered and steaming.' },
  sides: { use: 'hero', shot: 'Raita, salad and a cold drink arranged together on the table.' },
  tandoor: { use: 'naan', optional: true, shot: 'Naan being lifted out of the tandoor. Hands in shot are good.' },
  storefront: { use: 'naan', optional: true, shot: 'The shopfront from across the road in daylight, sign clearly readable. Helps people find you.' },
  interior: { use: 'hero', optional: true, shot: 'The dining room with people in it, shot wide. Warm and busy beats empty and tidy.' }
};

module.exports = slots;

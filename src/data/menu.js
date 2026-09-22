/* ---------------------------------------------------------------------------
   Al Ashfaz Restaurant — the complete menu.

   THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE THE MENU.
   Change a price here, save, push — every page updates in both languages.

   Prices are in Saudi Riyals. Karahi rows use { full, half, quarter };
   every other section uses a single `price`.
--------------------------------------------------------------------------- */

/* The two dishes called out at the top of the poster. */
const specials = {
  heading: { en: 'Two Special Dishes Daily', ar: 'طبقان مميزان يومياً' },
  blurb: {
    en: 'Made fresh every single day, in limited numbers, and gone by the evening rush. These are the two plates the neighbourhood comes back for.',
    ar: 'تُحضَّر طازجة كل يوم بكميات محدودة، وتنفد مع ازدحام المساء. هذان هما الطبقان اللذان يعود إليهما الحي دائماً.'
  },
  items: [
    {
      name: { en: 'Beef Chapli Kabab', ar: 'كباب تشابلي باللحم البقري' },
      price: 8,
      image: 'chapli-kabab',
      desc: {
        en: 'Minced beef pressed flat with pomegranate seed, coriander and crushed chilli, then shallow-fried until the edges go lacy and crisp. Peshawar on a plate.',
        ar: 'لحم بقري مفروم يُضغط على شكل قرص مع بذور الرمان والكزبرة والفلفل المجروش، ثم يُقلى حتى تصبح أطرافه مقرمشة. بيشاور في طبق.'
      }
    },
    {
      name: { en: 'Beef Afghani Kabab', ar: 'كباب أفغاني باللحم البقري' },
      price: 12,
      image: 'afghani-kabab',
      desc: {
        en: 'Hand-minced beef threaded onto flat skewers and cooked over open coals — salt, fat and smoke, nothing else. The way it is done across the border.',
        ar: 'لحم بقري مفروم يدوياً يُلف على أسياخ مسطحة ويُشوى على الفحم المكشوف — ملح ودهن ودخان، لا شيء غير ذلك. كما يُحضَّر خلف الحدود تماماً.'
      }
    }
  ]
};

const sections = [
  {
    id: 'karahi',
    image: 'karahi',
    icon: 'karahi',
    title: { en: 'Karahi', ar: 'الكراهي' },
    subtitle: { en: 'Cooked to order in a heavy iron wok', ar: 'تُطهى عند الطلب في مقلاة حديدية ثقيلة' },
    note: {
      en: 'Every karahi is started from raw when you order it, so give us a little time. Full serves 4–5, half serves 2–3, quarter serves one.',
      ar: 'تُحضَّر كل كراهي من البداية عند طلبها، لذا امنحنا بعض الوقت. الكاملة تكفي ٤–٥ أشخاص، والنصف ٢–٣، والربع لشخص واحد.'
    },
    columns: [
      { key: 'full', label: { en: 'Full', ar: 'كاملة' } },
      { key: 'half', label: { en: 'Half', ar: 'نصف' } },
      { key: 'quarter', label: { en: 'Quarter', ar: 'ربع' } }
    ],
    groups: [
      {
        name: { en: 'Lahori', ar: 'لاهوري' },
        desc: {
          en: 'Tomato-forward and generous with crushed black pepper, ginger juliennes and whole green chilli.',
          ar: 'غنية بالطماطم وسخية بالفلفل الأسود المجروش وشرائح الزنجبيل والفلفل الأخضر الكامل.'
        },
        items: [
          { name: { en: 'Chicken Lahori Karahi', ar: 'كراهي لاهوري دجاج' }, prices: { full: 55, half: 30, quarter: 16 } },
          { name: { en: 'Beef Lahori Karahi', ar: 'كراهي لاهوري لحم بقري' }, prices: { full: 55, half: 30, quarter: 20 } },
          { name: { en: 'Mutton Lahori Karahi', ar: 'كراهي لاهوري لحم غنم' }, prices: { full: 90, half: 48, quarter: 24 } }
        ]
      },
      {
        name: { en: 'Shinwari', ar: 'شنواري' },
        desc: {
          en: 'The Khyber method — meat, tomato, salt and its own fat. No masala to hide behind.',
          ar: 'طريقة خيبر — لحم وطماطم وملح ودهنه الخاص. بلا بهارات تختبئ خلفها.'
        },
        badge: { en: 'House speciality', ar: 'تخصص المطعم' },
        items: [
          { name: { en: 'Chicken Shinwari Karahi', ar: 'كراهي شنواري دجاج' }, prices: { full: 55, half: 30, quarter: 16 } },
          { name: { en: 'Beef Shinwari Karahi', ar: 'كراهي شنواري لحم بقري' }, prices: { full: 55, half: 30, quarter: 20 } },
          { name: { en: 'Mutton Shinwari Karahi', ar: 'كراهي شنواري لحم غنم' }, prices: { full: 90, half: 48, quarter: 24 } }
        ]
      },
      {
        name: { en: 'White', ar: 'الكراهي البيضاء' },
        desc: {
          en: 'No tomato at all. Yoghurt, cream and white pepper make it mild, silky and quietly addictive.',
          ar: 'بلا طماطم إطلاقاً. الزبادي والكريمة والفلفل الأبيض تجعلها خفيفة وحريرية ولا تُقاوَم.'
        },
        items: [
          { name: { en: 'Chicken White Karahi', ar: 'كراهي بيضاء دجاج' }, prices: { full: 55, half: 30, quarter: 16 } },
          { name: { en: 'Beef White Karahi', ar: 'كراهي بيضاء لحم بقري' }, prices: { full: 55, half: 30, quarter: 20 } },
          { name: { en: 'Mutton White Karahi', ar: 'كراهي بيضاء لحم غنم' }, prices: { full: 90, half: 48, quarter: 24 } }
        ]
      },
      {
        name: { en: 'Chatkhara', ar: 'تشاتخارا' },
        desc: {
          en: 'Sharp with lemon, chaat masala and green chilli. Our loudest karahi, and the one most often ordered twice.',
          ar: 'حادة بالليمون وبهارات التشاات والفلفل الأخضر. أجرأ كراهي لدينا، وأكثرها طلباً مرتين في الجلسة الواحدة.'
        },
        badge: { en: 'Most ordered', ar: 'الأكثر طلباً' },
        items: [
          { name: { en: 'Chicken Chatkhara Karahi', ar: 'كراهي تشاتخارا دجاج' }, prices: { full: 55, half: 30, quarter: 16 } },
          { name: { en: 'Beef Chatkhara Karahi', ar: 'كراهي تشاتخارا لحم بقري' }, prices: { full: 55, half: 30, quarter: 20 } },
          { name: { en: 'Mutton Chatkhara Karahi', ar: 'كراهي تشاتخارا لحم غنم' }, prices: { full: 90, half: 48, quarter: 24 } }
        ]
      }
    ]
  },

  {
    id: 'bbq',
    image: 'bbq',
    icon: 'flame',
    title: { en: 'From the Coals', ar: 'من على الفحم' },
    subtitle: { en: 'BBQ, grilled to order over open fire', ar: 'مشويات تُحضَّر عند الطلب على النار المكشوفة' },
    unit: { en: 'per plate', ar: 'للطبق' },
    note: {
      en: 'Charcoal only — never gas. Marinated overnight and grilled the moment you order.',
      ar: 'فحم فقط — لا غاز أبداً. تُتبَّل طوال الليل وتُشوى لحظة طلبك.'
    },
    items: [
      { name: { en: 'Chicken Chest Piece', ar: 'صدر دجاج مشوي' }, price: 12, desc: { en: 'Bone-in breast, yoghurt-marinated overnight, seared until the skin blisters.', ar: 'صدر بالعظم متبَّل بالزبادي طوال الليل، يُشوى حتى يتحمَّص جلده.' } },
      { name: { en: 'Chicken Leg Piece', ar: 'فخذ دجاج مشوي' }, price: 12, desc: { en: 'The juicier cut. Darker meat, deeper smoke.', ar: 'القطعة الأكثر عصارة. لحم داكن ودخان أعمق.' } },
      { name: { en: 'Chicken Boti', ar: 'بوتي دجاج' }, price: 12, desc: { en: 'Boneless cubes, charred at the corners, soft in the middle.', ar: 'مكعبات بلا عظم، محمَّصة الأطراف وطرية من الداخل.' } },
      { name: { en: 'Chicken Malai Boti', ar: 'مالاي بوتي دجاج' }, price: 12, desc: { en: 'Cream, cheese and white pepper. Mild enough for the children at the table.', ar: 'كريمة وجبن وفلفل أبيض. خفيفة بما يكفي للأطفال على الطاولة.' }, badge: { en: 'Mild', ar: 'غير حار' } },
      { name: { en: 'Chicken Tikka Boti', ar: 'تكة بوتي دجاج' }, price: 12, desc: { en: 'The red one — Kashmiri chilli, ginger and lemon.', ar: 'الحمراء — فلفل كشميري وزنجبيل وليمون.' } },
      { name: { en: 'Beef Boti', ar: 'بوتي لحم بقري' }, price: 12, desc: { en: 'Tenderised cubes of beef, heavy on the smoke.', ar: 'مكعبات لحم بقري طرية، غنية بالدخان.' } },
      { name: { en: 'Chicken Wings', ar: 'أجنحة دجاج' }, price: 10, desc: { en: 'Simple, salted, grilled hard. The plate that empties first.', ar: 'بسيطة ومملَّحة ومشوية جيداً. الطبق الذي يفرغ أولاً.' } },
      { name: { en: 'Chaska Wings', ar: 'أجنحة تشاسكا' }, price: 10, desc: { en: 'Wings tossed in our tangy chilli rub while still hot off the grill.', ar: 'أجنحة تُقلَّب في خلطتنا الحارة الحامضة وهي ساخنة من على الشواية.' }, badge: { en: 'Spicy', ar: 'حار' } },
      { name: { en: 'Beef Kabab', ar: 'كباب لحم بقري' }, price: 12, desc: { en: 'Seekh-style minced beef, hand-rolled onto the skewer.', ar: 'كباب سيخ من اللحم البقري المفروم، يُلف يدوياً على السيخ.' } },
      { name: { en: 'Chicken Kabab', ar: 'كباب دجاج' }, price: 12, desc: { en: 'Lighter seekh kabab with coriander and green chilli through it.', ar: 'كباب سيخ أخف مع الكزبرة والفلفل الأخضر.' } },
      { name: { en: 'Behari Kabab', ar: 'كباب بهاري' }, price: 12, desc: { en: 'Thin strips of beef tenderised the Karachi way, then grilled until they curl.', ar: 'شرائح رفيعة من اللحم البقري تُطرَّى على الطريقة الكراتشية، ثم تُشوى حتى تتجعد.' } },
      { name: { en: 'BBQ Mix Platter', ar: 'طبق مشاوي مشكّل' }, price: 35, desc: { en: 'A little of everything from the grill, arranged on one tray. Built for a table, not a person.', ar: 'قليل من كل شيء من على الشواية في صينية واحدة. مُعد لطاولة كاملة لا لشخص واحد.' }, badge: { en: 'For sharing', ar: 'للمشاركة' }, feature: true }
    ]
  },

  {
    id: 'daal',
    image: 'daal',
    icon: 'bowl',
    title: { en: 'Daal & Vegetable Karahi', ar: 'الدال والخضار' },
    subtitle: { en: 'Slow-cooked, meat-free, all day long', ar: 'تُطهى ببطء، بلا لحم، طوال اليوم' },
    note: {
      en: 'Every one of these is cooked without meat and finished with a fresh tarka of garlic and cumin.',
      ar: 'جميعها تُطهى بدون لحم وتُنهى بتقلية طازجة من الثوم والكمون.'
    },
    items: [
      { name: { en: 'Daal Fry Karahi', ar: 'دال فراي كراهي' }, price: 10, desc: { en: 'Yellow lentils under a sizzling garlic tarka.', ar: 'عدس أصفر تحت تقلية ثوم ساخنة.' } },
      { name: { en: 'Daal Lobia Karahi', ar: 'دال لوبيا كراهي' }, price: 10, desc: { en: 'Black-eyed beans simmered soft in tomato and cumin.', ar: 'لوبيا تُطهى حتى تلين في الطماطم والكمون.' } },
      { name: { en: 'Daal Chana Karahi', ar: 'دال تشانا كراهي' }, price: 10, desc: { en: 'Split chickpeas that keep their bite, spiced dark and warm.', ar: 'حمص مجروش يحتفظ بقوامه، متبَّل بنكهة داكنة دافئة.' } },
      { name: { en: 'Daal Mash Karahi', ar: 'دال ماش كراهي' }, price: 10, desc: { en: 'White urad daal, dry-style, with ginger cut fine over the top.', ar: 'دال ماش أبيض، ناشف، مع زنجبيل مقطع ناعماً فوقه.' } },
      { name: { en: 'Vegetable Karahi', ar: 'كراهي خضار' }, price: 10, desc: { en: 'Whatever came in fresh that morning, cooked hard and fast in the wok.', ar: 'ما وصل طازجاً في الصباح، يُطهى على نار قوية وسريعة في المقلاة.' } }
    ]
  },

  {
    id: 'rice',
    image: 'biryani',
    icon: 'rice',
    title: { en: 'Rice & Pulao', ar: 'الأرز والبلاو' },
    subtitle: { en: 'Long-grain, layered, and never rushed', ar: 'حبة طويلة، مرصوصة بطبقات، وبلا استعجال' },
    note: {
      en: 'Single is one full plate. Double is built for two, or for one very serious appetite.',
      ar: 'المفرد طبق كامل. المزدوج يكفي شخصين، أو شخصاً واحداً بشهية جادة.'
    },
    items: [
      { name: { en: 'Single Chicken Biryani', ar: 'برياني دجاج مفرد' }, price: 10, desc: { en: 'Layered with saffron rice, fried onion and a whole piece of chicken.', ar: 'مرصوص مع أرز الزعفران والبصل المقلي وقطعة دجاج كاملة.' } },
      { name: { en: 'Double Chicken Biryani', ar: 'برياني دجاج مزدوج' }, price: 18, desc: { en: 'The same, doubled — two pieces, twice the rice.', ar: 'نفسه مضاعفاً — قطعتان وضعف كمية الأرز.' } },
      { name: { en: 'Single Beef Pulao', ar: 'بلاو لحم بقري مفرد' }, price: 10, desc: { en: 'Rice cooked in beef stock rather than water. Subtler than biryani, and deeper.', ar: 'أرز يُطهى في مرق اللحم بدل الماء. أهدأ من البرياني وأعمق منه.' } },
      { name: { en: 'Double Beef Pulao', ar: 'بلاو لحم بقري مزدوج' }, price: 20, desc: { en: 'A full double portion with extra meat folded through.', ar: 'حصة مزدوجة كاملة مع لحم إضافي بداخلها.' } }
    ]
  },

  {
    id: 'bread',
    image: 'tandoor',
    icon: 'bread',
    title: { en: 'Naan & Roti', ar: 'النان والروتي' },
    subtitle: { en: 'Straight from the tandoor, all day', ar: 'مباشرة من التنور، طوال اليوم' },
    note: {
      en: 'Baked against the clay wall of the tandoor and brought to you while it is still too hot to hold.',
      ar: 'تُخبز على جدار التنور الطيني وتصل إليك وهي لا تزال ساخنة يصعب حملها.'
    },
    items: [
      { name: { en: 'Roghni Naan', ar: 'نان روغني' }, price: 2, desc: { en: 'Brushed with ghee and scattered with sesame.', ar: 'مدهون بالسمن ومرشوش بالسمسم.' } },
      { name: { en: 'Plain Naan', ar: 'نان سادة' }, price: 1, desc: { en: 'The everyday naan. Soft, blistered, honest.', ar: 'نان كل يوم. طري ومنفوخ وصادق.' } },
      { name: { en: 'Rumaali Naan', ar: 'نان رومالي' }, price: 2, desc: { en: 'Stretched thin as a handkerchief, then folded warm.', ar: 'يُمدُّ رفيعاً كالمنديل، ثم يُطوى دافئاً.' } },
      { name: { en: 'Kabul Naan', ar: 'نان كابلي' }, price: 2, desc: { en: 'The long Afghan loaf, ridged down its length and built for tearing.', ar: 'الرغيف الأفغاني الطويل، محزَّز على طوله ومصنوع ليُقطَّع باليد.' } },
      { name: { en: 'Tandoori Roti', ar: 'روتي تندوري' }, price: 1, desc: { en: 'Wholewheat, thin and quick. The one that goes with daal.', ar: 'قمح كامل، رفيع وسريع. الرفيق المثالي للدال.' } }
    ]
  },

  {
    id: 'sides',
    image: 'sides',
    icon: 'drink',
    title: { en: 'Sides & Drinks', ar: 'الإضافات والمشروبات' },
    subtitle: { en: 'The small things that finish the table', ar: 'التفاصيل الصغيرة التي تُكمل الطاولة' },
    note: {
      en: 'Raita and salad are made fresh through the day, not portioned out in the morning.',
      ar: 'الرايتة والسلطة تُحضَّران طازجتين على مدار اليوم، لا تُجهَّزان صباحاً.'
    },
    items: [
      { name: { en: 'Raita', ar: 'رايتة' }, price: 1, desc: { en: 'Whipped yoghurt with roasted cumin and mint.', ar: 'زبادي مخفوق مع الكمون المحمص والنعناع.' } },
      { name: { en: 'Salad', ar: 'سلطة' }, price: 1, desc: { en: 'Onion, cucumber, green chilli and lemon. Cut to order.', ar: 'بصل وخيار وفلفل أخضر وليمون. تُقطَّع عند الطلب.' } },
      { name: { en: 'Cold Drink', ar: 'مشروب غازي' }, price: 3, desc: { en: 'Chilled can.', ar: 'علبة مبردة.' } },
      { name: { en: 'Large Cold Drink', ar: 'مشروب غازي كبير' }, price: 6, desc: { en: 'The bottle, for sharing around the table.', ar: 'قارورة كبيرة للمشاركة حول الطاولة.' } },
      { name: { en: 'Water', ar: 'ماء' }, price: 1, desc: { en: 'Small bottle.', ar: 'قارورة صغيرة.' } },
      { name: { en: 'Large Water', ar: 'ماء كبير' }, price: 2, desc: { en: 'Large bottle.', ar: 'قارورة كبيرة.' } }
    ]
  }
];

/* Flattens every priced row — used for the search index and the item count. */
function allItems() {
  const out = [];
  sections.forEach(function (section) {
    const push = function (item, group) {
      out.push({ section: section, group: group, item: item });
    };
    (section.items || []).forEach(function (i) { push(i, null); });
    (section.groups || []).forEach(function (g) {
      g.items.forEach(function (i) { push(i, g); });
    });
  });
  return out;
}

module.exports = { specials: specials, sections: sections, allItems: allItems };

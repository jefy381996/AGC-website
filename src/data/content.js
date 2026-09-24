/* ---------------------------------------------------------------------------
   Al Ashfaz Restaurant — all written copy, in English and Arabic.
   Change the words here; the layout takes care of itself.
--------------------------------------------------------------------------- */

/* Short interface strings reused across pages. */
const ui = {
  skip: { en: 'Skip to content', ar: 'تخطَّ إلى المحتوى' },
  menuOpen: { en: 'Open menu', ar: 'فتح القائمة' },
  menuClose: { en: 'Close menu', ar: 'إغلاق القائمة' },
  viewMenu: { en: 'View the Menu', ar: 'تصفَّح المنيو' },
  fullMenu: { en: 'See the full menu', ar: 'المنيو كامل' },
  findUs: { en: 'Find Us', ar: 'كيف تصل إلينا' },
  directions: { en: 'Get Directions', ar: 'الاتجاهات' },
  callUs: { en: 'Call Us', ar: 'اتصل بنا' },
  whatsapp: { en: 'WhatsApp Us', ar: 'واتساب' },
  sar: { en: 'SAR', ar: 'ريال' },
  perPlate: { en: 'per plate', ar: 'للطبق' },
  openNow: { en: 'Open now', ar: 'مفتوح الآن' },
  closedNow: { en: 'Closed now', ar: 'مغلق الآن' },
  scroll: { en: 'Scroll', ar: 'مرِّر' },
  backTop: { en: 'Back to top', ar: 'إلى الأعلى' },
  search: { en: 'Search the menu', ar: 'ابحث في المنيو' },
  searchPlaceholder: { en: 'Search dishes…', ar: 'ابحث عن طبق…' },
  noResults: { en: 'Nothing matched that. Try another word.', ar: 'لا توجد نتائج مطابقة. جرّب كلمة أخرى.' },
  clear: { en: 'Clear', ar: 'مسح' },
  all: { en: 'All', ar: 'الكل' },
  langLabel: { en: 'Language', ar: 'اللغة' },
  prev: { en: 'Previous', ar: 'السابق' },
  next: { en: 'Next', ar: 'التالي' },
  close: { en: 'Close', ar: 'إغلاق' },
  placeholderPhoto: {
    en: 'Photograph from our printed menu',
    ar: 'صورة من المنيو المطبوع'
  },
  noDelivery: {
    en: 'We do not take bookings or deliver. Walk in, sit down, and we will cook it fresh.',
    ar: 'لا نستقبل الحجوزات ولا نقدم التوصيل. تفضَّل بالدخول واجلس، وسنطهو لك طازجاً.'
  },
  priceNote: {
    en: 'All prices are in Saudi Riyals and include VAT. Prices may change without notice.',
    ar: 'جميع الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة. قد تتغير الأسعار دون إشعار.'
  }
};

const home = {
  hero: {
    eyebrow: { en: 'Al-Batha · Riyadh', ar: 'البطحاء · الرياض' },
    title: { en: 'Authentic Taste,\nReal Flavors', ar: 'مذاق أصيل،\nنكهات حقيقية' },
    lede: {
      en: 'Karahi cooked to order in iron. Kababs turned over open coals. Naan pulled hot from the tandoor. Nothing sits waiting under a lamp.',
      ar: 'كراهي تُطهى عند الطلب في الحديد. كباب يُقلَّب على الفحم المكشوف. نان يُسحب ساخناً من التنور. لا شيء ينتظر تحت مصباح التسخين.'
    }
  },
  marquee: {
    en: ['Shinwari Karahi', 'Beef Chapli Kabab', 'Chatkhara Karahi', 'Afghani Kabab', 'Behari Kabab', 'Kabul Naan', 'Chicken Biryani', 'Malai Boti'],
    ar: ['كراهي شنواري', 'كباب تشابلي', 'كراهي تشاتخارا', 'كباب أفغاني', 'كباب بهاري', 'نان كابلي', 'برياني دجاج', 'مالاي بوتي']
  },
  stats: [
    { value: 44, suffix: '', label: { en: 'Dishes on the menu', ar: 'طبقاً في المنيو' } },
    { value: 4, suffix: '', label: { en: 'Styles of karahi', ar: 'أنماط للكراهي' } },
    { value: 2, suffix: '', label: { en: 'Specials every day', ar: 'طبقان مميزان يومياً' } },
    { value: 1, suffix: '', label: { en: 'SAR for fresh naan', ar: 'ريال للنان الطازج' } }
  ],
  intro: {
    eyebrow: { en: 'Who we are', ar: 'من نحن' },
    title: { en: 'A Batha kitchen that cooks the way home does', ar: 'مطبخ بطحاوي يطبخ كما يطبخ البيت' },
    body: {
      en: [
        'Al Ashfaz sits opposite Lulu Hypermarket in Al-Batha. We opened with one rule and we have not moved off it: cook everything from raw, when it is ordered, in front of you.',
        'That means the karahi takes longer than you might like. It also means the tomato has not been sitting in a pot since we opened, the chicken has not been reheated, and the naan reaches you too hot to hold. Desi, Shinwari and BBQ — done properly, priced so a family can afford it twice a week.'
      ],
      ar: [
        'يقع مطعم آل أشفاز مقابل لولو هايبر ماركت في البطحاء. افتتحنا بقاعدة واحدة ولم نحد عنها: نطهو كل شيء من الطازج، عند طلبه، أمامك.',
        'هذا يعني أن الكراهي تستغرق وقتاً أطول مما قد تتمنى. ويعني أيضاً أن الطماطم لم تبقَ في القدر منذ الافتتاح، وأن الدجاج لم يُعَد تسخينه، وأن النان يصل إليك ساخناً يصعب حمله. ديسي وشنواري ومشويات — بإتقان، وبأسعار تسمح للعائلة بالعودة مرتين في الأسبوع.'
      ]
    }
  },
  pillars: {
    eyebrow: { en: 'How we cook', ar: 'كيف نطبخ' },
    title: { en: 'Four things we refuse to compromise on', ar: 'أربعة أمور لا نساوم عليها' },
    items: [
      {
        title: { en: 'Cooked from raw', ar: 'من الطازج' },
        body: { en: 'Nothing is pre-cooked and held. Your karahi starts when your order reaches the kitchen.', ar: 'لا شيء يُطهى مسبقاً ويُحفظ. كراهيك تبدأ حين تصل طلبيتك إلى المطبخ.' }
      },
      {
        title: { en: 'Grilled to order', ar: 'تُشوى عند الطلب' },
        body: { en: 'Charcoal and gas, whichever the dish calls for, and nothing goes on the grill until you have ordered it.', ar: 'فحم وغاز، حسب ما يتطلبه الطبق، ولا شيء يوضع على الشواية قبل أن تطلبه.' }
      },
      {
        title: { en: 'Cut fresh each morning', ar: 'يُقطَّع طازجاً كل صباح' },
        body: { en: 'Meat, tomato, coriander, ginger — bought and prepared the same day, every day.', ar: 'اللحم والطماطم والكزبرة والزنجبيل — تُشترى وتُجهَّز في اليوم نفسه، كل يوم.' }
      },
      {
        title: { en: 'Priced for families', ar: 'بأسعار للعائلات' },
        body: { en: 'A full karahi, naan for the table and drinks still comes in under most single plates elsewhere.', ar: 'كراهي كاملة ونان للطاولة ومشروبات، بأقل من طبق واحد في أماكن أخرى.' }
      }
    ]
  },
  signature: {
    eyebrow: { en: 'What to order', ar: 'ماذا تطلب' },
    title: { en: 'If it is your first time', ar: 'إن كانت زيارتك الأولى' },
    body: {
      en: 'Four plates that tell you everything about this kitchen.',
      ar: 'أربعة أطباق تكشف لك كل شيء عن هذا المطبخ.'
    }
  },
  visit: {
    eyebrow: { en: 'Come and sit', ar: 'تفضَّل واجلس' },
    title: { en: 'Opposite Lulu Hypermarket, Al-Batha', ar: 'مقابل لولو هايبر ماركت، البطحاء' },
    body: {
      en: 'No bookings, no delivery apps, no waiting for a driver. Walk in, take a table, and tell us what you want cooked.',
      ar: 'لا حجوزات، ولا تطبيقات توصيل، ولا انتظار لسائق. ادخل واختر طاولة وأخبرنا بما تريد أن نطهوه.'
    }
  }
};

const about = {
  hero: {
    eyebrow: { en: 'Our Story', ar: 'قصتنا' },
    title: { en: 'We opened for people who care how food tastes', ar: 'افتتحنا لمن يهتم بمذاق الطعام' },
    lede: {
      en: 'There is no secret recipe here. There is a kitchen that will not take shortcuts, and prices that let you come back next week.',
      ar: 'لا توجد وصفة سرية هنا. هناك مطبخ لا يختصر الطريق، وأسعار تسمح لك بالعودة الأسبوع القادم.'
    }
  },
  story: {
    title: { en: 'Why we started', ar: 'لماذا بدأنا' },
    body: {
      en: [
        'Al Ashfaz began with a simple frustration. Too much food is cooked early, held warm for hours and served tired — and everyone has learned to accept it. We wanted a kitchen where nothing is made until somebody asks for it.',
        'So that is how we built it. The meat is cut and prepared the same morning. The tandoor is lit from the moment we open. Every karahi starts from raw when your order reaches the kitchen — which is why it takes fifteen or twenty minutes, and why it tastes the way it does.',
        'The rest was about price. Good food should not be an occasion. We set ours so a family can eat properly on an ordinary day and not think twice about coming back. We opened opposite Lulu Hypermarket because that is where people actually walk, and we have cooked for that street ever since.'
      ],
      ar: [
        'بدأ مطعم آل أشفاز من شعور بسيط بالضيق. الكثير من الطعام يُطهى مبكراً ويُحفظ ساخناً لساعات ثم يُقدَّم وقد فقد حيويته — وتعوَّد الجميع على قبول ذلك. أردنا مطبخاً لا يُحضَّر فيه شيء قبل أن يطلبه أحد.',
        'وهكذا بنيناه. يُقطَّع اللحم ويُجهَّز في الصباح نفسه. ويُشعل التنور منذ لحظة الافتتاح. وتبدأ كل كراهي من اللحم الطازج حين تصل طلبيتك إلى المطبخ — ولهذا تستغرق خمس عشرة أو عشرين دقيقة، ولهذا يكون مذاقها كما هو.',
        'أما الباقي فكان مسألة سعر. الطعام الجيد لا ينبغي أن يكون مناسبة خاصة. حدَّدنا أسعارنا كي تتمكن العائلة من تناول طعام جيد في يوم عادي دون أن تفكر مرتين في العودة. افتتحنا مقابل لولو هايبر ماركت لأن هذا حيث يمشي الناس فعلاً، وما زلنا نطبخ لذلك الشارع منذ ذلك الحين.'
      ]
    }
  },
  styles: {
    eyebrow: { en: 'Know your karahi', ar: 'اعرف كراهيك' },
    title: { en: 'Four karahis, four different arguments', ar: 'أربع كراهيات، أربعة آراء مختلفة' },
    body: {
      en: 'People order "a karahi" and mean four completely different dishes. Here is how to tell them apart before you order.',
      ar: 'يطلب الناس «كراهي» وهم يقصدون أربعة أطباق مختلفة تماماً. إليك كيف تفرّق بينها قبل أن تطلب.'
    },
    items: [
      {
        name: { en: 'Lahori', ar: 'لاهوري' },
        heat: 3,
        body: { en: 'Tomato-heavy and unapologetically peppery. Ginger cut into matchsticks goes on at the end, along with whole green chillies that you can eat or push aside. This is the one most people picture when they say karahi.', ar: 'غنية بالطماطم وحارة بالفلفل بلا اعتذار. يُضاف الزنجبيل المقطع كعيدان الثقاب في النهاية، مع فلفل أخضر كامل يمكنك أكله أو تنحيته. هذه ما يتخيله معظم الناس حين يقولون كراهي.' }
      },
      {
        name: { en: 'Shinwari', ar: 'شنواري' },
        heat: 2,
        body: { en: 'The purist. Meat, tomato, salt, green chilli and the animal\'s own fat — that is the entire recipe. No onion, no garlic paste, no garam masala. It tastes like the meat, which is the whole point.', ar: 'الأصولية. لحم وطماطم وملح وفلفل أخضر ودهن الذبيحة نفسها — هذه هي الوصفة كاملة. بلا بصل ولا معجون ثوم ولا جرم ماسالا. طعمها طعم اللحم، وهذا هو المقصود بالضبط.' }
      },
      {
        name: { en: 'White', ar: 'بيضاء' },
        heat: 1,
        body: { en: 'No tomato anywhere. Yoghurt and cream carry it instead, with white pepper for warmth rather than heat. Order this one for anyone at the table who does not want to sweat through the meal.', ar: 'بلا طماطم إطلاقاً. الزبادي والكريمة يحملانها بدلاً من ذلك، مع فلفل أبيض للدفء لا للحرارة. اطلبها لمن على الطاولة لا يرغب في التعرّق أثناء الوجبة.' }
      },
      {
        name: { en: 'Chatkhara', ar: 'تشاتخارا' },
        heat: 4,
        body: { en: 'The loud one. Lemon, chaat masala and a lot of green chilli make it sour and sharp at the same time. It wakes the whole table up, and it is the karahi we sell the most of.', ar: 'الصاخبة. الليمون وبهارات التشاات وكثير من الفلفل الأخضر تجعلها حامضة وحادة في آن واحد. توقظ الطاولة بأكملها، وهي الكراهي الأكثر مبيعاً لدينا.' }
      }
    ]
  },
  values: {
    eyebrow: { en: 'The house rules', ar: 'قواعد البيت' },
    title: { en: 'What you will and will not find here', ar: 'ما ستجده وما لن تجده هنا' },
    yes: {
      title: { en: 'What you will find', ar: 'ما ستجده' },
      items: {
        en: ['Meat cut and prepared the same morning', 'A tandoor running from open to close', 'Halal throughout, without exception', 'Room for a big table, and for a big order', 'Takeaway, cooked to order while you wait', 'Prices a working family can repeat'],
        ar: ['لحم يُقطَّع ويُجهَّز في الصباح نفسه', 'تنور يعمل من الافتتاح حتى الإغلاق', 'حلال بالكامل، بلا استثناء', 'مساحة لطاولة كبيرة ولطلب كبير', 'طلبات خارجية تُطهى عند الطلب أثناء انتظارك', 'أسعار تستطيع العائلة العاملة تكرارها']
      }
    },
    no: {
      title: { en: 'What you will not', ar: 'وما لن تجده' },
      items: {
        en: ['Anything reheated from yesterday', 'Frozen naan from a bag', 'A plate that sat waiting under a lamp', 'Table bookings — it is first come, first served', 'Delivery apps or drivers', 'A separate family section'],
        ar: ['أي شيء مُعاد تسخينه من الأمس', 'نان مجمَّد من كيس', 'طبق انتظر تحت مصباح التسخين', 'حجز طاولات — الأسبقية لمن يأتي أولاً', 'تطبيقات توصيل أو سائقين', 'قسم عائلي منفصل']
      }
    }
  }
};

const gallery = {
  hero: {
    eyebrow: { en: 'Gallery', ar: 'المعرض' },
    title: { en: 'What comes out of our kitchen', ar: 'ما يخرج من مطبخنا' },
    lede: {
      en: 'Photographs from the pass — the karahi as it leaves the stove, the skewers as they come off the coals.',
      ar: 'صور من نافذة التقديم — الكراهي وهي تغادر النار، والأسياخ وهي تُرفع عن الفحم.'
    }
  },
  captions: [
    { id: 'karahi', title: { en: 'Chicken Karahi, full', ar: 'كراهي دجاج، كاملة' }, body: { en: 'Straight off the flame in its iron wok, green chilli still whole on top.', ar: 'مباشرة من النار في مقلاتها الحديدية، والفلفل الأخضر ما زال كاملاً فوقها.' } },
    { id: 'bbq', title: { en: 'Off the coals', ar: 'من على الفحم' }, body: { en: 'Seekh kababs, raita and raw onion — the way a BBQ plate should arrive.', ar: 'كباب سيخ ورايتة وبصل نيء — كما يجب أن يصل طبق المشاوي.' } },
    { id: 'biryani', title: { en: 'Beef Pulao', ar: 'بلاو لحم بقري' }, body: { en: 'Rice cooked in stock, meat folded through rather than laid on top.', ar: 'أرز مطهو في المرق، واللحم مدسوس بداخله لا موضوع فوقه.' } },
    { id: 'naan', title: { en: 'Fresh from the tandoor', ar: 'طازج من التنور' }, body: { en: 'Kabul naan and roghni naan, still too hot to hold properly.', ar: 'نان كابلي ونان روغني، ما زالا ساخنين يصعب حملهما.' } },
    { id: 'daal', title: { en: 'Daal Karahi', ar: 'دال كراهي' }, body: { en: 'Slow-cooked lentils finished with a garlic tarka at the last moment.', ar: 'عدس مطهو ببطء يُنهى بتقلية ثوم في اللحظة الأخيرة.' } },
    { id: 'sides', title: { en: 'The small things', ar: 'التفاصيل الصغيرة' }, body: { en: 'Raita, salad and something cold — one riyal each, and the table is complete.', ar: 'رايتة وسلطة وشيء بارد — بريال لكل منها، وتكتمل الطاولة.' } }
  ]
};

const visit = {
  hero: {
    eyebrow: { en: 'Visit Us', ar: 'زورونا' },
    title: { en: 'Find us in Al-Batha', ar: 'تجدنا في البطحاء' },
    lede: {
      en: 'Opposite Lulu Hypermarket. Walk in whenever you like — there is nothing to book and nothing to arrange.',
      ar: 'مقابل لولو هايبر ماركت. تفضَّل بالدخول متى شئت — لا شيء يُحجز ولا شيء يُرتَّب.'
    }
  },
  finding: {
    title: { en: 'Getting here', ar: 'كيف تصل' },
    steps: {
      en: [
        'Make your way to Al-Batha, central Riyadh — the old commercial heart of the city.',
        'Find Lulu Hypermarket. Everyone in the district knows it, so it is safe to ask.',
        'We are directly opposite, on the other side of the road. Look for the green and gold front.',
        'Taxi or Careem drivers: "Al Ashfaz Restaurant, opposite Lulu, Batha" is enough.'
      ],
      ar: [
        'توجَّه إلى البطحاء وسط الرياض — القلب التجاري القديم للمدينة.',
        'ابحث عن لولو هايبر ماركت. يعرفه الجميع في الحي، فلا بأس بالسؤال عنه.',
        'نحن مقابله مباشرة، على الجانب الآخر من الطريق. ابحث عن الواجهة الخضراء والذهبية.',
        'لسائقي التاكسي أو كريم: «مطعم آل أشفاز، مقابل لولو، البطحاء» تكفي.'
      ]
    }
  },
  faq: {
    title: { en: 'Before you come', ar: 'قبل أن تأتي' },
    items: [
      {
        q: { en: 'Do you take table bookings?', ar: 'هل تقبلون حجز الطاولات؟' },
        a: { en: 'No. Seating is first come, first served, every day. Around the middle of the day you may wait a few minutes for a table to clear — it moves quickly.', ar: 'لا. الجلوس بالأسبقية لمن يأتي أولاً، كل يوم. في منتصف النهار قد تنتظر دقائق حتى تخلو طاولة — لكن الحركة سريعة.' }
      },
      {
        q: { en: 'Do you deliver?', ar: 'هل تقدمون خدمة التوصيل؟' },
        a: { en: 'We do not deliver and we are not on any delivery app. Our food is built to be eaten minutes after it leaves the wok, and it does not survive a journey across Riyadh.', ar: 'لا نقدم التوصيل ولسنا على أي تطبيق توصيل. طعامنا مُعد ليُؤكل بعد دقائق من خروجه من المقلاة، ولا يصمد في رحلة عبر الرياض.' }
      },
      {
        q: { en: 'Can I take food away?', ar: 'هل يمكنني الطلب للخارج؟' },
        a: { en: 'Yes. Order at the counter, wait while it is cooked, and carry it home yourself. Naan travels best; karahi is at its best eaten here.', ar: 'نعم. اطلب من الكاونتر، وانتظر حتى يُطهى، ثم خذه معك. النان يتحمل السفر أكثر؛ أما الكراهي فأفضل ما تكون هنا.' }
      },
      {
        q: { en: 'How long does a karahi take?', ar: 'كم تستغرق الكراهي؟' },
        a: { en: 'Roughly fifteen to twenty minutes for a full karahi, because it is started from raw meat when you order it. Order naan and a salad to start and the wait passes.', ar: 'نحو خمس عشرة إلى عشرين دقيقة للكراهي الكاملة، لأنها تبدأ من اللحم الطازج عند طلبك. اطلب نان وسلطة للبداية ويمر الانتظار سريعاً.' }
      },
      {
        q: { en: 'Is everything halal?', ar: 'هل كل شيء حلال؟' },
        a: { en: 'Yes — every item on the menu, without exception.', ar: 'نعم — كل صنف في المنيو، بلا استثناء.' }
      },
      {
        q: { en: 'Is there a family section?', ar: 'هل يوجد قسم عائلي؟' },
        a: { en: 'There is no separate family section — one dining room, everyone in it. There is plenty of room for large groups, so if you are bringing a big table, come a little before the midday rush.', ar: 'لا يوجد قسم عائلي منفصل — صالة واحدة تجمع الجميع. لدينا مساحة واسعة للمجموعات الكبيرة، فإن كنت قادماً بطاولة كبيرة فتعال قبل ازدحام الظهيرة بقليل.' }
      },
      {
        q: { en: 'Do you have vegetarian dishes?', ar: 'هل لديكم أطباق نباتية؟' },
        a: { en: 'Yes. The whole Daal & Vegetable Karahi section is cooked without meat, and every bread from the tandoor is vegetarian.', ar: 'نعم. قسم الدال والخضار بأكمله يُطهى بدون لحم، وكل خبز من التنور نباتي.' }
      },
      {
        q: { en: 'How can I pay?', ar: 'ما وسائل الدفع المقبولة؟' },
        a: { en: 'However you like — cash, mada, credit cards and Apple Pay are all accepted at the counter.', ar: 'كما تشاء — نقداً أو مدى أو البطاقات الائتمانية أو Apple Pay، جميعها مقبولة عند الكاونتر.' }
      }
    ]
  }
};

const menuPage = {
  hero: {
    eyebrow: { en: 'The Menu', ar: 'المنيو' },
    title: { en: 'Everything we cook', ar: 'كل ما نطبخه' },
    lede: {
      en: 'Forty-four dishes, two daily specials, and not one of them made before you asked for it.',
      ar: 'أربعة وأربعون طبقاً، وطبقان مميزان يومياً، ولا واحد منها يُحضَّر قبل أن تطلبه.'
    }
  },
  posterCta: {
    title: { en: 'Prefer the printed menu?', ar: 'تفضّل المنيو المطبوع؟' },
    body: { en: 'The original poster, exactly as it hangs on our wall.', ar: 'الملصق الأصلي، تماماً كما هو معلَّق على جدارنا.' },
    action: { en: 'Open the poster', ar: 'افتح الملصق' }
  }
};

const notFound = {
  eyebrow: { en: 'Error 404', ar: 'خطأ ٤٠٤' },
  title: { en: 'That dish is not on the menu', ar: 'هذا الطبق ليس في المنيو' },
  lede: {
    en: 'The page you were looking for does not exist. The food, however, very much does.',
    ar: 'الصفحة التي تبحث عنها غير موجودة. أما الطعام، فموجود تماماً.'
  }
};

module.exports = {
  ui: ui, home: home, about: about,
  gallery: gallery, visit: visit, menuPage: menuPage, notFound: notFound
};

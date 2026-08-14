/* Orthodox Way — Oriental Catechism
   Content data: catechism, patristic commentaries, prayers, Q&A, quiz, notes. */

const TRADITIONS = [
  { id: 'all', label: 'All' },
  { id: 'coptic', label: 'Coptic' },
  { id: 'ethiopian', label: 'Ethiopian' },
  { id: 'syriac', label: 'Syriac' },
  { id: 'armenian', label: 'Armenian' },
  { id: 'malankara', label: 'Malankara' }
];

const TIERS = ['Foundations', 'Intermediate', 'Advanced'];

/* ---------------------------------------------------------------------
   CATECHISM — six core doctrinal pillars, expanded with sub-articles
--------------------------------------------------------------------- */
const CATECHISM = [
  {
    id: 'holy-trinity',
    title: 'The Holy Trinity',
    icon: '☩',
    tier: 'Foundations',
    tag: 'Faith',
    traditions: ['all'],
    summary: 'We believe in one God in three Persons: Father, Son, and Holy Spirit, consubstantial and co-eternal.',
    body: [
      'We believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible; and in one Lord Jesus Christ, the only-begotten Son of God; and in the Holy Spirit, the Lord, the Giver of life.',
      'The Father is unbegotten, the Son is begotten of the Father before all ages, and the Holy Spirit proceeds from the Father. The three Persons are one essence (ousia), one nature, one glory, co-equal and co-eternal.',
      'The Trinity is not three gods, nor is it one Person wearing three masks (Modalism), nor three separate beings sharing a family resemblance (Tritheism). It is one indivisible divine nature eternally existing as three distinct hypostases, each fully and equally God, distinguished only by their relations of origin.',
      'The Oriental Orthodox Churches confess the Holy Trinity in the words of the Nicene Creed as formulated at Nicaea (325) and expanded at Constantinople (381), without the later Filioque addition, holding that the Spirit proceeds from the Father alone, as the Son himself testifies (John 15:26).'
    ],
    scripture: ['Matthew 28:19', 'John 1:1-3', '2 Corinthians 13:14', 'John 15:26', 'Genesis 1:26'],
    patristics: [
      { father: 'St. Athanasius the Apostolic', tradition: 'Coptic', quote: 'The Father is Father, and not Son; the Son is Son, and not Father; and the Spirit is Spirit, and not Father or Son. The same Godhead is in the Trinity; wherefore also one God is preached in the Church.', source: 'Letters to Serapion' },
      { father: 'St. Gregory the Illuminator', tradition: 'Armenian', quote: 'We adore one nature of the Godhead, in three perfect Persons, undivided in glory, unconfused in Persons, eternally one in will and operation.', source: 'Teaching of St. Gregory' },
      { father: 'St. Ephrem the Syrian', tradition: 'Syriac', quote: 'Three in Name, and the Names do not divide the Substance; One in Substance, and the Substance does not deny the Names.', source: 'Hymns on Faith' }
    ],
    related: ['christology', 'holy-church']
  },
  {
    id: 'christology',
    title: 'Cyrillian Miaphysite Christology',
    icon: '✝',
    tier: 'Intermediate',
    tag: 'Faith',
    traditions: ['all'],
    summary: 'Mia Physis tou Theou Logou Sesarkomene — the one incarnate nature of God the Word, fully God and fully man, united without division, confusion, or change.',
    body: [
      'The Oriental Orthodox Churches confess, with St. Cyril of Alexandria, "mia physis tou Theou Logou sesarkomene" — one nature of God the Word incarnate. This is not a denial of Christ\'s full humanity, but an affirmation that in the Incarnation the divine Logos united a complete human nature to Himself so perfectly that the result is one single, undivided theandric (God-human) reality, one Person, one hypostasis, one nature-in-union.',
      'This formula must be read alongside St. Cyril\'s own qualification: the union is "without confusion, without change, without division, without separation" — the same four adverbs later used at Chalcedon (451), but understood by the Oriental Churches through Cyril\'s single-nature grammar rather than the "in two natures" language which they judged, at the time, to risk re-introducing a Nestorian division of Christ into two subjects.',
      'The Oriental Orthodox reject both Eutychianism (which taught that Christ\'s humanity was absorbed or dissolved into His divinity, so that only divinity remained) and Nestorianism (which taught two separate persons, divine and human, loosely conjoined). Miaphysitism affirms one incarnate nature that is simultaneously and fully divine and human, the divine and human properties (energies, wills, attributes) remaining intact and unconfused within that single union.',
      'St. Severus of Antioch, the great defender of this Christology, insisted that "nature" (physis) in this context means concrete individual reality (hypostasis), not abstract category — so "one nature" affirms one concrete Christ, not the erasure of His humanity.',
      'Modern ecumenical dialogues between the Oriental Orthodox and Eastern (Chalcedonian) Orthodox Churches (notably the 1989–1990 Chambésy agreements) have recognized that both families confess the same Christological faith in different theological language, opening a path toward eventual reconciliation of communion.'
    ],
    scripture: ['John 1:14', 'Philippians 2:6-11', 'Colossians 2:9', 'Hebrews 1:3'],
    patristics: [
      { father: 'St. Cyril of Alexandria', tradition: 'Coptic', quote: 'We unite the Word of God the Father to human nature by an ineffable and inconceivable union into one, without confusion or change... one Christ and Son and Lord, the same being at once God and man.', source: 'Second Letter to Nestorius' },
      { father: 'St. Severus of Antioch', tradition: 'Syriac', quote: 'We confess that the union is of two natures, but after the union we confess one incarnate nature of the Word, for the union produced one thing out of two, not a mere conjunction of two things left separate.', source: 'Philalethes' },
      { father: 'St. Cyril of Alexandria', tradition: 'Coptic', quote: 'One is the Son, one Lord Jesus Christ, both before the incarnation and after the incarnation.', source: 'Third Letter to Nestorius, Anathema 1' }
    ],
    related: ['holy-trinity', 'theotokos']
  },
  {
    id: 'holy-mysteries',
    title: 'The Holy Mysteries',
    icon: '⚭',
    tier: 'Foundations',
    tag: 'Sacraments',
    traditions: ['all'],
    summary: 'The seven Mysteries of the Church are outward signs of inward grace instituted by Christ.',
    body: [
      'A Mystery (Mysterion, often translated "Sacrament") is a visible, tangible action through which the Church, by the power of the Holy Spirit, communicates invisible, uncreated divine grace to the faithful. The Oriental Orthodox tradition recognizes seven principal Mysteries, though the Church\'s entire liturgical life is understood as sacramental.',
      '1. Baptism — death and rebirth in Christ, washing away original sin and uniting the believer to the Body of Christ, normally administered by triple immersion.',
      '2. Chrismation (Confirmation) — the sealing gift of the Holy Spirit, administered immediately after baptism with holy Myron (chrism oil), completing Christian initiation.',
      '3. The Eucharist — the Mystery of Mysteries: the bread and wine truly become the Body and Blood of Christ through the descent of the Holy Spirit (epiclesis), the perpetual sacrifice and communion of the New Covenant.',
      '4. Repentance and Confession — sacramental absolution given through the priest, restoring the penitent to communion after sin.',
      '5. Holy Orders — the laying on of hands that ordains deacons, priests, and bishops, transmitting apostolic authority and grace for ministry.',
      '6. Holy Matrimony — the crowning of husband and wife, uniting them as an icon of Christ\'s union with the Church.',
      '7. Unction of the Sick — anointing with holy oil for healing of body and soul, accompanied by prayer of the priests.'
    ],
    scripture: ['Matthew 28:19', 'John 6:53-56', 'James 5:14-15', 'John 20:22-23', 'Ephesians 5:31-32'],
    patristics: [
      { father: 'St. Cyril of Alexandria', tradition: 'Coptic', quote: 'The Body which is united to the Word is life-giving... it makes us partakers of the divine nature by communion with Him.', source: 'Commentary on John' },
      { father: 'St. Ephrem the Syrian', tradition: 'Syriac', quote: 'In that bread is hidden the Spirit who cannot be eaten; in that wine dwells the Fire that cannot be drunk: Spirit in the bread, Fire in the wine — a manifest wonder.', source: 'Hymns on Faith, 10' }
    ],
    related: ['salvation', 'holy-church']
  },
  {
    id: 'theotokos',
    title: 'The Holy Theotokos & Saints',
    icon: '✿',
    tier: 'Intermediate',
    tag: 'Faith',
    traditions: ['all'],
    summary: 'The Virgin Mary is Theotokos, "God-bearer," and the saints are the living members of Christ\'s Body who intercede for the Church.',
    body: [
      'The Council of Ephesus (431) affirmed, against Nestorius, that the Virgin Mary is truly Theotokos ("God-bearer" or "Mother of God") — not because she is the origin of Christ\'s divinity, but because the one she bore in the flesh is, without division, God the Word incarnate. To deny her the title Theotokos is, in effect, to divide Christ into two subjects.',
      'The Oriental Orthodox honor Mary as "more honored than the Cherubim and beyond compare more glorious than the Seraphim," ever-virgin (aeiparthenos), and the first and greatest of the redeemed, whose "yes" at the Annunciation made her a living tabernacle of the Incarnation.',
      'The saints are venerated, not worshiped, as friends of God who have been perfected in holiness and who now intercede before the throne of grace on behalf of the living Church. Their icons, relics, and commemorations are means of connecting the Church Militant on earth with the Church Triumphant in heaven, forming one communion of saints across time.',
      'Veneration (douleia/proskynesis) of the saints and their images is theologically distinct from worship (latreia), which belongs to God alone — a distinction articulated clearly by the Fathers to guard against any confusion of creature and Creator.'
    ],
    scripture: ['Luke 1:28-35', 'Luke 1:43', 'Luke 1:48', 'Revelation 5:8', 'Hebrews 12:1'],
    patristics: [
      { father: 'St. Cyril of Alexandria', tradition: 'Coptic', quote: 'Hail Mary, Theotokos, venerable treasure of the whole world, unquenchable lamp, crown of virginity, scepter of orthodoxy, indestructible temple, dwelling place of Him whom no place can contain.', source: 'Homily at Ephesus' },
      { father: 'St. Gregory the Illuminator', tradition: 'Armenian', quote: 'She who bore the Unbearable in her womb is worthy of every honor the tongue of man can offer, for through her the ancient curse was undone.', source: 'Teaching of St. Gregory' }
    ],
    related: ['christology', 'holy-church']
  },
  {
    id: 'salvation',
    title: 'Salvation & Theosis',
    icon: '☀',
    tier: 'Advanced',
    tag: 'Faith',
    traditions: ['all'],
    summary: 'Salvation is union with God — theosis, becoming partakers of the divine nature by grace, not by nature.',
    body: [
      'Salvation in the Oriental Orthodox understanding is not merely a legal acquittal from guilt, but the healing and transformation of human nature itself, restored to communion with God and progressively conformed to His likeness — a process the Fathers call theosis or deification.',
      'The foundation of theosis is the Incarnation itself: "God became man so that man might become god" (by grace, never by nature). Christ, by uniting divinity and humanity in His one Person, opened the possibility for all humanity to share, through Him, in divine life, without ceasing to be creatures.',
      'Theosis unfolds through the sacramental and ascetic life of the Church: baptism, chrismation, and the Eucharist unite the believer to Christ; prayer, fasting, almsgiving, and repentance purify the heart (catharsis); and progressive illumination (theoria) and union with God (theosis proper) mark the mature stages of the spiritual life, as described especially in the Egyptian monastic and Syriac ascetic traditions.',
      'This is not pantheism — the creature never becomes identical with God\'s essence — but a real participation in God\'s uncreated energies and life, "partakers of the divine nature" (2 Peter 1:4), while the ontological distinction between Creator and creature remains eternally.'
    ],
    scripture: ['2 Peter 1:4', 'John 17:21-23', '2 Corinthians 3:18', 'Romans 8:29-30', 'Psalm 82:6'],
    patristics: [
      { father: 'St. Athanasius the Apostolic', tradition: 'Coptic', quote: 'For He was made man that we might be made god (theopoiethomen).', source: 'On the Incarnation, 54' },
      { father: 'St. Ephrem the Syrian', tradition: 'Syriac', quote: 'He gave us divinity, we gave Him humanity... He humbled Himself greatly, and He raised us up greatly.', source: 'Hymns on Faith, 5' },
      { father: 'St. Cyril of Alexandria', tradition: 'Coptic', quote: 'We are all one in Christ... For He knits us to Himself and to one another by the bond of His own Body.', source: 'Commentary on John, Book 11' }
    ],
    related: ['christology', 'holy-mysteries']
  },
  {
    id: 'holy-church',
    title: 'Holy Church & Councils',
    icon: '⛪',
    tier: 'Foundations',
    tag: 'Church',
    traditions: ['all'],
    summary: 'The Church is the Body of Christ, one, holy, catholic, and apostolic, gathered around three Ecumenical Councils.',
    body: [
      'The Church is not merely an institution but the living Body of Christ, of which He is the Head and all believers, living and departed, are members (1 Corinthians 12:27). It is "one" in faith and sacramental life, "holy" as consecrated by the Spirit, "catholic" (universal) in embracing all nations and the fullness of truth, and "apostolic" as continuing in unbroken succession from the Apostles.',
      'The Oriental Orthodox Communion — Coptic, Ethiopian/Eritrean, Syriac, Armenian, Malankara (Indian), and Eritrean — accepts the doctrinal authority of the first three Ecumenical Councils: Nicaea I (325), which defined the divinity of the Son against Arius; Constantinople I (381), which completed the Creed and defined the divinity of the Holy Spirit against the Pneumatomachians; and Ephesus (431), which upheld the unity of Christ and the title Theotokos against Nestorius.',
      'The Oriental Orthodox Churches did not accept the Council of Chalcedon (451), believing its "in two natures" formula, absent Cyril\'s safeguards, risked reopening Nestorian division, and so preserved St. Cyril\'s miaphysite Christology as the authentic expression of Ephesus. This is why the Oriental Orthodox are sometimes historically (and today considered inaccurately) called "Monophysite" — they reject Eutychian monophysitism just as firmly as Chalcedonian dyophysitism, holding instead to Cyril\'s "one nature" in the fully orthodox sense described in Christology above.',
      'Each self-governing Church within the Oriental Orthodox Communion is led by its own Patriarch or Catholicos, in full sacramental communion with the others, sharing one apostolic faith while retaining distinct liturgical, linguistic, and cultural traditions.'
    ],
    scripture: ['Matthew 16:18', 'Ephesians 1:22-23', '1 Corinthians 12:27', 'Ephesians 4:4-6'],
    patristics: [
      { father: 'St. Cyril of Alexandria', tradition: 'Coptic', quote: 'The Church is called the body of Christ, and we are members of it, each in our part, according to the Apostle.', source: 'Commentary on John' },
      { father: 'St. Severus of Antioch', tradition: 'Syriac', quote: 'We do not depart from the faith of the three hundred and eighteen at Nicaea, nor from the hundred and fifty at Constantinople, nor from the two hundred at Ephesus; this is our inheritance and our confession.', source: 'Homily 109' }
    ],
    related: ['holy-trinity', 'christology']
  }
];

/* ---------------------------------------------------------------------
   COMMENTARIES — patristic exegesis, primarily Fr. Tadros Malaty
   plus classical Fathers, organized by book > passage > entries
--------------------------------------------------------------------- */
const COMMENTARIES = [
  {
    book: 'John', ref: 'John 1:1', order: 1,
    text: '"In the beginning was the Word, and the Word was with God, and the Word was God."',
    entries: [
      { father: 'St. Cyril of Alexandria', tradition: 'Coptic', text: 'The Evangelist does not say "the Word was a god," but "the Word was God," showing the unity of essence. He was with God, not as one who is before a master, but as one who shares equally in the same nature. For as light is from light, so the Word is from God, naturally and without division.', source: 'Commentary on the Gospel of John, Book I' },
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'St. John opens his Gospel not with Christ\'s birth in time but with His eternal existence "in the beginning," before all ages, to lift our minds at once above every category of creation. "The Word was with God" reveals a real distinction of Persons, while "the Word was God" reveals the unity of the one divine nature — the Evangelist guards, in a single verse, both the Trinity and the Unity, so that no one may imagine a solitary God without relationship, nor many gods without unity.', source: 'Tadros Malaty, Commentary on St. John, Ch. 1' },
      { father: 'St. Ephrem the Syrian', tradition: 'Syriac', text: 'Before the mountains were settled, before the fountains gushed forth, the Word was — not made, but ever-begotten, dwelling in the bosom of the Father, from whom He never departed even while He dwelt among us.', source: 'Commentary on the Diatessaron' }
    ]
  },
  {
    book: 'John', ref: 'John 1:14', order: 2,
    text: '"And the Word became flesh and dwelt among us, and we beheld His glory, the glory as of the only begotten of the Father, full of grace and truth."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'The Word did not merely appear in flesh, nor put on flesh as a garment to be discarded; He "became" flesh, uniting our human nature to Himself in a real, abiding union, "tabernacling" (eskenosen) among us as God once tabernacled in the midst of Israel — so that the flesh which received Him might itself become a fountain of grace to all who receive Him by faith.', source: 'Tadros Malaty, Commentary on St. John, Ch. 1' },
      { father: 'St. Cyril of Alexandria', tradition: 'Coptic', text: 'He became flesh, that is, man; yet He remained what He was — God by nature. The flesh became His own, not another\'s alongside Him, so that the very same one who is God is also, inseparably, man.', source: 'Commentary on the Gospel of John' }
    ]
  },
  {
    book: 'John', ref: 'John 3:16', order: 3,
    text: '"For God so loved the world, that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'The love spoken of here is agape — a self-giving, self-emptying love with no cause outside itself but God\'s own nature. He "gave" His Son, not lent Him or displayed Him from afar, but handed Him over to the Cross itself, that the gift might be complete and that faith, not merit, might be the sole door into everlasting life.', source: 'Tadros Malaty, Commentary on St. John, Ch. 3' }
    ]
  },
  {
    book: 'John', ref: 'John 6:53-56', order: 4,
    text: '"Most assuredly, I say to you, unless you eat the flesh of the Son of Man and drink His blood, you have no life in you..."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'The Lord speaks with deliberate, unmistakable realism — He does not soften the offense to the Jews who heard Him, because the Eucharist is no mere symbol of remembrance but true participation in His life-giving Body and Blood, by which the believer "abides" in Christ and Christ in the believer, an exchange of indwelling that is the very heart of the Christian life.', source: 'Tadros Malaty, Commentary on St. John, Ch. 6' },
      { father: 'St. Cyril of Alexandria', tradition: 'Coptic', text: 'That we might be knit together with Him in one body, He gives His own Body to those who believe, that as the flesh, in contact with the life-giving flesh of the Word, is itself made life-giving, so we too, by this communion, receive within us Him who is by nature Life.', source: 'Commentary on the Gospel of John' }
    ]
  },
  {
    book: 'Matthew', ref: 'Matthew 16:16-18', order: 5,
    text: '"You are the Christ, the Son of the living God... you are Peter, and on this rock I will build My church."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'Peter\'s confession is not his own private insight but a revelation given by the Father (v.17) — and it is upon this confessed faith, this rock of apostolic truth concerning who Christ is, that the Church is founded, not upon Peter\'s person alone. Every believer who makes Peter\'s confession his own becomes, in that sense, a living stone built upon the same rock.', source: 'Tadros Malaty, Commentary on St. Matthew, Ch. 16' }
    ]
  },
  {
    book: 'Matthew', ref: 'Matthew 28:19-20', order: 6,
    text: '"Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit..."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'The Great Commission binds together evangelism, baptism, and formation — "teaching them to observe all things." Baptism "in the name" (singular) of the three Persons quietly proclaims the Trinity: one name, one divine nature, shared equally by Father, Son, and Spirit, even as the mission of the Church is entrusted to the Eleven and, through them, to every generation of disciples until "the end of the age."', source: 'Tadros Malaty, Commentary on St. Matthew, Ch. 28' }
    ]
  },
  {
    book: 'Luke', ref: 'Luke 1:38', order: 7,
    text: '"Then Mary said, \'Behold the maidservant of the Lord! Let it be to me according to your word.\'"',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'Mary\'s fiat is the free response of faith that reverses the disobedience of Eve. Where Eve\'s "yes" to the serpent brought death, Mary\'s "yes" to the angel opens the door to Life Himself entering the world. Her humility — calling herself "maidservant" even as she is named "full of grace" — models the true posture of the soul before God: total surrender that becomes the occasion of divine indwelling.', source: 'Tadros Malaty, Commentary on St. Luke, Ch. 1' }
    ]
  },
  {
    book: 'Luke', ref: 'Luke 15:20-24', order: 8,
    text: 'The Parable of the Prodigal Son — "But when he was still a great way off, his father saw him and had compassion..."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'The father does not wait passively for the son\'s return; he "saw him... and ran" — an image of God\'s own eagerness to restore the repentant sinner, running ahead of our confession with His compassion. The robe, ring, and sandals restore the son\'s full dignity as a son, not a servant, prefiguring the restoration granted in baptism and confession: not mere pardon, but readoption into the household of grace.', source: 'Tadros Malaty, Commentary on St. Luke, Ch. 15' }
    ]
  },
  {
    book: 'Romans', ref: 'Romans 5:12-19', order: 9,
    text: '"Therefore, just as through one man sin entered the world, and death through sin... so also by one Man\'s obedience many will be made righteous."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'St. Paul draws the great parallel and contrast between Adam and Christ, the two heads of humanity. In Adam, all inherited a fallen, mortal nature, not merely legal guilt; in Christ, the Second Adam, a new humanity is offered — not a return to Eden\'s innocence but an ascent into the very life of God, since "grace abounded much more" than sin ever could.', source: 'Tadros Malaty, Commentary on Romans, Ch. 5' },
      { father: 'St. Cyril of Alexandria', tradition: 'Coptic', text: 'As in Adam all die because they share his corrupted nature, so in Christ all are made alive because they are made to share, through the Spirit, in His incorruptible, life-giving nature.', source: 'On the Unity of Christ' }
    ]
  },
  {
    book: 'Romans', ref: 'Romans 8:14-17', order: 10,
    text: '"For as many as are led by the Spirit of God, these are sons of God... and if children, then heirs — heirs of God and joint heirs with Christ."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'Adoption (huiothesia) is not a legal fiction but a real transformation worked by the indwelling Spirit, who cries "Abba, Father" within us and bears witness with our own spirit. Sonship carries inheritance — sharing not only Christ\'s glory but, first, the fellowship of His sufferings, since the path to glory passes through the Cross for every adopted son.', source: 'Tadros Malaty, Commentary on Romans, Ch. 8' }
    ]
  },
  {
    book: '1 Corinthians', ref: '1 Corinthians 11:23-26', order: 11,
    text: '"For I received from the Lord that which I also delivered to you: that the Lord Jesus... took bread... \'This is My body which is broken for you.\'"',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'St. Paul hands on the Eucharistic tradition as something "received from the Lord" — an unbroken chain of apostolic transmission, not human invention. "Do this in remembrance of Me" is not a bare memorial but an anamnesis: a liturgical re-presentation that makes the one sacrifice of Calvary truly present at every altar until He comes.', source: 'Tadros Malaty, Commentary on 1 Corinthians, Ch. 11' }
    ]
  },
  {
    book: '1 Corinthians', ref: '1 Corinthians 15:20-22', order: 12,
    text: '"But now Christ is risen from the dead, and has become the firstfruits of those who have fallen asleep... For as in Adam all die, even so in Christ all shall be made alive."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'Christ\'s resurrection is not an isolated miracle but the "firstfruits" — the guarantee and first installment of the general resurrection of all humanity. Because He truly took our nature into the tomb and truly raised it in glory, our own bodily resurrection is not a hope grafted onto Christianity from outside but its organic center.', source: 'Tadros Malaty, Commentary on 1 Corinthians, Ch. 15' }
    ]
  },
  {
    book: 'Hebrews', ref: 'Hebrews 4:14-16', order: 13,
    text: '"Seeing then that we have a great High Priest who has passed through the heavens, Jesus the Son of God, let us hold fast our confession..."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'Christ\'s high priesthood is unlike the Levitical priesthood, offered once and eternally effective, exercised by One who "was in all points tempted as we are, yet without sin" — so that His throne of judgment becomes, for the penitent, a "throne of grace," approached boldly not because of our merit but because of His sympathetic mediation.', source: 'Tadros Malaty, Commentary on Hebrews, Ch. 4' }
    ]
  },
  {
    book: 'Hebrews', ref: 'Hebrews 9:11-14', order: 14,
    text: '"But Christ came as High Priest... not with the blood of goats and calves, but with His own blood He entered the Most Holy Place once for all..."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'The old covenant sacrifices could only cleanse the flesh outwardly; Christ\'s self-offering, "through the eternal Spirit," cleanses the conscience itself, reaching to the interior life of the soul. This is why the Eucharistic sacrifice can be called "once for all" and yet perpetually offered: it is one eternal act entering our time repeatedly through the Liturgy, not repeated in itself.', source: 'Tadros Malaty, Commentary on Hebrews, Ch. 9' }
    ]
  },
  {
    book: 'Genesis', ref: 'Genesis 1:26-27', order: 15,
    text: '"Then God said, \'Let Us make man in Our image, according to Our likeness\'... So God created man in His own image..."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'The plural "Let Us make" is heard by the Fathers as an early intimation of the Trinity, the divine council of Persons acting as one in creation. "Image" (tselem) is a given, unlosable dignity stamped on every human being; "likeness" (demuth) is a dynamic vocation to grow, through communion with God, into ever-greater conformity with Him — the theological seed of theosis planted at creation itself.', source: 'Tadros Malaty, Commentary on Genesis, Ch. 1' },
      { father: 'St. Athanasius the Apostolic', tradition: 'Coptic', quote: null, text: 'Man, being made in the image, was called to know his Archetype and, by fixing his eyes on Him, to keep his own nature from corruption — for it is by looking away that he fell.', source: 'On the Incarnation, 3' }
    ]
  },
  {
    book: 'Genesis', ref: 'Genesis 3:14-15', order: 16,
    text: '"And I will put enmity between you and the woman, and between your seed and her Seed; He shall bruise your head, and you shall bruise His heel."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'The Protoevangelium — the "first gospel" — is announced in the very moment of the Fall. The "Seed of the woman" who crushes the serpent\'s head, at the cost of a wound to His own heel, is read by the whole patristic tradition as the first veiled promise of Christ\'s victory over Satan through the Cross, and of the Virgin who would bear that Seed.', source: 'Tadros Malaty, Commentary on Genesis, Ch. 3' }
    ]
  },
  {
    book: 'Psalms', ref: 'Psalm 22 (LXX 21)', order: 17,
    text: '"My God, My God, why have You forsaken Me?... They pierced My hands and My feet... They divide My garments among them, and for My clothing they cast lots."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'This psalm is prayed by the Church as the very voice of Christ upon the Cross, prophesying with startling precision the details of the Crucifixion centuries before crucifixion existed as a punishment in Israel. Yet it moves, as does the Cross itself, from desolation (v.1) to triumphant praise (v.22-31) — the pattern of every Christian\'s passage through suffering into resurrection glory.', source: 'Tadros Malaty, Commentary on the Psalms' }
    ]
  },
  {
    book: 'Psalms', ref: 'Psalm 23 (LXX 22)', order: 18,
    text: '"The Lord is my shepherd; I shall not want... Even though I walk through the valley of the shadow of death, I will fear no evil; for You are with me."',
    entries: [
      { father: 'Fr. Tadros Malaty', tradition: 'Coptic', text: 'The Good Shepherd of this psalm is fulfilled in Christ who says of Himself, "I am the good shepherd" (John 10:11). The "table prepared... in the presence of my enemies" is read liturgically as the Eucharistic table, and the "house of the Lord forever" as the eternal Church and the age to come — the whole psalm becomes a road map of the soul\'s pilgrimage from this life to the heavenly banquet.', source: 'Tadros Malaty, Commentary on the Psalms' }
    ]
  }
];

/* ---------------------------------------------------------------------
   PRAYERS — Agpeya / Shehimo canonical hours & devotions
--------------------------------------------------------------------- */
const PRAYERS = [
  {
    id: 'prime',
    title: 'Morning Prayer (Prime / First Hour)',
    subtitle: 'Agpeya · Prayed at sunrise',
    lines: [
      { role: 'rubric', text: 'Stand facing East. Begin with the sign of the Cross.' },
      { role: 'priest', text: 'In the name of the Father, and of the Son, and of the Holy Spirit, one God. Amen.' },
      { role: 'congregation', text: 'O Lord, open my lips, and my mouth shall declare Your praise (Psalm 51:15).' },
      { role: 'priest', text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, both now and ever, and unto the ages of ages. Amen.' },
      { role: 'deacon', text: 'O Lord, You have been our refuge in every generation (Psalm 90:1).' },
      { role: 'congregation', text: 'You turn man back into dust, and say, "Return, O sons of men." A thousand years in Your sight are like yesterday when it is past, or like a watch in the night.' },
      { role: 'priest', text: 'Satisfy us early with Your mercy, that we may rejoice and be glad all our days. Let the beauty of the Lord our God be upon us, and establish the work of our hands for us.' },
      { role: 'rubric', text: 'Conclude with the Lord\'s Prayer and the Trisagion.' }
    ]
  },
  {
    id: 'eleventh-hour',
    title: 'The 11th Hour (Sunset)',
    subtitle: 'Agpeya / Shehimo · Prayed at sunset',
    lines: [
      { role: 'priest', text: 'In the name of the Father, and of the Son, and of the Holy Spirit, one God. Amen.' },
      { role: 'congregation', text: 'I have lifted up my eyes to You, who dwell in heaven. Behold, as the eyes of servants look to the hand of their masters... so our eyes look to the Lord our God, until He has mercy on us (Psalm 123).' },
      { role: 'deacon', text: 'Praise the Lord, all you nations! Laud Him, all you peoples! For His merciful kindness is great toward us, and the truth of the Lord endures forever (Psalm 117).' },
      { role: 'rubric', text: 'The Trisagion Prayer follows, chanted in Coptic, Ge\'ez, Syriac, Armenian, or Malayalam according to local tradition.' },
      { role: 'priest', text: 'As the sun goes down and the light of day departs, we thank You, O Christ our God, for keeping us this day, and we ask that You keep us this coming night without sin.' }
    ]
  },
  {
    id: 'twelfth-hour',
    title: 'The 12th Hour (Compline)',
    subtitle: 'Agpeya / Shehimo · Prayed before sleep',
    lines: [
      { role: 'priest', text: 'In the name of the Father, and of the Son, and of the Holy Spirit, one God. Amen.' },
      { role: 'congregation', text: 'Into Your hands, O Lord, I commit my spirit; for You have redeemed me, O Lord God of truth (Psalm 31:5).' },
      { role: 'deacon', text: 'He who dwells in the secret place of the Most High shall abide under the shadow of the Almighty (Psalm 91:1).' },
      { role: 'rubric', text: 'This hour is often prayed silently or in a low voice, in preparation for rest.' },
      { role: 'priest', text: 'Grant us, O Lord, a peaceful sleep, free from every satanic fantasy, and raise us in the morning fit to serve You all the days of our life.' }
    ]
  },
  {
    id: 'creed',
    title: 'The Nicene-Constantinopolitan Creed',
    subtitle: 'The Symbol of Faith, without the Filioque',
    lines: [
      { role: 'congregation', text: 'We believe in one God, God the Father, the Pantocrator, who created heaven and earth, and all things seen and unseen.' },
      { role: 'congregation', text: 'We believe in one Lord Jesus Christ, the only-begotten Son of God, begotten of the Father before all ages, Light of Light, true God of true God, begotten not created, of one essence with the Father, by whom all things were made.' },
      { role: 'congregation', text: 'Who for us men and for our salvation came down from heaven, and was incarnate of the Holy Spirit and the Virgin Mary, and became man.' },
      { role: 'congregation', text: 'And He was crucified for us under Pontius Pilate, suffered and was buried. And on the third day He rose from the dead, according to the Scriptures.' },
      { role: 'congregation', text: 'And He ascended into the heavens and sat at the right hand of His Father, and He is coming again in His glory to judge the living and the dead, whose kingdom shall have no end.' },
      { role: 'congregation', text: 'Yes, we believe in the Holy Spirit, the Lord, the Giver of Life, who proceeds from the Father, who with the Father and the Son is worshiped and glorified, who spoke by the prophets.' },
      { role: 'congregation', text: 'And in one holy, catholic, and apostolic Church. We confess one baptism for the remission of sins. We look for the resurrection of the dead, and the life of the age to come. Amen.' }
    ]
  },
  {
    id: 'trisagion',
    title: 'The Trisagion Prayer',
    subtitle: 'Holy God, Holy Mighty, Holy Immortal',
    lines: [
      { role: 'congregation', text: 'Holy God, Holy Mighty, Holy Immortal, who was born of the Virgin, have mercy on us.' },
      { role: 'congregation', text: 'Holy God, Holy Mighty, Holy Immortal, who was crucified for us, have mercy on us.' },
      { role: 'congregation', text: 'Holy God, Holy Mighty, Holy Immortal, who rose from the dead and ascended into the heavens, have mercy on us.' },
      { role: 'priest', text: 'Glory be to the Father, and to the Son, and to the Holy Spirit, both now and ever, and unto the ages of ages. Amen.' },
      { role: 'congregation', text: 'O Holy Trinity, have mercy on us. O Lord, forgive us our sins. O Master, pardon our iniquities. O Holy One, visit and heal our infirmities, for Your name\'s sake.' }
    ]
  },
  {
    id: 'thanksgiving',
    title: 'The Thanksgiving Prayer',
    subtitle: 'Prayed at the opening of every service and every hour',
    lines: [
      { role: 'priest', text: 'Let us give thanks to the beneficent and merciful God, the Father of our Lord, God and Savior, Jesus Christ.' },
      { role: 'congregation', text: 'For He has covered us, helped us, guarded us, accepted us unto Him, spared us, supported us, and brought us to this hour.' },
      { role: 'priest', text: 'Let us also ask Him, the Lord our God, the Pantocrator, to guard us in all peace this holy day and all the days of our life.' },
      { role: 'congregation', text: 'O Master, Lord, God the Pantocrator, the Father of our Lord, God and Savior, Jesus Christ, we thank You for every condition, concerning every condition, and in every condition, for You have covered us, helped us... Glory be to You, O Lord, in all things, for You are worthy of praise, glorified and exalted above all things, forever. Amen.' }
    ]
  }
];

const KYRIE_TARGET = 41;

/* ---------------------------------------------------------------------
   Q&A — apologetics catalog
--------------------------------------------------------------------- */
const QA = [
  {
    id: 'qa-monophysite',
    q: 'Are the Oriental Orthodox "Monophysite" heretics?',
    tier: 'Foundations',
    a: 'No. "Monophysite" (from Eutyches, who taught Christ\'s humanity was absorbed into His divinity) is a label historically applied to the Oriental Orthodox, but it misrepresents the actual teaching. The Oriental Orthodox confess "Miaphysitism" — following St. Cyril of Alexandria\'s formula "one incarnate nature of God the Word" — which affirms Christ as fully God and fully man, united in one nature without confusion, change, division, or separation, with both natures\' properties fully intact. Eutyches was in fact condemned by the Oriental Orthodox Churches themselves at the Home Synod under Dioscorus. The disagreement with Chalcedonian Orthodoxy is about theological language ("two natures" vs. "one incarnate nature"), not about the underlying faith — a point recognized in the modern Chambésy agreed statements.',
    takeaway: 'The Oriental Orthodox reject Eutychian monophysitism as firmly as they reject Nestorianism; "Miaphysite," not "Monophysite," is the accurate historical-theological term.',
    anchor: 'St. Cyril of Alexandria: "One is the Son... both before the incarnation and after the incarnation."'
  },
  {
    id: 'qa-icons',
    q: 'Is venerating icons and relics not a form of idolatry?',
    tier: 'Foundations',
    a: 'The Church distinguishes sharply between latreia (worship due to God alone) and douleia/proskynesis (veneration or honor, which may be given to holy people, places, and things because of their relationship to God). When a believer venerates an icon of Christ or a saint, the honor passes through the image to the person depicted — no one worships wood and paint. This is analogous to honoring a photograph of a loved one, or Israel\'s reverence for the Ark of the Covenant, the Temple, or Moses\' staff, none of which was idolatry because none terminated worship in the object itself. Idolatry is worship of a false god or of creation as though it were the Creator; veneration through icons is the opposite — a discipline that keeps the mind fixed on the true God and His works in the saints.',
    takeaway: 'Veneration (honor passed through an image to its subject) is categorically distinct from worship (owed to God alone); confusing the two collapses a distinction the Fathers were careful to preserve.',
    anchor: 'Basil the Great (cited across Oriental Orthodox tradition): "The honor given to the image passes to the prototype."'
  },
  {
    id: 'qa-mary-worship',
    q: 'Do Orthodox Christians worship Mary?',
    tier: 'Foundations',
    a: 'No. Mary is venerated, not worshiped — she herself, in the Magnificat, glorifies God, not herself (Luke 1:46-47), and the Church follows her example. She is honored as Theotokos because of who she bore, as the model of faith and obedience, and as the first among the redeemed who now intercedes for the Church, just as any believer might ask a fellow Christian to pray for them (James 5:16) — except that Mary\'s prayers are asked with the confidence that she stands closest to her Son in glory. Calling her "Queen of Heaven" or singing hymns of praise to her does not equate her with God; the entire theological structure of Marian devotion in Oriental Orthodoxy exists to safeguard and celebrate the Incarnation of her Son, not to elevate her to divinity.',
    takeaway: 'Honor given to Mary always terminates in glorifying Christ; she is the supreme example of a creature transformed by grace, never an object of worship in herself.',
    anchor: 'St. Cyril of Alexandria: "Hail Mary, Theotokos... through whom the Holy Trinity is glorified."'
  },
  {
    id: 'qa-sola-scriptura',
    q: 'Why do Orthodox Christians rely on Church Tradition, not Scripture alone?',
    tier: 'Intermediate',
    a: 'The Oriental Orthodox hold that Scripture itself arose from within the life and Tradition of the Church — the Apostles preached and the Church gathered before the New Testament was written or its canon settled, and it was the Church, guided by the Holy Spirit, that recognized and received the canon of Scripture in the first place. Tradition (Holy Tradition, capital T) is not an addition alongside Scripture but the living context — the Creeds, the Councils, the Liturgy, the Fathers, the sacramental life — within which Scripture is rightly interpreted, guarding against private, isolated, and contradictory readings. Scripture and Tradition are not two separate sources of revelation but one stream, Scripture being its supreme written expression, safeguarded and rightly proclaimed within the Church that produced it.',
    takeaway: 'Scripture was born from and is read within Holy Tradition; the "Bible alone" approach that isolates Scripture from the Church that canonized and has always interpreted it is itself a departure from how the New Testament church actually worked.',
    anchor: 'St. Athanasius appealed constantly to "the tradition, teaching, and faith of the Catholic Church from the beginning" as the rule for reading Scripture rightly.'
  },
  {
    id: 'qa-purpose-fasting',
    q: 'Why does the Church require so much fasting?',
    tier: 'Intermediate',
    a: 'Fasting in the Oriental Orthodox tradition is never an end in itself, still less a means of "earning" God\'s favor; it is an ascetic discipline that trains the body to serve the soul rather than rule it, freeing attention and resources (through almsgiving) for prayer and love of neighbor. Christ Himself fasted forty days (Matthew 4:2) and assumed His disciples would fast (Matthew 6:16-18, 9:15). The Church\'s seven canonical fasts structure the liturgical year around the great feasts, teaching patience, repentance, and dependence on God rather than on food, while abstention from animal products (the traditional Oriental Orthodox fasting rule) also expresses solidarity with a groaning creation awaiting redemption (Romans 8:19-22).',
    takeaway: 'Fasting disciplines desire so that love of God and neighbor can grow; it is medicinal and formative, not transactional or salvific in itself.',
    anchor: 'St. Athanasius: "Fasting cures diseases, dries up the bodily humors, casts out demons, chases away wicked thoughts... clears the mind, purifies the heart, sanctifies the body, and sets a person before the throne of God."'
  },
  {
    id: 'qa-communion-other',
    q: 'Why can\'t I take Communion at an Oriental Orthodox church if I\'m not a member?',
    tier: 'Advanced',
    a: 'The Eucharist is the sacrament of unity — it expresses and seals a shared confession of faith, sacramental life, and communion under one bishop within the Church\'s canonical structure; it is not primarily an expression of individual piety but of ecclesial belonging. To commune together (syn + koinonia) presumes one is already in full communion — one faith, one baptism, one apostolic order — with the Church at whose altar one approaches. This "closed communion" discipline, shared historically by nearly all ancient Churches, is meant not to exclude out of unkindness but to keep the sacrament truthful: receiving Communion together falsely announces a unity that does not yet exist. Those from other traditions are warmly welcomed to attend, pray, and receive a blessing, while formal communion awaits either membership or the restoration of full ecclesial unity (as ongoing dialogues with the Eastern Orthodox seek to achieve).',
    takeaway: 'Communion presumes and seals actual ecclesial unity; receiving it prematurely would misrepresent a unity of faith and order that does not yet exist.',
    anchor: 'St. Severus of Antioch treated communion in the sacraments as inseparable from communion in right confession of faith.'
  }
];

/* ---------------------------------------------------------------------
   QUIZ — multiple choice, three tiers
--------------------------------------------------------------------- */
const QUIZ = [
  { id: 'q1', tier: 'Foundations', question: 'How many Persons are there in the Holy Trinity?', options: ['One', 'Two', 'Three', 'Seven'], answer: 2, rationale: 'The Church confesses one God in three co-equal, co-eternal Persons: Father, Son, and Holy Spirit — one essence, three hypostases.' },
  { id: 'q2', tier: 'Foundations', question: 'What does "Theotokos" mean?', options: ['Holy Virgin', 'God-bearer', 'Mother of the Church', 'Queen of Heaven'], answer: 1, rationale: 'Theotokos literally means "God-bearer," affirming that the child Mary bore is truly God the Word incarnate, defined at the Council of Ephesus (431).' },
  { id: 'q3', tier: 'Foundations', question: 'How many Holy Mysteries (Sacraments) does the Church recognize?', options: ['Two', 'Five', 'Seven', 'Twelve'], answer: 2, rationale: 'The seven Mysteries are Baptism, Chrismation, Eucharist, Repentance, Holy Orders, Matrimony, and Unction of the Sick.' },
  { id: 'q4', tier: 'Foundations', question: 'Which prayer is prayed at the Twelfth Hour of the Agpeya?', options: ['Morning Prayer', 'The Trisagion only', 'Compline (before sleep)', 'The Divine Liturgy'], answer: 2, rationale: 'The Twelfth Hour is Compline, prayed before sleep, entrusting the soul to God\'s keeping through the night.' },
  { id: 'q5', tier: 'Intermediate', question: 'What does the Cyrillian formula "mia physis tou Theou Logou sesarkomene" mean?', options: ['Two natures of Christ in perfect balance', 'One nature of God the Word incarnate', 'Christ has only a divine nature', 'The Father and Son share one will'], answer: 1, rationale: 'This is St. Cyril of Alexandria\'s Christological formula: one incarnate nature of God the Word, affirming full divinity and full humanity united without confusion or division.' },
  { id: 'q6', tier: 'Intermediate', question: 'Which council did the Oriental Orthodox Churches decline to accept?', options: ['Nicaea I (325)', 'Constantinople I (381)', 'Ephesus (431)', 'Chalcedon (451)'], answer: 3, rationale: 'The Oriental Orthodox accept the first three Ecumenical Councils but did not accept Chalcedon (451), judging its "two natures" formula to risk dividing Christ.' },
  { id: 'q7', tier: 'Intermediate', question: 'What is the difference between latreia and douleia?', options: ['Two names for the same worship', 'Latreia is worship due to God alone; douleia is veneration given to saints and icons', 'Latreia is for saints, douleia is for God', 'There is no theological distinction'], answer: 1, rationale: 'Latreia (worship) belongs to God alone; douleia or proskynesis (veneration/honor) may be given to saints, icons, and holy things because of their relation to God, without confusing creature and Creator.' },
  { id: 'q8', tier: 'Intermediate', question: 'Who is credited with the extensive modern Coptic Bible commentaries frequently cited in this app?', options: ['St. John Chrysostom', 'Fr. Tadros Malaty', 'Origen of Alexandria', 'St. Basil the Great'], answer: 1, rationale: 'Fr. Tadros Malaty (1935–2021) was a Coptic Orthodox priest-scholar renowned for his extensive verse-by-verse Bible commentaries drawing deeply on the Church Fathers.' },
  { id: 'q9', tier: 'Advanced', question: 'What Greek term describes the process of deification/union with God by grace?', options: ['Kenosis', 'Theosis', 'Kerygma', 'Anamnesis'], answer: 1, rationale: 'Theosis (deification) is the process, by grace and not by nature, of becoming "partakers of the divine nature" (2 Peter 1:4), begun in this life and perfected in the age to come.' },
  { id: 'q10', tier: 'Advanced', question: 'According to St. Severus of Antioch, what does "physis" (nature) mean in Cyril\'s Christological formula?', options: ['An abstract philosophical category only', 'Concrete individual reality (hypostasis)', 'The human will of Christ alone', 'A synonym for "person" unrelated to nature'], answer: 1, rationale: 'Severus insisted "physis" here means concrete individual reality, so "one nature" affirms one concrete Christ, not an erasure of His human nature.' },
  { id: 'q11', tier: 'Advanced', question: 'Which Ecumenical Councils are accepted by the Oriental Orthodox Communion?', options: ['Nicaea I only', 'Nicaea I, Constantinople I, Ephesus', 'All seven Ecumenical Councils', 'Ephesus and Chalcedon only'], answer: 1, rationale: 'The Oriental Orthodox accept Nicaea I (325), Constantinople I (381), and Ephesus (431) as authoritative Ecumenical Councils.' },
  { id: 'q12', tier: 'Advanced', question: 'What does the "Protoevangelium" in Genesis 3:15 foreshadow?', options: ['The Flood', 'Christ\'s victory over Satan through the Cross, born of the Virgin', 'The Tower of Babel', 'The call of Abraham'], answer: 1, rationale: 'Genesis 3:15, "He shall bruise your head," is the first veiled promise of the Seed of the woman crushing the serpent — read patristically as prophesying Christ and the Virgin Mary.' }
];

/* ---------------------------------------------------------------------
   NOTES — glossary, fasts, sister churches
--------------------------------------------------------------------- */
const NOTES = [
  {
    id: 'glossary',
    title: 'Theological Glossary',
    icon: '📖',
    entries: [
      { term: 'Theotokos', def: '"God-bearer" — the title of the Virgin Mary, affirming that the child she bore is truly God incarnate, defined at Ephesus (431).' },
      { term: 'Miaphysitism', def: 'The Christology of the Oriental Orthodox Churches: "one incarnate nature of God the Word" (Cyril of Alexandria), affirming full divinity and full humanity united without confusion, change, division, or separation.' },
      { term: 'Hypostasis', def: 'A concrete, individual, personal existence — used to describe the three Persons of the Trinity and the single Person of Christ.' },
      { term: 'Ousia', def: 'Essence or being — the one divine nature shared equally and fully by Father, Son, and Holy Spirit.' },
      { term: 'Theosis', def: 'Deification: the process of becoming, by grace, a partaker of the divine nature, while remaining fully creature — the goal of the Christian spiritual life.' },
      { term: 'Anamnesis', def: 'Liturgical "remembrance" that is also a real re-presentation, especially of Christ\'s sacrifice made present in the Eucharist.' },
      { term: 'Epiclesis', def: 'The invocation of the Holy Spirit in the Divine Liturgy, calling upon the Spirit to change the bread and wine into the Body and Blood of Christ.' },
      { term: 'Agpeya', def: 'The Coptic Orthodox "Book of Hours," containing the seven canonical prayer hours prayed daily.' },
      { term: 'Shehimo', def: 'The Syriac Orthodox "Book of Common Prayer," structurally parallel to the Agpeya, containing the weekly cycle of daily offices.' },
      { term: 'Patristics', def: 'The study of the writings and theology of the early Church Fathers, foundational to Orthodox doctrine and biblical interpretation.' },
      { term: 'Latreia / Douleia', def: 'Latreia is worship due to God alone; douleia (or proskynesis) is veneration/honor given to saints, icons, and holy things.' },
      { term: 'Kenosis', def: 'The "self-emptying" of Christ (Philippians 2:7), who, being God, took the form of a servant without diminishing His divinity.' }
    ]
  },
  {
    id: 'fasts',
    title: 'The Seven Canonical Fasts',
    icon: '🕯',
    entries: [
      { term: 'Great Lent (Holy Fifty-Five Days)', def: 'The greatest fast of the year, preparing for Pascha (Easter): a preparatory week plus the 40-day fast of Lent and Holy Week, roughly 55 days.' },
      { term: 'Fast of the Nativity (Advent)', def: 'A 40-day fast (43 in some traditions) preparing for the Feast of the Nativity of Christ, beginning in late November.' },
      { term: 'Fast of the Apostles', def: 'Beginning the Monday after Pentecost and continuing until the Feast of Saints Peter and Paul (June 29), commemorating the Apostles\' own fasting before their mission.' },
      { term: 'Fast of the Virgin Mary (Dormition Fast)', def: 'A 15-day fast in early-to-mid August, preparing for the Feast of the Assumption/Dormition of the Theotokos.' },
      { term: 'Fast of Nineveh', def: 'A 3-day fast, roughly two to three weeks before Great Lent, commemorating the repentance of Nineveh at the preaching of Jonah.' },
      { term: 'Wednesday and Friday Fasts', def: 'A weekly discipline throughout the year (except in festal periods), recalling respectively the betrayal of Christ and His crucifixion.' },
      { term: 'Fast of the Heraclius / Paramoun days', def: 'Additional single-day or eve fasts kept before major feasts (e.g., Theophany, Nativity), varying by local tradition.' }
    ]
  },
  {
    id: 'sister-churches',
    title: 'The Six Sister Churches',
    icon: '⛪',
    entries: [
      { term: 'Coptic Orthodox Church', def: 'Church of Alexandria, Egypt, founded (by tradition) by St. Mark the Evangelist; led by the Pope of Alexandria and Patriarch of the See of St. Mark.' },
      { term: 'Ethiopian Orthodox Tewahedo Church', def: 'One of the largest Oriental Orthodox Churches, historically linked to the Coptic Church, "Tewahedo" meaning "being made one," expressing its miaphysite Christology; rich in monastic and Old Testament-influenced tradition.' },
      { term: 'Eritrean Orthodox Tewahedo Church', def: 'Established as autocephalous from the Ethiopian Church in 1993, sharing the same Ge\'ez liturgical and theological tradition.' },
      { term: 'Syriac Orthodox Church', def: 'The Church of Antioch, using Syriac (Aramaic) in its liturgy, tracing its lineage through St. Severus of Antioch and the West Syriac tradition; led by the Patriarch of Antioch.' },
      { term: 'Armenian Apostolic Church', def: 'The Church of Armenia, the first nation to adopt Christianity as a state religion (301 AD), founded by tradition by Apostles Bartholomew and Thaddeus, and organized by St. Gregory the Illuminator; led by the Catholicos of All Armenians.' },
      { term: 'Malankara (Indian) Orthodox Syrian Church', def: 'The Church of the St. Thomas Christians of Kerala, India, tracing its founding to the Apostle Thomas and its Christological lineage to the West Syriac tradition; led by the Catholicos of the East.' }
    ]
  }
];

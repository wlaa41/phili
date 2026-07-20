export const LESSON_STAGES_BILINGUAL = {
  en: [
    {
      id: 1,
      title: "Stage 1: The Spark & Old World Order",
      subtitle: "Breaking 2,000 Years of Ancient Greek Doctrines",
      badge: "Spark Igniter ⚡",
      color: "from-amber-500 to-orange-600",
      description: "Discover why European thinkers suddenly questioned Aristotle, Ptolemy, and the 4-element theory after two millennia of silence.",
      slides: [
        {
          id: "s1-1",
          title: "GE403: Scientific Revolution Overview",
          category: "Introduction",
          content: "The Scientific Revolution marked a monumental shift in scientific methodologies and approaches. It completely replaced the long-standing Greek view of nature and the universe that had dominated for almost two millennia (2,000 years)!",
          bulletPoints: [
            "Timeframe: Late Renaissance (16th Century) through late 18th Century.",
            "Traditional Starting Point: 1543 with Nicolaus Copernicus' landmark publication.",
            "Core Theme: Truth shifted from ancient authority to empirical evidence."
          ],
          hoverFacts: [
            { keyword: "two millennia", fact: "For nearly 2,000 years, questioning Aristotle in a university could get you ridiculed or fired!" },
            { keyword: "1543", fact: "1543 was a mega-year: Copernicus put the Sun at the center AND Vesalius mapped human anatomy!" }
          ],
          mnemonic: {
            title: "S.H.I.F.T.",
            acronym: "Systematic Hypotheses Replacing Inferior Fundamental Traditions",
            meaning: "Science shifted from unproven ancient tradition to tested hypotheses!"
          },
          joke: "Why didn't ancient scientists test their theories? Because Aristotle said so!"
        },
        {
          id: "s1-2",
          title: "The Old World Order vs. The New Logic",
          category: "Timeline & Background",
          content: "Before the 16th century, human understanding of nature rested almost entirely on ancient Greek/Roman texts (Aristotle, Ptolemy) or biblical teachings.",
          bulletPoints: [
            "Geocentric Theory: The belief that Earth sits motionlessly at the center of the universe.",
            "Four-Element Theory: Matter was believed to be made of Earth, Air, Fire, and Water.",
            "The Revolution: Replaced blind faith in ancient authority with mathematical logic."
          ],
          hoverFacts: [
            { keyword: "Ptolemy", fact: "Ptolemy had to invent over 80 crazy mathematical loops called 'epicycles' to explain backwards planetary motion!" }
          ],
          mnemonic: {
            title: "G.E.O. vs H.E.L.I.O.",
            acronym: "Earth Centered vs Sun Centered",
            meaning: "GEO = Ground Earth Only; HELIO = Sun at Center!"
          },
          joke: "Earth at the center of the universe? Talk about a planet with an ego problem!"
        },
        {
          id: "s1-3",
          title: "Four Main Reasons It Happened",
          category: "Catalysts",
          content: "Four crucial factors converged in Europe to spark the Scientific Revolution:",
          bulletPoints: [
            "1. Math Collaboration: Scientists collaborated directly with mathematicians.",
            "2. Limits Recognized: Scholars realized limitations of old experimental methods.",
            "3. Gutenberg Press: Knowledge was rapidly printed without Church censorship.",
            "4. Academic Societies: Creation of groups like the British Royal Society."
          ],
          hoverFacts: [
            { keyword: "British Royal Society", fact: "Their official motto 'Nullius in verba' translates to 'Take nobody's word for it'!" }
          ],
          mnemonic: {
            title: "M.E.P.S.",
            acronym: "Maths, Experimental-limits, Printing-press, Societies",
            meaning: "The 4 engines that sparked the Revolution!"
          },
          joke: "What was Gutenberg's favorite key on the keyboard? Print Screen!"
        }
      ],
      checkpoint: {
        title: "Stage 1 Door Checkpoint",
        passingScore: 80,
        questions: [
          {
            id: "q1-1",
            type: "mcq",
            question: "How long did the ancient Greek view of the universe dominate western scientific thought before the Scientific Revolution?",
            options: ["Around 200 years", "Almost two millennia (2,000 years)", "50 years", "5,000 years"],
            correct: 1,
            explanation: "Correct! The Greek worldview held sway for nearly 2,000 years until the 16th century."
          },
          {
            id: "q1-2",
            type: "mcq",
            question: "Which invention accelerated the spread of scientific knowledge during the Revolution?",
            options: ["The Steam Engine", "Gutenberg's Printing Press", "The Telegraph", "The Mechanical Clock"],
            correct: 1,
            explanation: "Spot on! The printing press allowed ideas to spread faster than ever before."
          },
          {
            id: "q1-3",
            type: "identification",
            question: "Name the ancient theory which posited that Earth was at the exact center of the universe.",
            correctAnswer: "Geocentric Theory",
            acceptableAnswers: ["geocentric", "geocentric theory", "geocentrism"],
            hint: "Starts with 'Geo' (meaning Earth) and ends with 'centric'."
          },
          {
            id: "q1-4",
            type: "identification",
            question: "What was the official motto of the British Royal Society translated in English?",
            correctAnswer: "Take nobody's word for it",
            acceptableAnswers: ["take no one's word for it", "take nobodys word for it", "nullius in verba"],
            hint: "It emphasizes trusting empirical evidence rather than authority figures."
          },
          {
            id: "q1-5",
            type: "essay",
            question: "Explain two reasons why the Scientific Revolution broke away from ancient Greek traditions.",
            keyPoints: ["empirical evidence", "printing press", "limitations of old methods", "mathematicians"],
            sampleAnswer: "The Revolution broke away because scholars realized ancient methods were flawed. The Gutenberg printing press and math collaboration allowed empirical observations to be rapidly shared."
          }
        ]
      }
    },
    {
      id: 2,
      title: "Stage 2: Heavens Redefined",
      subtitle: "Copernicus, Bruno, Kepler & Brahe",
      badge: "Cosmic Disruptor 🌌",
      color: "from-indigo-600 to-purple-700",
      description: "Dethrone the Earth! Explore how astronomers placed the Sun at the center and proved planets orbit in ellipses.",
      slides: [
        {
          id: "s2-1",
          title: "Nicolaus Copernicus: Heliocentric Master",
          category: "Astronomy",
          content: "Nicolaus Copernicus (1473–1543) was a Polish astronomer and mathematician who shattered the ancient geocentric worldview.",
          bulletPoints: [
            "Heliocentric Model: Positioned the Sun at the center of the universe.",
            "Earth's Rotation: Proposed that Earth rotates daily on its axis.",
            "Publication: Authored De Revolutionibus Orbium Coelestium (1543).",
            "Church Backlash: Labeled heretical by the Catholic Church in 1616."
          ],
          hoverFacts: [
            { keyword: "Polish astronomer", fact: "Copernicus was also a doctor, lawyer, economist, and military strategist!" }
          ],
          mnemonic: {
            title: "C.O.P.E.R.N.I.C.U.S.",
            acronym: "Center Of Planetary Ellipses Replaced Next In Cosmic Universe Sun",
            meaning: "Remember: Sun is the Center!"
          },
          joke: "Copernicus told Earth: 'Sorry babe, the Sun is the center of attention!'"
        },
        {
          id: "s2-2",
          title: "Giordano Bruno: Infinite Worlds",
          category: "Cosmology",
          content: "Giordano Bruno (1548–1600) was an Italian philosopher who advocated that the universe is infinitely large with NO center.",
          bulletPoints: [
            "Infinite Universe: Published works advocating endless space in 1584.",
            "Exoplanets: Posited that stars are distant suns surrounded by their own planets!",
            "Extraterrestrial Life: Suggested alien life could exist on other worlds.",
            "Martyrdom: Refused to recant and was burned at the stake in Rome in 1600."
          ],
          hoverFacts: [
            { keyword: "exoplanets", fact: "Bruno predicted exoplanets in 1584, but humans didn't confirm one until 1992!" }
          ],
          mnemonic: {
            title: "B.R.U.N.O.",
            acronym: "Boundless Real Universe Needs No Origin-center",
            meaning: "Bruno = Infinite universe with endless suns!"
          },
          joke: "Bruno was 400 years ahead of Sci-Fi movies!"
        },
        {
          id: "s2-3",
          title: "Johannes Kepler & Tycho Brahe",
          category: "Planetary Physics",
          content: "Tycho Brahe collected observational data, which Kepler used to formulate the 3 Laws of Planetary Motion:",
          bulletPoints: [
            "1st Law (Ellipses): Planets orbit the Sun in ellipses, not perfect circles!",
            "2nd Law (Velocity): A planet's speed increases closer to the Sun.",
            "3rd Law (Harmonic Law): Mathematically linked orbital period to distance."
          ],
          hoverFacts: [
            { keyword: "Tycho Brahe", fact: "Tycho lost his nose in a duel and wore a replacement fake nose made of brass!" }
          ],
          mnemonic: {
            title: "K.E.P.L.E.R.",
            acronym: "Know Ellipses Planet Law Equals Revolution",
            meaning: "1st = Ellipse, 2nd = Speed near sun, 3rd = Math link!"
          },
          joke: "Why are planetary orbits eccentric? Because they love ovals!"
        }
      ],
      interactiveType: "orbit",
      checkpoint: {
        title: "Stage 2 Door Checkpoint",
        passingScore: 80,
        questions: [
          {
            id: "q2-1",
            type: "mcq",
            question: "What shape did Johannes Kepler discover planetary orbits actually take around the Sun?",
            options: ["Perfect Circles", "Ellipses (Ovals)", "Hexagons", "Spiral Loops"],
            correct: 1,
            explanation: "Kepler's 1st Law proved orbits are ellipses."
          },
          {
            id: "q2-2",
            type: "mcq",
            question: "What visionary idea did Giordano Bruno propose in 1584?",
            options: ["The telephone", "That stars are distant suns orbited by exoplanets", "Gravity acceleration", "Blood circulation"],
            correct: 1,
            explanation: "Bruno posited cosmic pluralism and infinite stars with exoplanets."
          },
          {
            id: "q2-3",
            type: "identification",
            question: "Name the Polish astronomer who authored 'De Revolutionibus Orbium Coelestium' in 1543.",
            correctAnswer: "Nicolaus Copernicus",
            acceptableAnswers: ["copernicus", "nicolaus copernicus"],
            hint: "His name starts with 'N' and put the Sun at the center."
          },
          {
            id: "q2-4",
            type: "identification",
            question: "Which eccentric astronomer lost his nose in a duel and collected Kepler's data?",
            correctAnswer: "Tycho Brahe",
            acceptableAnswers: ["tycho brahe", "brahe", "tycho"],
            hint: "Famous for his replacement brass nose!"
          },
          {
            id: "q2-5",
            type: "essay",
            question: "Compare the Geocentric model of Ptolemy with the Heliocentric model of Copernicus.",
            keyPoints: ["earth center", "sun center", "epicycles", "axis rotation"],
            sampleAnswer: "Geocentric placed Earth at the center with complex epicycles. Heliocentric placed the Sun at the center, explaining daily movements via Earth's rotation."
          }
        ]
      }
    },
    {
      id: 3,
      title: "Stage 3: Telescope & Tools of Power",
      subtitle: "Galileo, Viète & Napier",
      badge: "Telescope Master 🔭",
      color: "from-cyan-600 to-blue-700",
      description: "Peer into Jupiter's moons, decode unknown algebra with vowels, and simplify giant calculations with logarithms!",
      slides: [
        {
          id: "s3-1",
          title: "Galileo Galilei: The Starry Messenger",
          category: "Physics & Astronomy",
          content: "Galileo Galilei (1564–1642) was an Italian polymath who transformed observational astronomy.",
          bulletPoints: [
            "1591 (Gravity & Motion): Challenged Aristotle's falling body theories.",
            "1609 (Telescope): Enhanced the spyglass to observe Moon craters & Venus phases.",
            "1610 (Jupiter's Moons): Discovered 4 moons orbiting Jupiter, proving not everything orbits Earth!",
            "House Arrest: Sentenced to lifelong house arrest by the Inquisition."
          ],
          hoverFacts: [
            { keyword: "4 moons orbiting Jupiter", fact: "These are called the Galilean Moons: Io, Europa, Ganymede, and Callisto!" }
          ],
          mnemonic: {
            title: "G.A.L.I.L.E.O.",
            acronym: "Gravity Accelerated Lenses Inspect Moons Lunar Earth Orbit",
            meaning: "Gravity experiments + Telescope lunar observations!"
          },
          joke: "Galileo to the Church: 'I didn't mean to rock your world, I just looked through a tube!'"
        },
        {
          id: "s3-2",
          title: "François Viète: Father of Modern Algebra",
          category: "Mathematics",
          content: "François Viète (1540–1603) introduced systematic algebraic notation.",
          bulletPoints: [
            "Vowels vs. Consonants: Introduced vowels (A, E, I, O, U) for unknown variables!",
            "Consonants: Used consonants (B, C, D) for known constants.",
            "Impact: Paved the way for René Descartes and Isaac Newton."
          ],
          hoverFacts: [
            { keyword: "unknown variables", fact: "Before Viète, algebra problems were written as long wordy paragraphs!" }
          ],
          mnemonic: {
            title: "V.I.E.T.E.",
            acronym: "Vowel Is Expression Unknown To Everyone",
            meaning: "Vowel = Unknown, Consonant = Known!"
          },
          joke: "Why were algebra problems so long before Viète? Because they hadn't bought vowels yet!"
        },
        {
          id: "s3-3",
          title: "John Napier: Logarithms & Decimal Point",
          category: "Mathematics",
          content: "John Napier (1550–1617) spent 20 years developing mathematical shortcuts.",
          bulletPoints: [
            "Logarithms: Conceived logarithms to convert complex multiplication into simple addition!",
            "Decimal Point: Popularized using a decimal point to separate fractions.",
            "Inventions: Created Napier's Bones calculator and introduced salt as fertilizer."
          ],
          hoverFacts: [
            { keyword: "Logarithms", fact: "Laplace said logarithms 'doubled the life of astronomers'!" }
          ],
          mnemonic: {
            title: "N.A.P.I.E.R.",
            acronym: "Numbers Add Power In Easy Rules",
            meaning: "Logarithms turn multiplication into addition!"
          },
          joke: "How do logarithms sleep? They log off!"
        }
      ],
      interactiveType: "algebra",
      checkpoint: {
        title: "Stage 3 Door Checkpoint",
        passingScore: 80,
        questions: [
          {
            id: "q3-1",
            type: "mcq",
            question: "In François Viète's algebraic notation system, what did vowels represent?",
            options: ["Known constants", "Unknown quantities", "Geometric angles", "Prime numbers"],
            correct: 1,
            explanation: "Viète used vowels for unknown quantities."
          },
          {
            id: "q3-2",
            type: "mcq",
            question: "Which astronomer observed Jupiter's four largest moons in 1610 using an enhanced telescope?",
            options: ["John Napier", "Galileo Galilei", "Evangelista Torricelli", "Francis Bacon"],
            correct: 1,
            explanation: "Galileo discovered the Galilean moons of Jupiter."
          },
          {
            id: "q3-3",
            type: "identification",
            question: "What mathematical innovation did John Napier spend 20 years conceiving to simplify calculations?",
            correctAnswer: "Logarithms",
            acceptableAnswers: ["logarithms", "logarithm", "logs"],
            hint: "It converts tedious multiplication into simple addition."
          },
          {
            id: "q3-4",
            type: "identification",
            question: "Name the landmark 1610 astronomical book written by Galileo Galilei.",
            correctAnswer: "The Starry Messenger",
            acceptableAnswers: ["the starry messenger", "starry messenger", "sidereus nuncius"],
            hint: "English title has 'Starry' and 'Messenger'."
          },
          {
            id: "q3-5",
            type: "essay",
            question: "Explain how John Napier's logarithms and decimal point affected scientific research.",
            keyPoints: ["logarithms", "decimal point", "astronomy", "simplifying calculations"],
            sampleAnswer: "Napier's logarithms turned multiplication into addition, while the decimal point allowed precise fractional math, saving scientists years of tedious calculations."
          }
        ]
      }
    },
    {
      id: 4,
      title: "Stage 4: Method, Pressure & Blood",
      subtitle: "Bacon, Torricelli, Vesalius & Harvey",
      badge: "Empiricism Master 🧪",
      color: "from-emerald-600 to-teal-700",
      description: "Master inductive reasoning, measure atmospheric vacuums with mercury, and discover the heart's mechanical pump!",
      slides: [
        {
          id: "s4-1",
          title: "Francis Bacon: Father of Empiricism",
          category: "Scientific Method",
          content: "Francis Bacon (1561–1626) reshaped how humans acquire scientific truth.",
          bulletPoints: [
            "Father of Empiricism: Argued knowledge comes ONLY from sensory experience.",
            "Novum Organum (1620): Introduced inductive reasoning and criticized Aristotle.",
            "Scientific Method: Cycle of Observation ➔ Hypothesis ➔ Experiment ➔ Conclusion."
          ],
          hoverFacts: [
            { keyword: "Father of Empiricism", fact: "Bacon died from pneumonia while stuffing a chicken with snow to test refrigeration!" }
          ],
          mnemonic: {
            title: "B.A.C.O.N.",
            acronym: "Build Answers Carefully Observation Needed",
            meaning: "Observation first, then experiment!"
          },
          joke: "Why is Francis Bacon the favorite scientist of breakfast lovers? He brings empirical facts!"
        },
        {
          id: "s4-2",
          title: "Evangelista Torricelli: Vacuum & Barometer",
          category: "Physics",
          content: "Evangelista Torricelli (1608–1647) proved air has weight and created a vacuum.",
          bulletPoints: [
            "Barometer Experiment: Inverted a 1.2m glass tube filled with mercury into a dish.",
            "Discovery of Vacuum: Mercury dropped to ~760mm, leaving a vacuum space at top!",
            "Unit of Pressure: The torr unit is named in his honor."
          ],
          hoverFacts: [
            { keyword: "mercury", fact: "Torricelli used mercury because it is 13.6 times denser than water!" }
          ],
          mnemonic: {
            title: "T.O.R.R.",
            acronym: "Tube Of Risen Red-mercury",
            meaning: "Torricelli = Tube of Mercury Barometer!"
          },
          joke: "Torricelli's vacuum experiment was so atmospheric, it took the pressure off!"
        },
        {
          id: "s4-3",
          title: "Andres Vesalius & William Harvey",
          category: "Anatomy & Physiology",
          content: "Andres Vesalius and William Harvey revolutionized modern medicine through direct human dissection.",
          bulletPoints: [
            "Vesalius (1543): Published On the Fabric of the Human Body, replacing Galen's ancient animal anatomy.",
            "Harvey (1628): Discovered that the heart acts as a mechanical pump driving continuous blood circulation!",
            "Debunking Myths: Harvey proved blood doesn't 'ebb and flow' or evaporate."
          ],
          hoverFacts: [
            { keyword: "mechanical pump", fact: "Harvey calculated the heart pumps more blood in an hour than the body's total weight!" }
          ],
          mnemonic: {
            title: "H.A.R.V.E.Y.",
            acronym: "Heart Always Recirculates Veins Everywhere You-go",
            meaning: "Vesalius = Fabric/Structure; Harvey = Flow/Pump!"
          },
          joke: "William Harvey really poured his heart out into his work!"
        }
      ],
      interactiveType: "barometer",
      checkpoint: {
        title: "Stage 4 Door Checkpoint",
        passingScore: 80,
        questions: [
          {
            id: "q4-1",
            type: "mcq",
            question: "Who is known as the 'Father of Empiricism' for introducing the inductive scientific method?",
            options: ["Evangelista Torricelli", "Francis Bacon", "William Harvey", "Andres Vesalius"],
            correct: 1,
            explanation: "Francis Bacon championed empirical observation."
          },
          {
            id: "q4-2",
            type: "mcq",
            question: "What major discovery did William Harvey make regarding the human body?",
            options: ["Blood manufactured in liver", "The heart acts as a mechanical pump driving blood circulation", "Air bubbles in arteries", "Veins have no valves"],
            correct: 1,
            explanation: "Harvey proved the heart is a continuous mechanical pump."
          },
          {
            id: "q4-3",
            type: "identification",
            question: "What unit of pressure was named in honor of the scientist who invented the mercury barometer?",
            correctAnswer: "Torr",
            acceptableAnswers: ["torr", "torricelli"],
            hint: "4-letter unit of pressure equivalent to 1 mmHg."
          },
          {
            id: "q4-4",
            type: "identification",
            question: "Name the Belgian anatomist who published 'On the Fabric of the Human Body' in 1543.",
            correctAnswer: "Andres Vesalius",
            acceptableAnswers: ["andres vesalius", "vesalius"],
            hint: "First name Andres, published landmark human anatomy dissections."
          },
          {
            id: "q4-5",
            type: "essay",
            question: "Describe Torricelli's barometer experiment and what it proved.",
            keyPoints: ["mercury", "glass tube", "vacuum", "atmospheric pressure"],
            sampleAnswer: "Torricelli inverted a mercury-filled 1.2m tube into a dish. The mercury dropped to ~760mm leaving a vacuum space at top, proving air has weight and vacuums exist."
          }
        ]
      }
    },
    {
      id: 5,
      title: "Stage 5: The Grand Synthesis",
      subtitle: "Final Mastery Boss Challenge",
      badge: "Revolution Scholar 🎓",
      color: "from-rose-600 to-amber-600",
      description: "The ultimate trial! Demonstrate your total mastery across all figures, equations, discoveries, and societal impacts.",
      slides: [
        {
          id: "s5-1",
          title: "The Legacy of the Scientific Revolution",
          category: "Summary & Synthesis",
          content: "The Scientific Revolution completely reshaped human civilization across science, philosophy, religion, and society.",
          bulletPoints: [
            "Methodological Shift: Replaced 2,000 years of dogmatic Aristotelian speculation with empirical experimentation.",
            "Key Pioneers: Copernicus, Vesalius, Bruno, Viète, Galileo, Napier, Kepler, Brahe, Bacon, Torricelli, & Harvey.",
            "Societal Impact: Challenged religious doctrines and established the foundation of the modern world."
          ],
          hoverFacts: [
            { keyword: "empirical experimentation", fact: "This revolution laid the direct groundwork for Isaac Newton's Universal Gravitation in 1687!" }
          ],
          mnemonic: {
            title: "R.E.V.O.L.U.T.I.O.N.",
            acronym: "Reason Elevates Verification Over Legendary Unproven Traditions In Our Nature",
            meaning: "Verification & Reason triumphed over unproven traditions!"
          },
          joke: "What did the Scientific Revolution say to ancient dogma? 'We'll take it from here!'"
        }
      ],
      checkpoint: {
        title: "Final Boss Mastery Exam",
        passingScore: 85,
        questions: [
          {
            id: "q5-1",
            type: "mcq",
            question: "Which landmark event in 1543 is traditionally considered the start of the Scientific Revolution?",
            options: ["Galileo's telescope", "Copernicus publishing 'De Revolutionibus' & Vesalius publishing 'On the Fabric of the Human Body'", "Bacon writing 'Novum Organum'", "Torricelli's barometer"],
            correct: 1,
            explanation: "1543 was the pivotal dual-publication year for astronomy and anatomy."
          },
          {
            id: "q5-2",
            type: "mcq",
            question: "Kepler's Second Law of Planetary Motion states that a planet's velocity:",
            options: ["Remains constant", "Increases as it gets closer to the Sun", "Decreases near the Sun", "Stops at perihelion"],
            correct: 1,
            explanation: "Planets sweep equal areas in equal times, speeding up near the Sun."
          },
          {
            id: "q5-3",
            type: "identification",
            question: "Who posited cosmic pluralism and advocated that stars are distant suns orbited by exoplanets?",
            correctAnswer: "Giordano Bruno",
            acceptableAnswers: ["giordano bruno", "bruno"],
            hint: "Italian philosopher martyred in Rome in 1600."
          },
          {
            id: "q5-4",
            type: "identification",
            question: "What scientific methodology was outlined by Francis Bacon in his 1620 work 'Novum Organum'?",
            correctAnswer: "Inductive Scientific Method",
            acceptableAnswers: ["scientific method", "inductive reasoning", "empiricism"],
            hint: "Cycle of observation, hypothesis, experiment, and conclusion."
          },
          {
            id: "q5-5",
            type: "essay",
            question: "Synthesize how the Scientific Revolution transformed European society, philosophy, and religion.",
            keyPoints: ["empiricism", "church doctrines", "heliocentrism", "scientific method"],
            sampleAnswer: "The Revolution shifted truth from religious dogma to empirical evidence. Heliocentrism and dissections challenged Church doctrines, while Bacon's scientific method established a standard of evidence for modern science."
          }
        ]
      }
    }
  ],

  // TAGALOG / TAGLISH TRANSLATION DATA
  tl: [
    {
      id: 1,
      title: "Stage 1: Ang Pagsiklab at Lumang Paniniwala",
      subtitle: "Pagsira sa 2,000 Taong Aral ng Sinaunang Griyego",
      badge: "Spark Igniter ⚡",
      color: "from-amber-500 to-orange-600",
      description: "Tuklasin kung bakit biglang kinwestyon ng mga Europeong pag-iisip sina Aristotle, Ptolemy, at ang 4-element theory matapos ang dalawang milenyo ng katahimikan.",
      slides: [
        {
          id: "s1-1",
          title: "GE403: Pangkalahatang Tanaw sa Rebolusyong Siyentipiko",
          category: "Panimula",
          content: "Ang **Rebolusyong Siyentipiko** ay nagmarka ng isang napakalaking pagbabago sa mga pamamaraan at diskarte sa agham. Pinagpalit nito ang halos **dalawang libong taong (2,000 years)** paniniwala ng mga Griyego tungkol sa kalikasan at sansinukob!",
          bulletPoints: [
            "Panahon: Huling Renaissance (ika-16 na Siglo) hanggang huling bahagi ng ika-18 na Siglo.",
            "Tradisyunal na Simula: **1543** noong inilathala ni Nicolaus Copernicus ang kanyang aklat sa astronomiya.",
            "Pangunahing Tema: Ang katotohanan ay lumipat mula sa lumang awtoridad patungo sa **ebidensya at eksperimento**."
          ],
          hoverFacts: [
            { keyword: "dalawang libong taong", fact: "Sa loob ng 2,000 taon, kapag kinwestyon mo si Aristotle sa unibersidad, maaari kang matanggal sa trabaho o pagtawanan!" },
            { keyword: "1543", fact: "Ang 1543 ay dakilang taon: inilagay ni Copernicus ang Araw sa gitna AT inilarawan ni Vesalius ang katawan ng tao!" }
          ],
          mnemonic: {
            title: "S.H.I.F.T.",
            acronym: "Systematic Hypotheses Replacing Inferior Fundamental Traditions",
            meaning: "Tandaan: Ang agham ay lumipat mula sa lumang tradisyon patungo sa nasusubukang teorya!"
          },
          joke: "Bakit hindi sinusubukan ng mga sinaunang siyentipiko ang kanilang teorya? Kasi sinabi ni Aristotle, at bawal makipag-away sa patay na Griyego!"
        },
        {
          id: "s1-2",
          title: "Ang Lumang Paniniwala laban sa Bagong Lohika",
          category: "Kasaysayan at Background",
          content: "Bago ang ika-16 na siglo, ang pag-unawa ng tao sa kalikasan ay nakasalalay lamang sa mga lumang sulatin nina **Aristotle** at **Ptolemy** o sa mga turo ng Simbahan.",
          bulletPoints: [
            "**Geocentric Theory**: Ang paniniwalang ang Daigdig (Earth) ay hindi gumagalaw at nasa gitna ng buong sansinukob.",
            "**Four-Element Theory**: Ang paniniwalang ang lahat ng bagay ay binubuo ng Lupa, Hangin, Apoy, at Tubig.",
            "**Ang Rebolusyon**: Pinalitan ang bulag na pagsunod ng lohika at matematika."
          ],
          hoverFacts: [
            { keyword: "Ptolemy", fact: "Kailangan pang mag-imbento ni Ptolemy ng higit 80 nakakalilitong bilog (epicycles) para lang maipaliwanag kung bakit parang paatras ang galaw ng mga planeta!" }
          ],
          mnemonic: {
            title: "G.E.O. vs H.E.L.I.O.",
            acronym: "Earth Centered vs Sun Centered",
            meaning: "GEO = Gitna ang Earth; HELIO = Araw sa Gitna!"
          },
          joke: "Earth daw ang gitna ng universe? Ang kapal naman ng mukha ng planeta natin!"
        },
        {
          id: "s1-3",
          title: "Apat na Pangunahing Dahilan Kung Bakit Ito Nangyari",
          category: "Mga Dahilan",
          content: "Apat na mahahalagang salik ang nagsama-sama sa Europa upang magsimula ang Rebolusyon:",
          bulletPoints: [
            "**1. Pagtutulungan sa Math**: Nagsimulang makipagtulungan ang mga siyentipiko sa mga dalubhasa sa matematika.",
            "**2. Limitasyon ng Lumang Paraan**: Narealize ng mga eksperto na kulang at mali ang lumang paraan ng eksperimento.",
            "**3. Printing Press ni Gutenberg**: Mabilis na naipalimbag at naibahagi ang kaalaman nang walang censorship.",
            "**4. Akademikong Samahan**: Pagtatag ng mga samahan tulad ng **British Royal Society** para sa pagbabahagi ng natuklasan."
          ],
          hoverFacts: [
            { keyword: "British Royal Society", fact: "Ang kanilang motto na 'Nullius in verba' ay nangangahulugang 'Huwag maniniwala sa salita lang ng iba'!" }
          ],
          mnemonic: {
            title: "M.E.P.S.",
            acronym: "Maths, Experimental-limits, Printing-press, Societies",
            meaning: "Ang 4 na makina na nagpasimula ng Rebolusyon!"
          },
          joke: "Ano ang paboritong button ni Gutenberg sa keyboard? Print Screen!"
        }
      ],
      checkpoint: {
        title: "Stage 1 Door Checkpoint Quiz",
        passingScore: 80,
        questions: [
          {
            id: "q1-1",
            type: "mcq",
            question: "Gaano katagal naghari ang paniniwala ng mga Griyego sa sansinukob bago ang Rebolusyong Siyentipiko?",
            options: ["Halos 200 taon", "Halos dalawang milenyo (2,000 taon)", "50 taon", "5,000 taon"],
            correct: 1,
            explanation: "Tama! Ang pananaw ng mga Griyego ay naghari sa loob ng halos 2,000 taon."
          },
          {
            id: "q1-2",
            type: "mcq",
            question: "Anong imbensyon ang nagpabilis sa pagpapakalat ng siyentipikong kaalaman?",
            options: ["Steam Engine", "Printing Press ni Gutenberg", "Telegraph", "Orasan"],
            correct: 1,
            explanation: "Tumpak! Ang printing press ang nagbigay-daan upang mabilis maipalimbag ang mga bagong ideya."
          },
          {
            id: "q1-3",
            type: "identification",
            question: "Ano ang tawag sa lumang teorya na nagsasabing ang Daigdig (Earth) ang nasa gitna ng sansinukob?",
            correctAnswer: "Geocentric Theory",
            acceptableAnswers: ["geocentric", "geocentric theory", "geocentrism"],
            hint: "Nagsisimula sa 'Geo' (nangangahulugang Lupa/Earth)."
          },
          {
            id: "q1-4",
            type: "identification",
            question: "Ano ang ibig sabihin ng motto ng British Royal Society na 'Nullius in verba' sa Tagalog/Ingles?",
            correctAnswer: "Take nobody's word for it",
            acceptableAnswers: ["take no one's word for it", "take nobodys word for it", "nullius in verba", "huwag maniniwala sa salita lang"],
            hint: "Nagbibigay-diin sa pagtitiwala sa ebidensya kaysa sa salita ng awtoridad."
          },
          {
            id: "q1-5",
            type: "essay",
            question: "Magbigay ng dalawang dahilan kung bakit kumawala ang Rebolusyong Siyentipiko sa mga lumang tradisyon ng Griyego.",
            keyPoints: ["ebidensya", "printing press", "limitasyon", "matematika"],
            sampleAnswer: "Kumawala ang rebolusyon dahil narealize ng mga dalubhasa na mali ang lumang paraan. Nakatulong din ang printing press at matematika upang mabilis maibahagi ang mga bagong ebidensya."
          }
        ]
      }
    },
    {
      id: 2,
      title: "Stage 2: Ang Kalangitan sa Bagong Pananaw",
      subtitle: "Copernicus, Bruno, Kepler at Brahe",
      badge: "Cosmic Disruptor 🌌",
      color: "from-indigo-600 to-purple-700",
      description: "Alisin ang Earth sa gitna! Tuklasin kung paano inilagay ng mga astronomo ang Araw sa gitna at napatunayang oval (ellipse) ang galaw ng mga planeta.",
      slides: [
        {
          id: "s2-1",
          title: "Nicolaus Copernicus: Ama ng Heliocentric Model",
          category: "Astronomiya",
          content: "Si **Nicolaus Copernicus** (1473–1543) ay isang Polish na astronomo at matematiko na sumira sa lumang paniniwalang geocentric.",
          bulletPoints: [
            "**Heliocentric Model**: Inilagay ang **Araw sa gitna** ng sansinukob habang pumapalibot ang Earth at ibang planeta.",
            "**Pag-ikot ng Earth**: Sinabing umiikot ang Earth sa sarili nitong aksis araw-araw.",
            "**Aklat**: Isinulat ang *De Revolutionibus Orbium Coelestium* (1543).",
            "**Reaksyon ng Simbahan**: Idineklara itong labag sa aral ng Simbahan noong 1616."
          ],
          hoverFacts: [
            { keyword: "Polish na astronomo", fact: "Si Copernicus ay doktor, abogado, ekonomista, at pinuno din ng militar!" }
          ],
          mnemonic: {
            title: "C.O.P.E.R.N.I.C.U.S.",
            acronym: "Center Of Planetary Ellipses Replaced Next In Cosmic Universe Sun",
            meaning: "Tandaan: Ang Araw ang nasa Gitna!"
          },
          joke: "Sinabi ni Copernicus sa Earth: 'Pasensya ka na, hindi sa'yo umiikot ang mundo. Ang Araw ang bida!'"
        },
        {
          id: "s2-2",
          title: "Giordano Bruno: Walang Hanggang Daigdig",
          category: "Kosmolohiya",
          content: "Si **Giordano Bruno** (1548–1600) ay isang Italyanong pilosopo na nagsabing WALANG GITNA ang sansinukob at ito ay walang hanggan.",
          bulletPoints: [
            "**Infinite Universe**: Inilathala noong 1584 na ang kalawakan ay walang katapusan.",
            "**Exoplanets**: Sinabing ang mga bituin ay mga malalayo ring Araw na may sariling mga planeta!",
            "**Buhay sa Ibang Planeta**: Nagsabing maaaring may buhay din sa ibang daigdig.",
            "**Sakripisyo**: Hindi itinatu ang kanyang paniniwala kaya ipinapatay sa Roma noong 1600."
          ],
          hoverFacts: [
            { keyword: "exoplanets", fact: "Hulaan ni Bruno ang exoplanets noong 1584, ngunit napatunayan lang ito ng mga siyentipiko noong 1992—pagkalipas ng 408 taon!" }
          ],
          mnemonic: {
            title: "B.R.U.N.O.",
            acronym: "Boundless Real Universe Needs No Origin-center",
            meaning: "Bruno = Walang hanggang sansinukob na may maraming araw!"
          },
          joke: "Nauna pa si Bruno ng 400 taon sa mga Sci-Fi na pelikula!"
        },
        {
          id: "s2-3",
          title: "Johannes Kepler at Tycho Brahe",
          category: "Pisika ng Planeta",
          content: "Mangongolekta si Tycho Brahe ng malalalim na datos, na ginamit ni Kepler upang buuin ang 3 Batas ng Galaw ng Planeta:",
          bulletPoints: [
            "**Unang Batas (Ellipses)**: Ang orbit ng planeta ay hugis **ellipse (oval)**, hindi perpektong bilog!",
            "**Ikalawang Batas (Bilis)**: Bumibilis ang planeta kapag mas malapit sa Araw.",
            "**Ikatlong Batas**: Ikinonekta sa matematika ang oras ng pag-ikot sa distansya sa Araw."
          ],
          hoverFacts: [
            { keyword: "Tycho Brahe", fact: "Nawalan ng ilong si Tycho sa isang duwelo dahil sa argumento sa math, kaya nagsuot siya ng ilong na gawa sa tanso!" }
          ],
          mnemonic: {
            title: "K.E.P.L.E.R.",
            acronym: "Know Ellipses Planet Law Equals Revolution",
            meaning: "Unang Batas = Ellipse; Ikalawa = Bilis malapit sa Araw!"
          },
          joke: "Bakit ayaw ng mga planeta sa bilog? Kasi mas gusto nila ng oval!"
        }
      ],
      interactiveType: "orbit",
      checkpoint: {
        title: "Stage 2 Door Checkpoint Quiz",
        passingScore: 80,
        questions: [
          {
            id: "q2-1",
            type: "mcq",
            question: "Ano ang totoong hugis ng orbit ng mga planeta sa paligid ng Araw ayon kay Johannes Kepler?",
            options: ["Perpektong Bilog", "Ellipse (Oval)", "Hexagon", "Spiral"],
            correct: 1,
            explanation: "Tumpak! Napatunayan ng Unang Batas ni Kepler na oval o ellipse ang orbit."
          },
          {
            id: "q2-2",
            type: "mcq",
            question: "Anong kamangha-manghang ideya ang sinabi ni Giordano Bruno noong 1584?",
            options: ["Imbensyon ng telepono", "Ang mga bituin ay malalayong Araw na may sariling planeta (exoplanets)", "Gravity 9.8 m/s²", "Sirkulasyon ng dugo"],
            correct: 1,
            explanation: "Magaling! Sinabi ni Bruno na walang hanggan ang kalawakan at may mga exoplanets."
          },
          {
            id: "q2-3",
            type: "identification",
            question: "Sino ang Polish na astronomo na sumulat ng 'De Revolutionibus Orbium Coelestium' noong 1543?",
            correctAnswer: "Nicolaus Copernicus",
            acceptableAnswers: ["copernicus", "nicolaus copernicus"],
            hint: "Nagsisimula sa 'N' at inilagay ang Araw sa gitna."
          },
          {
            id: "q2-4",
            type: "identification",
            question: "Sino ang astronomo na nawalan ng ilong sa duwelo at nag-ipon ng datos para kay Kepler?",
            correctAnswer: "Tycho Brahe",
            acceptableAnswers: ["tycho brahe", "brahe", "tycho"],
            hint: "Sikat sa kanyang ilong na gawa sa tanso/bronze!"
          },
          {
            id: "q2-5",
            type: "essay",
            question: "Ipaghambing ang Geocentric model ni Ptolemy at Heliocentric model ni Copernicus.",
            keyPoints: ["earth gitna", "araw gitna", "epicycles", "pag-ikot sa aksis"],
            sampleAnswer: "Sa Geocentric, Earth ang nasa gitna at hindi gumagalaw. Sa Heliocentric, Araw ang nasa gitna at umiikot ang Earth sa sarili nitong aksis araw-araw."
          }
        ]
      }
    },
    {
      id: 3,
      title: "Stage 3: Teleskopyo at Bagong Kasangkapan",
      subtitle: "Galileo, Viète at Napier",
      badge: "Telescope Master 🔭",
      color: "from-cyan-600 to-blue-700",
      description: "Sumilip sa mga buwan ng Jupiter, mag-solve ng algebra gamit ang vowels, at magpadali ng math gamit ang logarithms!",
      slides: [
        {
          id: "s3-1",
          title: "Galileo Galilei: Ang Sugo ng Kalangitan",
          category: "Pisika at Astronomiya",
          content: "Si **Galileo Galilei** (1564–1642) ay isang Italyanong siyentipiko na nagpabago sa astronomiya at pag-aaral ng galaw ng bagay.",
          bulletPoints: [
            "**1591 (Gravity)**: Kinwestyon ang teorya ni Aristotle sa pamamagitan ng pagpapatunay na pantay ang hila ng grabidad.",
            "**1609 (Teleskopyo)**: Pinaganda ang teleskopyo upang makita ang mga sikatad sa Buwan at Venus.",
            "**1610 (Mga Buwan ng Jupiter)**: Natuklasan ang 4 na buwan na umiikot sa Jupiter—patunay na hindi lahat ay umiikot sa Earth!",
            "**House Arrest**: Hinatulan ng lifelong house arrest ng Inquisition dahil sa kanyang paniniwala."
          ],
          hoverFacts: [
            { keyword: "4 na buwan na umiikot sa Jupiter", fact: "Tinatawag itong Galilean Moons: Io, Europa, Ganymede, at Callisto!" }
          ],
          mnemonic: {
            title: "G.A.L.I.L.E.O.",
            acronym: "Gravity Accelerated Lenses Inspect Moons Lunar Earth Orbit",
            meaning: "Grabidad + Teleskopyo sa kalangitan!"
          },
          joke: "Sinabi ni Galileo sa Simbahan: 'Hindi ko gustong guluhin ang mundo niyo, sumilip lang ako sa tubo!'"
        },
        {
          id: "s3-2",
          title: "François Viète: Ama ng Makabagong Algebra",
          category: "Matematika",
          content: "Si **François Viète** (1540–1603) ang nag-imbento ng sistematikong pagsulat ng Algebra.",
          bulletPoints: [
            "**Vowels vs. Consonants**: Ginamit ang **Vowels (A, E, I, O, U)** para sa *hindi pa alam* (unknowns)!",
            "**Consonants**: Ginamit ang **Consonants (B, C, D)** para sa *mga alam na numero* (known constants).",
            "**Epekto**: Nagbigay-daan kina René Descartes at Isaac Newton upang buuin ang calculus."
          ],
          hoverFacts: [
            { keyword: "hindi pa alam", fact: "Bago si Viète, ang mga problema sa algebra ay isinusulat bilang mahahabang talata!" }
          ],
          mnemonic: {
            title: "V.I.E.T.E.",
            acronym: "Vowel Is Expression Unknown To Everyone",
            meaning: "Vowel = Unknown, Consonant = Known!"
          },
          joke: "Bakit mahaba ang math problem bago si Viète? Kasi wala pa silang pambili ng Vowels!"
        },
        {
          id: "s3-3",
          title: "John Napier: Logarithms at ang Decimal Point",
          category: "Matematika",
          content: "Nag-ukol si **John Napier** (1550–1617) ng 20 taon upang gumawa ng mabilis na paraan sa math.",
          bulletPoints: [
            "**Logarithms**: Inimbento ang logarithms upang gawing simpleng PLUS (addition) ang mahirap na TIMES (multiplication)!",
            "**Decimal Point**: Pinatanyag ang paggamit ng **decimal point (.)** sa mga numero.",
            "**Imbensyon**: Gumawa ng Napier's Bones calculator at nagpakilala ng asin bilang pataba sa lupa."
          ],
          hoverFacts: [
            { keyword: "Logarithms", fact: "Sinabi ng mathematician na si Laplace na ang logarithms ay 'nagpadoble sa buhay ng mga astronomo'!" }
          ],
          mnemonic: {
            title: "N.A.P.I.E.R.",
            acronym: "Numbers Add Power In Easy Rules",
            meaning: "Gawin nating addition ang multiplication!"
          },
          joke: "Paano matulog ang logarithm? Naglo-log off!"
        }
      ],
      interactiveType: "algebra",
      checkpoint: {
        title: "Stage 3 Door Checkpoint Quiz",
        passingScore: 80,
        questions: [
          {
            id: "q3-1",
            type: "mcq",
            question: "Sa sistema ng algebra ni François Viète, ano ang kinakatawan ng mga Vowels (A, E, I)?",
            options: ["Mga numerong alam na", "Hindi pa alam na numero (Unknowns)", "Anggulo", "Prime numbers"],
            correct: 1,
            explanation: "Tama! Vowels ang ginamit ni Viète para sa unknown quantities."
          },
          {
            id: "q3-2",
            type: "mcq",
            question: "Sino ang astronomo na nakakita sa 4 na buwan ng Jupiter noong 1610 gamit ang teleskopyo?",
            options: ["John Napier", "Galileo Galilei", "Evangelista Torricelli", "Francis Bacon"],
            correct: 1,
            explanation: "Magaling! Nakita ni Galileo ang apat na buwan ng Jupiter."
          },
          {
            id: "q3-3",
            type: "identification",
            question: "Anong imbensyon sa math ang ginawa ni John Napier sa loob ng 20 taon upang mapadali ang pagkukuwenta?",
            correctAnswer: "Logarithms",
            acceptableAnswers: ["logarithms", "logarithm", "logs"],
            hint: "Ginagawa nitong addition ang mahirap na multiplication."
          },
          {
            id: "q3-4",
            type: "identification",
            question: "Ano ang pamagat ng sikat na aklat sa astronomiya na isinulat ni Galileo noong 1610?",
            correctAnswer: "The Starry Messenger",
            acceptableAnswers: ["the starry messenger", "starry messenger", "sidereus nuncius"],
            hint: "May salitang 'Starry' at 'Messenger' sa Ingles."
          },
          {
            id: "q3-5",
            type: "essay",
            question: "Iliwanag kung paano nakatulong sa mga siyentipiko ang logarithms at decimal point ni John Napier.",
            keyPoints: ["logarithms", "decimal point", "pabilis", "addition"],
            sampleAnswer: "Ginawa ng logarithms na simpleng addition ang mahirap na multiplication, at ang decimal point naman ang nagbigay ng eksaktong porsyento, na nagtipid ng maraming taon sa pagkukuwenta."
          }
        ]
      }
    },
    {
      id: 4,
      title: "Stage 4: Paraan, Presyon at Dugo",
      subtitle: "Bacon, Torricelli, Vesalius at Harvey",
      badge: "Empiricism Master 🧪",
      color: "from-emerald-600 to-teal-700",
      description: "Pagtatag ng Scientific Method, pagsukat ng vacuum gamit ang mercury, at pagtuklas sa bomba ng puso!",
      slides: [
        {
          id: "s4-1",
          title: "Francis Bacon: Ama ng Empiricism",
          category: "Pamamaraang Siyentipiko",
          content: "Si **Francis Bacon** (1561–1626) ang nagpabago sa paraan kung paano natin natutuklasan ang katotohanan.",
          bulletPoints: [
            "**Ama ng Empiricism**: Nagsabing ang tunay na kaalaman ay nanggagaling LAMANG sa obserbasyon at karanasan.",
            "***Novum Organum* (1620)**: Ipinakilala ang inductive reasoning at kumatnig kay Aristotle.",
            "**Scientific Method**: Ang siklo ng: **Obserbasyon ➔ Teorya ➔ Eksperimento ➔ Konklusyon**."
          ],
          hoverFacts: [
            { keyword: "Ama ng Empiricism", fact: "Namatay si Bacon sa pulmonya habang nilalagyan ng niyebe ang manok para subukan kung tatagal ang karne sa lamig!" }
          ],
          mnemonic: {
            title: "B.A.C.O.N.",
            acronym: "Build Answers Carefully Observation Needed",
            meaning: "Obserbasyon muna bago konklusyon!"
          },
          joke: "Bakit paborito si Francis Bacon ng mga kumakain ng almusal? Kasi laging may dalang karne ng katotohanan!"
        },
        {
          id: "s4-2",
          title: "Evangelista Torricelli: Vacuum at Barometer",
          category: "Pisika",
          content: "Napatunayan ni **Evangelista Torricelli** (1608–1647) na may bigat ang hangin at gumawa siya ng vacuum.",
          bulletPoints: [
            "**Eksperimento sa Barometer**: Inilubog ang 1.2-meter na tubong may mercury sa isang lalagyan.",
            "**Pagtuklas ng Vacuum**: Bumaba ang mercury sa ~760mm, na nag-iwan ng walang hanging espasyo (vacuum) sa taas!",
            "**Yunit ng Presyon**: Ang yunit na **torr** ay ipinangalan sa kanya."
          ],
          hoverFacts: [
            { keyword: "mercury", fact: "Mercury ang ginamit ni Torricelli dahil ito ay 13.6 beses na mas mabigat kaysa sa tubig!" }
          ],
          mnemonic: {
            title: "T.O.R.R.",
            acronym: "Tube Of Risen Red-mercury",
            meaning: "Torricelli = Tubo ng Mercury at Barometer!"
          },
          joke: "Ang eksperimento ni Torricelli ay sobrang preskoy, talagang nakakabawas ng pressure!"
        },
        {
          id: "s4-3",
          title: "Andres Vesalius at William Harvey",
          category: "Anatomiya at Medisina",
          content: "Binago nina **Andres Vesalius** at **William Harvey** ang medisina sa pamamagitan ng pag-opera sa katawan ng tao.",
          bulletPoints: [
            "**Vesalius (1543)**: Isinulat ang *On the Fabric of the Human Body*, pinatunayang mali ang lumang anatomy batay sa hayop.",
            "**Harvey (1628)**: Natuklasang ang **puso ay isang bomba (mechanical pump)** na nagpapadaloy ng dugo sa buong katawan!",
            "**Pagwawasto**: Pinatunayang hindi nawawala o nauubos ang dugo."
          ],
          hoverFacts: [
            { keyword: "bomba (mechanical pump)", fact: "Kinuwenta ni Harvey na mas maraming dugo ang ibinobomba ng puso sa isang oras kaysa sa timbang ng buong tao!" }
          ],
          mnemonic: {
            title: "H.A.R.V.E.Y.",
            acronym: "Heart Always Recirculates Veins Everywhere You-go",
            meaning: "Vesalius = Estruktura ng Katawan; Harvey = Bomba ng Puso!"
          },
          joke: "Ibinuhos talaga ni William Harvey ang kanyang puso sa trabaho!"
        }
      ],
      interactiveType: "barometer",
      checkpoint: {
        title: "Stage 4 Door Checkpoint Quiz",
        passingScore: 80,
        questions: [
          {
            id: "q4-1",
            type: "mcq",
            question: "Sino ang kilala bilang 'Ama ng Empiricism' na nagpakilala ng Inductive Scientific Method?",
            options: ["Evangelista Torricelli", "Francis Bacon", "William Harvey", "Andres Vesalius"],
            correct: 1,
            explanation: "Tumpak! Si Francis Bacon ang nagsabing eksperimento ang batayan ng kaalaman."
          },
          {
            id: "q4-2",
            type: "mcq",
            question: "Ano ang pangunahing natuklasan ni William Harvey tungkol sa puso ng tao?",
            options: ["Dugo ay ginagawa sa atay", "Ang puso ay isang bomba na nagpapadaloy ng dugo sa ikot na sistema", "May hangin sa ugat", "Walang valve ang ugat"],
            correct: 1,
            explanation: "Magaling! Napatunayan ni Harvey na ang puso ay mekanikal na bomba."
          },
          {
            id: "q4-3",
            type: "identification",
            question: "Anong yunit ng presyon ng hangin ang ipinangalan sa siyentipikong nag-imbento ng mercury barometer?",
            correctAnswer: "Torr",
            acceptableAnswers: ["torr", "torricelli"],
            hint: "4 na letrang yunit na katumbas ng 1 mmHg."
          },
          {
            id: "q4-4",
            type: "identification",
            question: "Sino ang Belhikanong doktor na naglathala ng 'On the Fabric of the Human Body' noong 1543?",
            correctAnswer: "Andres Vesalius",
            acceptableAnswers: ["andres vesalius", "vesalius"],
            hint: "Unang pangalan Andres, naglathala ng anatomya ng tao."
          },
          {
            id: "q4-5",
            type: "essay",
            question: "Ilarawan ang eksperimento ni Torricelli sa barometer at kung ano ang napatunayan nito.",
            keyPoints: ["mercury", "tubo", "vacuum", "presyon ng hangin"],
            sampleAnswer: "Inilubog ni Torricelli ang tubong may mercury sa lalagyan. Bumaba ito sa ~760mm at nag-iwan ng vacuum sa taas, na nagpapatunay na may bigat ang hangin at umiiral ang vacuum."
          }
        ]
      }
    },
    {
      id: 5,
      title: "Stage 5: Ang Pangkalahatang Buod",
      subtitle: "Huling Pagsubok sa Kaalaman",
      badge: "Revolution Scholar 🎓",
      color: "from-rose-600 to-amber-600",
      description: "Ang huling pagsubok! Ipakita ang iyong buong kaalaman sa mga siyentipiko, imbensyon, at epekto sa lipunan.",
      slides: [
        {
          id: "s5-1",
          title: "Ang Pamana ng Rebolusyong Siyentipiko",
          category: "Buod at Konklusyon",
          content: "Binago ng **Rebolusyong Siyentipiko** ang buong sibilisasyon ng tao sa larangan ng agham, pilosopiya, relihiyon, at lipunan.",
          bulletPoints: [
            "Pagbabago ng Paraan: Pinalitan ang 2,000 taong haka-haka ng totoong eksperimento at obserbasyon.",
            "Mga Bayani ng Agham: Copernicus, Vesalius, Bruno, Viète, Galileo, Napier, Kepler, Brahe, Bacon, Torricelli, at Harvey.",
            "Epekto: Binago ang mga aral ng Simbahan at itinatag ang pundasyon ng makabagong mundo."
          ],
          hoverFacts: [
            { keyword: "totoong eksperimento", fact: "Ang rebolusyong ito ang nagbigay-daan sa teorya ng grabidad ni Isaac Newton noong 1687!" }
          ],
          mnemonic: {
            title: "R.E.V.O.L.U.T.I.O.N.",
            acronym: "Reason Elevates Verification Over Legendary Unproven Traditions In Our Nature",
            meaning: "Ang katotohanan at lohika ang nagwagi sa lumang paniniwala!"
          },
          joke: "Ano ang sinabi ng Rebolusyong Siyentipiko sa lumang teorya? 'Kami na ang bahala rito!'"
        }
      ],
      checkpoint: {
        title: "Final Boss Mastery Exam",
        passingScore: 85,
        questions: [
          {
            id: "q5-1",
            type: "mcq",
            question: "Anong pangyayari noong 1543 ang itinuturing na simula ng Rebolusyong Siyentipiko?",
            options: ["Teleskopyo ni Galileo", "Paglathala nina Copernicus ng 'De Revolutionibus' at Vesalius ng 'On the Fabric of the Human Body'", "Aklat ni Bacon", "Barometer ni Torricelli"],
            correct: 1,
            explanation: "Ang 1543 ang dakilang taon ng pagsimula ng astronomiya at anatomya."
          },
          {
            id: "q5-2",
            type: "mcq",
            question: "Ayon sa Ikalawang Batas ni Kepler, ang bilis ng planeta ay:",
            options: ["Hindi nagbabago", "Bumibilis kapag malapit sa Araw", "Bumabagal malapit sa Araw", "Tumitigil sa gitna"],
            correct: 1,
            explanation: "Bumibilis ang galaw ng planeta kapag malapit ito sa Araw."
          },
          {
            id: "q5-3",
            type: "identification",
            question: "Sino ang nagsabi na ang mga bituin ay malalayong Araw na may sariling mga planeta (exoplanets)?",
            correctAnswer: "Giordano Bruno",
            acceptableAnswers: ["giordano bruno", "bruno"],
            hint: "Italyanong pilosopo na ipinapatay sa Roma noong 1600."
          },
          {
            id: "q5-4",
            type: "identification",
            question: "Anong paraan ng agham ang isinulat ni Francis Bacon noong 1620 sa kanyang aklat na 'Novum Organum'?",
            correctAnswer: "Inductive Scientific Method",
            acceptableAnswers: ["scientific method", "inductive reasoning", "empiricism"],
            hint: "Siklo ng obserbasyon, teorya, eksperimento, at konklusyon."
          },
          {
            id: "q5-5",
            type: "essay",
            question: "Buudin kung paano binago ng Rebolusyong Siyentipiko ang lipunan, pilosopiya, at relihiyon sa Europa.",
            keyPoints: ["ebidensya", "simbahan", "heliocentrism", "scientific method"],
            sampleAnswer: "Binago ng rebolusyon ang katotohanan mula sa bulag na paniniwala patungo sa ebidensya at eksperimento. Ang Heliocentrism at pag-dissect sa tao ay nagpabago sa turo ng Simbahan."
          }
        ]
      }
    }
  ]
};

export const JOKES_COLLECTION_BILINGUAL = {
  en: [
    "Why did Copernicus refuse to take a photo? Because he couldn't find his center!",
    "What did Galileo say when he saw Jupiter's moons? 'I'm starry-eyed!'",
    "Why did Francis Bacon love winter? Because he could freeze chickens in the snow for science!",
    "How did Torricelli celebrate his invention? Under high pressure!",
    "Why was Kepler bad at drawing circles? Because he preferred ovals!",
    "Why did Viète get along with vowels? Because he loved unknowns!"
  ],
  tl: [
    "Bakit ayaw magpa-picture ni Copernicus? Kasi hindi niya mahanap ang center niya!",
    "Ano ang sinabi ni Galileo noong nakita ang mga buwan ng Jupiter? 'Bituin sa aking mga mata!'",
    "Bakit paborito ni Francis Bacon ang taglamig? Kasi pwede niyang lagyan ng niyebe ang manok para sa eksperimento!",
    "Paano nagdiwang si Torricelli? Sobrang high pressure!",
    "Bakit ayaw ni Kepler sa bilog? Kasi mas type niya ang oval!",
    "Bakit mahilig si Viète sa vowels? Kasi mahilig siya sa hindi pa nakikilala (unknowns)!"
  ]
};

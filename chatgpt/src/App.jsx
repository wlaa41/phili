import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BatteryMedium,
  BookOpen,
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  DoorClosed,
  DoorOpen,
  FileText,
  KeyRound,
  Languages,
  Lightbulb,
  ListChecks,
  LockKeyhole,
  Map,
  RotateCcw,
  Scale,
  Sparkles,
  Volume2,
  VolumeX,
  X
} from "lucide-react";

const STORAGE_KEY = "law-phone-lesson-progress-v1";

const ui = {
  en: {
    soundOn: "Sound on",
    soundOff: "Sound off",
    reset: "Reset",
    lessonMap: "Lesson map",
    locked: "Locked",
    open: "Open",
    stage: "Stage",
    previous: "Previous",
    next: "Next",
    quizGate: "Quiz gate",
    memoryGate: "Memory gate",
    score: "Score",
    pass: "Pass",
    submit: "Submit gate answers",
    retry: "Retry gate",
    quizPassed: "Quiz passed",
    memoryCleared: "Memory cleared",
    nextDoor: "Open next door",
    complete: "Exam passport complete",
    chooseAll: "Answer every question before opening the door.",
    needsQuiz: "Pass the quiz gate.",
    needsMemory: "Clear the memory match.",
    doorOpen: "Door open. The next topic is unlocked.",
    finalDoor: "Final door open. Ready for the exam room.",
    match: "Match",
    matched: "Matched",
    flipAgain: "Shuffle cards",
    practiceLab: "Practice lab",
    checkAnswer: "Check answer",
    correct: "Correct",
    notYet: "Not yet",
    essayMeter: "Essay structure meter",
    language: "Language",
    fact: "Fact spark",
    answer: "Answer",
    progress: "Progress",
    allSet: "All set"
  },
  fil: {
    soundOn: "May tunog",
    soundOff: "Walang tunog",
    reset: "Ulitin",
    lessonMap: "Mapa ng aralin",
    locked: "Sarado",
    open: "Bukas",
    stage: "Yugto",
    previous: "Bumalik",
    next: "Susunod",
    quizGate: "Pinto ng quiz",
    memoryGate: "Pinto ng memorya",
    score: "Puntos",
    pass: "Pasado",
    submit: "Ipasa ang sagot",
    retry: "Subukan muli",
    quizPassed: "Pasado sa quiz",
    memoryCleared: "Malinis ang memorya",
    nextDoor: "Buksan ang susunod",
    complete: "Kumpleto ang exam passport",
    chooseAll: "Sagutan muna lahat bago buksan ang pinto.",
    needsQuiz: "Ipasa ang quiz gate.",
    needsMemory: "Tapusin ang memory match.",
    doorOpen: "Bukas na ang pinto. Naka-unlock ang susunod.",
    finalDoor: "Bukas na ang huling pinto. Handa na sa exam room.",
    match: "Ipares",
    matched: "Magkapareha",
    flipAgain: "Haluin ang cards",
    practiceLab: "Practice lab",
    checkAnswer: "Suriin ang sagot",
    correct: "Tama",
    notYet: "Hindi pa",
    essayMeter: "Sukat ng essay structure",
    language: "Wika",
    fact: "Fact spark",
    answer: "Sagot",
    progress: "Progreso",
    allSet: "Ayos na"
  }
};

const stages = [
  {
    id: "exam-map",
    icon: Map,
    color: "mint",
    passScore: 3,
    title: {
      en: "Exam Map",
      fil: "Mapa ng Exam"
    },
    kicker: {
      en: "Three exam formats, three brain moves: recognize, name, argue.",
      fil: "Tatlong anyo ng exam, tatlong galaw ng utak: kilalanin, pangalanan, ipaglaban."
    },
    hook: {
      en: "R-N-A: Recognize for MCQ, Name for identification, Argue for essay.",
      fil: "R-N-A: Recognize sa MCQ, Name sa identification, Argue sa essay."
    },
    slides: [
      {
        title: {
          en: "Know the exam shape",
          fil: "Alamin ang hugis ng exam"
        },
        body: {
          en: "Multiple choice rewards recognition. Identification rewards exact recall. Essay rewards organized reasoning. Treat each part like a different app on your Law Phone.",
          fil: "Ang multiple choice ay para sa pagkilala. Ang identification ay para sa eksaktong alaala. Ang essay ay para sa maayos na pangangatwiran. Parang magkakaibang app sa Law Phone."
        },
        acronym: {
          en: "R-N-A keeps the format clear: Recognize, Name, Argue.",
          fil: "R-N-A ang gabay: Recognize, Name, Argue."
        },
        facts: [
          {
            label: { en: "MCQ clue", fil: "MCQ clue" },
            detail: {
              en: "MCQ options often include one answer that is true but not the answer to this question. The stem is the boss.",
              fil: "Sa MCQ, may option na totoo pero hindi sagot sa tanong. Ang stem ang boss."
            }
          },
          {
            label: { en: "ID clue", fil: "ID clue" },
            detail: {
              en: "Identification marks love precision. A near word can be a near miss.",
              fil: "Mahilig sa eksakto ang identification. Kapag halos tama lang, delikado pa rin."
            }
          },
          {
            label: { en: "Essay clue", fil: "Essay clue" },
            detail: {
              en: "An essay with rules but no application is like karaoke with no microphone: the song is there, but nobody hears the point.",
              fil: "Ang essay na puro rule pero walang application ay parang karaoke na walang mikropono: nandoon ang kanta, pero hindi marinig ang punto."
            }
          }
        ]
      },
      {
        title: {
          en: "Pass doors, not just slides",
          fil: "Pinto ang dadaanan, hindi lang slides"
        },
        body: {
          en: "Each topic ends with a multiple-choice gate and a memory match. Passing opens the next door, so revision feels like a game instead of a long hallway.",
          fil: "Bawat topic ay may multiple-choice gate at memory match. Kapag pasado, bubukas ang susunod na pinto, kaya parang laro ang review."
        },
        acronym: {
          en: "Door rule: Learn, check, match, unlock.",
          fil: "Rule ng pinto: Aral, check, pares, unlock."
        },
        facts: [
          {
            label: { en: "Memory", fil: "Memorya" },
            detail: {
              en: "Matching a word to its meaning strengthens retrieval because the brain has to pull the answer, not just reread it.",
              fil: "Mas tumitibay ang memorya kapag pinapares ang salita at kahulugan dahil hinahanap mismo ng utak ang sagot."
            }
          },
          {
            label: { en: "Confidence", fil: "Kumpiyansa" },
            detail: {
              en: "Small wins matter. A passed gate tells students, clearly, what they already control.",
              fil: "Mahalaga ang maliliit na panalo. Ang pasado sa gate ay malinaw na patunay kung ano na ang kontrolado ng estudyante."
            }
          }
        ]
      }
    ],
    quiz: [
      {
        prompt: {
          en: "Which exam type mainly tests recognition among options?",
          fil: "Aling exam type ang pangunahing sumusubok ng pagkilala mula sa options?"
        },
        options: [
          { en: "Multiple choice", fil: "Multiple choice" },
          { en: "Identification", fil: "Identification" },
          { en: "Essay", fil: "Essay" },
          { en: "Attendance sheet", fil: "Attendance sheet" }
        ],
        answer: 0,
        explain: {
          en: "Multiple choice gives options, so your first job is to recognize the best one.",
          fil: "May options sa multiple choice, kaya unang trabaho ang kilalanin ang pinakamainam."
        }
      },
      {
        prompt: {
          en: "Which exam type needs the exact term, phrase, or name?",
          fil: "Aling exam type ang nangangailangan ng eksaktong termino, parirala, o pangalan?"
        },
        options: [
          { en: "Essay", fil: "Essay" },
          { en: "Identification", fil: "Identification" },
          { en: "Multiple choice", fil: "Multiple choice" },
          { en: "Group work", fil: "Group work" }
        ],
        answer: 1,
        explain: {
          en: "Identification is the naming game: precise term, careful spelling, correct qualifier.",
          fil: "Identification ang naming game: eksaktong termino, maingat na spelling, tamang qualifier."
        }
      },
      {
        prompt: {
          en: "Which exam type rewards a structured argument?",
          fil: "Aling exam type ang nagbibigay puntos sa maayos na argumento?"
        },
        options: [
          { en: "Essay", fil: "Essay" },
          { en: "Identification only", fil: "Identification lang" },
          { en: "Multiple choice only", fil: "Multiple choice lang" },
          { en: "None", fil: "Wala" }
        ],
        answer: 0,
        explain: {
          en: "Essay answers need a claim, the rule, application, and a conclusion.",
          fil: "Kailangan ng essay ang claim, rule, application, at conclusion."
        }
      },
      {
        prompt: {
          en: "What is the best general exam rhythm?",
          fil: "Ano ang pinakamainam na pangkalahatang ritmo sa exam?"
        },
        options: [
          { en: "Panic, guess, move on", fil: "Mag-panic, manghula, umalis" },
          { en: "Read the task, answer the format, check the details", fil: "Basahin ang gawain, sagutin ayon sa format, suriin ang detalye" },
          { en: "Write everything you know", fil: "Isulat lahat ng alam" },
          { en: "Ignore command words", fil: "Balewalain ang command words" }
        ],
        answer: 1,
        explain: {
          en: "Format controls strategy. Read the task, answer the exact format, then check.",
          fil: "Ang format ang kumokontrol sa strategy. Basahin, sagutin ayon sa format, saka suriin."
        }
      }
    ],
    pairs: [
      {
        term: { en: "Multiple choice", fil: "Multiple choice" },
        match: { en: "Recognize best option", fil: "Kilalanin ang best option" }
      },
      {
        term: { en: "Identification", fil: "Identification" },
        match: { en: "Name exact term", fil: "Pangalanan ang eksakto" }
      },
      {
        term: { en: "Essay", fil: "Essay" },
        match: { en: "Argue with structure", fil: "Mangatuwiran nang maayos" }
      },
      {
        term: { en: "Gate", fil: "Gate" },
        match: { en: "Pass to unlock", fil: "Pasa bago unlock" }
      }
    ]
  },
  {
    id: "mcq-detective",
    icon: ListChecks,
    color: "coral",
    passScore: 3,
    title: {
      en: "Multiple Choice Detective",
      fil: "Multiple Choice Detective"
    },
    kicker: {
      en: "Use CLEAR: Command, Locate clue, Eliminate traps, Answer, Review.",
      fil: "Gamitin ang CLEAR: Command, Locate clue, Eliminate traps, Answer, Review."
    },
    hook: {
      en: "If an option says always, never, or only, make it earn that confidence.",
      fil: "Kapag may always, never, o only, kailangan nitong patunayan ang yabang."
    },
    slides: [
      {
        title: {
          en: "C is for Command",
          fil: "C ay Command"
        },
        body: {
          en: "Start with the command word: identify, apply, distinguish, choose the best answer. A true statement can still be wrong if it answers the wrong task.",
          fil: "Magsimula sa command word: identify, apply, distinguish, piliin ang best answer. Puwedeng totoo ang statement pero mali kung ibang tanong ang sinasagot."
        },
        acronym: {
          en: "CLEAR starts by asking: what exactly is the question asking me to do?",
          fil: "Nagsisimula ang CLEAR sa tanong: ano ba talaga ang pinapagawa?"
        },
        facts: [
          {
            label: { en: "Trap", fil: "Bitag" },
            detail: {
              en: "Exam traps often use familiar words from the lesson. Familiar is not the same as correct.",
              fil: "Madalas gumamit ng pamilyar na salita ang exam trap. Hindi ibig sabihin ng pamilyar ay tama."
            }
          },
          {
            label: { en: "Tiny joke", fil: "Munty joke" },
            detail: {
              en: "The word 'always' walks into an exam like it owns the place. Ask for the receipt.",
              fil: "Ang salitang 'always' pumapasok sa exam na parang may titulo sa lupa. Hanapan ng resibo."
            }
          }
        ]
      },
      {
        title: {
          en: "E is for Eliminate",
          fil: "E ay Eliminate"
        },
        body: {
          en: "Remove options that are too broad, too narrow, unrelated, or opposite to the facts. Then compare the survivors against the stem.",
          fil: "Tanggalin ang sobrang lawak, sobrang kitid, walang kaugnayan, o kabaligtaran ng facts. Pagkatapos, ihambing ang natira sa stem."
        },
        acronym: {
          en: "Two bad options removed can turn panic into probability.",
          fil: "Kapag natanggal ang dalawang maling option, ang kaba ay nagiging probability."
        },
        facts: [
          {
            label: { en: "Probability", fil: "Probability" },
            detail: {
              en: "On four options, eliminating two traps changes a blind guess from 25 percent to 50 percent.",
              fil: "Sa apat na options, kapag natanggal ang dalawang bitag, ang hulang 25 percent ay nagiging 50 percent."
            }
          },
          {
            label: { en: "Law lens", fil: "Law lens" },
            detail: {
              en: "In law questions, the small fact pattern matters. Who did what, when, and under what rule?",
              fil: "Sa law questions, mahalaga ang maliit na fact pattern. Sino ang gumawa, kailan, at sa ilalim ng anong rule?"
            }
          }
        ]
      },
      {
        title: {
          en: "Review without spiraling",
          fil: "Mag-review nang hindi umiikot"
        },
        body: {
          en: "After choosing, reread the stem with your answer inserted. If it forms a clean sentence and survives the facts, move on.",
          fil: "Pagkatapos pumili, basahin muli ang stem kasama ang sagot. Kung malinis ang pangungusap at tugma sa facts, magpatuloy."
        },
        acronym: {
          en: "Review is a seatbelt, not a second exam.",
          fil: "Ang review ay seatbelt, hindi pangalawang exam."
        },
        facts: [
          {
            label: { en: "Speed", fil: "Bilis" },
            detail: {
              en: "A calm 20-second review catches more errors than a stressed 2-minute overthink.",
              fil: "Mas maraming nahuhuling mali ang kalmadong 20-second review kaysa stressed na 2-minute overthink."
            }
          }
        ]
      }
    ],
    quiz: [
      {
        prompt: {
          en: "What is the first step in CLEAR?",
          fil: "Ano ang unang hakbang sa CLEAR?"
        },
        options: [
          { en: "Check the command word", fil: "Suriin ang command word" },
          { en: "Choose the longest option", fil: "Piliin ang pinakamahabang option" },
          { en: "Skip the facts", fil: "Laktawan ang facts" },
          { en: "Copy an answer from memory", fil: "Kopyahin mula sa memorya" }
        ],
        answer: 0,
        explain: {
          en: "The command word tells you the job: identify, apply, compare, or evaluate.",
          fil: "Ang command word ang nagsasabi ng gawain: identify, apply, compare, o evaluate."
        }
      },
      {
        prompt: {
          en: "Which option is usually suspicious in MCQ?",
          fil: "Aling option ang kadalasang kahina-hinala sa MCQ?"
        },
        options: [
          { en: "A specific answer tied to the facts", fil: "Specific na sagot na tugma sa facts" },
          { en: "An absolute answer using always or never", fil: "Absolute na sagot na may always o never" },
          { en: "A short answer", fil: "Maikling sagot" },
          { en: "An answer with a familiar term", fil: "Sagot na may pamilyar na term" }
        ],
        answer: 1,
        explain: {
          en: "Absolute words can be correct, but they deserve extra checking.",
          fil: "Puwedeng tama ang absolute words, pero kailangan silang suriin nang mabuti."
        }
      },
      {
        prompt: {
          en: "After eliminating two wrong answers in a four-option question, what improves?",
          fil: "Pagkatapos tanggalin ang dalawang maling sagot sa apat na options, ano ang gumaganda?"
        },
        options: [
          { en: "The odds of a careful choice", fil: "Tsansa ng maingat na pili" },
          { en: "The spelling of the answer", fil: "Spelling ng sagot" },
          { en: "The essay conclusion", fil: "Conclusion ng essay" },
          { en: "The exam timer", fil: "Timer ng exam" }
        ],
        answer: 0,
        explain: {
          en: "Elimination improves your odds and focuses attention on the real contest.",
          fil: "Ang elimination ay nagpapaganda ng tsansa at nagpapalinaw ng totoong pagpipilian."
        }
      },
      {
        prompt: {
          en: "What should you do before moving on from a chosen answer?",
          fil: "Ano ang dapat gawin bago lumipat mula sa napiling sagot?"
        },
        options: [
          { en: "Reread the stem with the answer inserted", fil: "Basahin muli ang stem kasama ang sagot" },
          { en: "Change it because first answers are always wrong", fil: "Palitan dahil laging mali ang unang sagot" },
          { en: "Ignore all qualifiers", fil: "Balewalain ang qualifiers" },
          { en: "Write an essay beside it", fil: "Sumulat ng essay sa tabi nito" }
        ],
        answer: 0,
        explain: {
          en: "The inserted-answer check catches mismatches without wasting time.",
          fil: "Nahuhuli ng inserted-answer check ang mismatch nang hindi aksaya sa oras."
        }
      }
    ],
    pairs: [
      {
        term: { en: "Command", fil: "Command" },
        match: { en: "What the question asks", fil: "Pinapagawa ng tanong" }
      },
      {
        term: { en: "Clue", fil: "Clue" },
        match: { en: "Fact that points to rule", fil: "Fact na tumuturo sa rule" }
      },
      {
        term: { en: "Trap", fil: "Bitag" },
        match: { en: "Almost true option", fil: "Halos totoong option" }
      },
      {
        term: { en: "Review", fil: "Review" },
        match: { en: "Quick final check", fil: "Mabilis na final check" }
      }
    ],
    practice: {
      type: "eliminate",
      title: {
        en: "Mini case",
        fil: "Mini case"
      },
      prompt: {
        en: "A question asks for the best first step. Which two options are traps?",
        fil: "Ang tanong ay best first step. Aling dalawang options ang bitag?"
      },
      options: [
        { text: { en: "Read the command word", fil: "Basahin ang command word" }, trap: false },
        { text: { en: "Pick the longest option", fil: "Piliin ang pinakamahabang option" }, trap: true },
        { text: { en: "Find the key fact", fil: "Hanapin ang key fact" }, trap: false },
        { text: { en: "Ignore the word except", fil: "Balewalain ang word na except" }, trap: true }
      ]
    }
  },
  {
    id: "identification-snap",
    icon: KeyRound,
    color: "gold",
    passScore: 3,
    title: {
      en: "Identification Snap",
      fil: "Identification Snap"
    },
    kicker: {
      en: "Use SNAP: Spot clue, Name the term, Add qualifier, Proofread.",
      fil: "Gamitin ang SNAP: Spot clue, Name the term, Add qualifier, Proofread."
    },
    hook: {
      en: "Identification is not a paragraph. It is a clean label with no extra fog.",
      fil: "Ang identification ay hindi paragraph. Malinis na label ito, walang usok."
    },
    slides: [
      {
        title: {
          en: "Spot the clue",
          fil: "Hanapin ang clue"
        },
        body: {
          en: "The prompt usually gives a definition, example, date, person, case, or short situation. Circle the clue in your mind, then pull the exact term.",
          fil: "Karaniwang nagbibigay ang prompt ng definition, halimbawa, petsa, tao, case, o maikling sitwasyon. Hanapin ang clue sa isip, saka kunin ang eksaktong term."
        },
        acronym: {
          en: "SNAP starts with the clue, not the blank.",
          fil: "Nagsisimula ang SNAP sa clue, hindi sa blank."
        },
        facts: [
          {
            label: { en: "Exactness", fil: "Eksakto" },
            detail: {
              en: "If the clue says court power, 'jurisdiction' is stronger than 'authority' because it is the legal term.",
              fil: "Kung court power ang clue, mas matibay ang 'jurisdiction' kaysa 'authority' dahil iyon ang legal term."
            }
          },
          {
            label: { en: "Memory hook", fil: "Memory hook" },
            detail: {
              en: "Make flash pairs: term on one side, exam-style clue on the other.",
              fil: "Gumawa ng flash pairs: term sa isang side, exam-style clue sa kabila."
            }
          }
        ]
      },
      {
        title: {
          en: "Add the qualifier",
          fil: "Idagdag ang qualifier"
        },
        body: {
          en: "Some terms have twins. Civil liability is not criminal liability. Void is not voidable. The qualifier protects the point.",
          fil: "May mga term na may kakambal. Ang civil liability ay hindi criminal liability. Ang void ay hindi voidable. Ang qualifier ang proteksyon ng puntos."
        },
        acronym: {
          en: "Qualifier = tiny word, big mark.",
          fil: "Qualifier = maliit na salita, malaking puntos."
        },
        facts: [
          {
            label: { en: "Twin terms", fil: "Kambal terms" },
            detail: {
              en: "When two terms sound close, write a one-line difference in your reviewer.",
              fil: "Kapag magkalapit ang tunog ng terms, magsulat ng one-line difference sa reviewer."
            }
          },
          {
            label: { en: "Spelling", fil: "Spelling" },
            detail: {
              en: "A spelling check is not vanity. In identification, spelling can signal whether you truly know the term.",
              fil: "Hindi arte ang spelling check. Sa identification, spelling ang palatandaan na alam mo talaga ang term."
            }
          }
        ]
      }
    ],
    quiz: [
      {
        prompt: {
          en: "In SNAP, what does N stand for?",
          fil: "Sa SNAP, ano ang ibig sabihin ng N?"
        },
        options: [
          { en: "Name the exact term", fil: "Name the exact term" },
          { en: "Never answer", fil: "Never answer" },
          { en: "Narrate a paragraph", fil: "Mag-narrate ng paragraph" },
          { en: "Neglect spelling", fil: "Balewalain ang spelling" }
        ],
        answer: 0,
        explain: {
          en: "Identification asks you to name the exact term, phrase, case, person, or date.",
          fil: "Pinapangalanan sa identification ang eksaktong term, phrase, case, tao, o petsa."
        }
      },
      {
        prompt: {
          en: "What protects points when two legal terms are similar?",
          fil: "Ano ang nagpoprotekta ng puntos kapag magkahawig ang legal terms?"
        },
        options: [
          { en: "A qualifier", fil: "Qualifier" },
          { en: "A joke", fil: "Joke" },
          { en: "A longer sentence", fil: "Mas mahabang pangungusap" },
          { en: "A random example", fil: "Random na halimbawa" }
        ],
        answer: 0,
        explain: {
          en: "A qualifier such as civil, criminal, valid, or voidable can separate close terms.",
          fil: "Ang qualifier tulad ng civil, criminal, valid, o voidable ay naghihiwalay ng magkalapit na terms."
        }
      },
      {
        prompt: {
          en: "The clue says: authority of a court to hear a case. Best answer?",
          fil: "Ang clue: kapangyarihan ng court na dinggin ang kaso. Best answer?"
        },
        options: [
          { en: "Jurisdiction", fil: "Jurisdiction" },
          { en: "Evidence", fil: "Evidence" },
          { en: "Appeal", fil: "Appeal" },
          { en: "Contract", fil: "Contract" }
        ],
        answer: 0,
        explain: {
          en: "Jurisdiction is the legal authority of a court over a case or parties.",
          fil: "Jurisdiction ang legal na kapangyarihan ng court sa kaso o parties."
        }
      },
      {
        prompt: {
          en: "Best identification habit before submitting?",
          fil: "Pinakamainam na habit sa identification bago ipasa?"
        },
        options: [
          { en: "Proofread spelling and qualifier", fil: "I-proofread ang spelling at qualifier" },
          { en: "Add unrelated facts", fil: "Magdagdag ng walang kaugnayang facts" },
          { en: "Erase short answers", fil: "Burahin ang maikling sagot" },
          { en: "Turn every answer into an essay", fil: "Gawing essay ang bawat sagot" }
        ],
        answer: 0,
        explain: {
          en: "Short answers still need a final precision check.",
          fil: "Kahit maikli ang sagot, kailangan pa rin ng final precision check."
        }
      }
    ],
    pairs: [
      {
        term: { en: "Jurisdiction", fil: "Jurisdiction" },
        match: { en: "Court authority", fil: "Kapangyarihan ng court" }
      },
      {
        term: { en: "Precedent", fil: "Precedent" },
        match: { en: "Prior guiding decision", fil: "Naunang gabay na decision" }
      },
      {
        term: { en: "Due process", fil: "Due process" },
        match: { en: "Fair procedure", fil: "Makatarungang proseso" }
      },
      {
        term: { en: "Mens rea", fil: "Mens rea" },
        match: { en: "Guilty mind", fil: "Masamang layunin" }
      }
    ],
    practice: {
      type: "identification",
      title: {
        en: "One-word snap",
        fil: "One-word snap"
      },
      prompt: {
        en: "Legal authority of a court to hear and decide a case.",
        fil: "Legal na kapangyarihan ng court na dinggin at desisyunan ang kaso."
      },
      answers: ["jurisdiction", "hurisdiksyon"],
      hint: {
        en: "Starts with J. It is about the court's power.",
        fil: "Nagsisimula sa J. Tungkol ito sa power ng court."
      }
    }
  },
  {
    id: "essay-irac",
    icon: FileText,
    color: "violet",
    passScore: 3,
    title: {
      en: "Essay IRAC",
      fil: "Essay IRAC"
    },
    kicker: {
      en: "Use IRAC: Issue, Rule, Application, Conclusion.",
      fil: "Gamitin ang IRAC: Issue, Rule, Application, Conclusion."
    },
    hook: {
      en: "Essay marks like order. Give the examiner a road, not a maze.",
      fil: "Gusto ng essay marks ang ayos. Bigyan ang examiner ng daan, hindi maze."
    },
    slides: [
      {
        title: {
          en: "Issue and Rule",
          fil: "Issue at Rule"
        },
        body: {
          en: "Start by naming the legal question. Then state the rule in clear words. Do not unload every rule you know. Choose the rule that solves this fact pattern.",
          fil: "Unahin ang legal question. Pagkatapos, ilahad ang rule nang malinaw. Huwag ibuhos lahat ng alam. Piliin ang rule na sasagot sa facts."
        },
        acronym: {
          en: "I + R = the exam knows you found the right law.",
          fil: "I + R = alam ng exam na nahanap mo ang tamang batas."
        },
        facts: [
          {
            label: { en: "Issue", fil: "Issue" },
            detail: {
              en: "A strong issue sentence often begins with whether: whether X is liable, valid, admissible, or enforceable.",
              fil: "Madalas nagsisimula sa whether ang malakas na issue sentence: whether liable, valid, admissible, o enforceable."
            }
          },
          {
            label: { en: "Rule", fil: "Rule" },
            detail: {
              en: "Rules score best when they are accurate and usable, not when they sound fancy.",
              fil: "Mas mataas ang rule kapag accurate at magagamit, hindi lang kapag pormal pakinggan."
            }
          }
        ]
      },
      {
        title: {
          en: "Application is the money mark",
          fil: "Application ang malaking puntos"
        },
        body: {
          en: "Application connects rule to facts. Use because, here, therefore. This is where you prove you can think, not just recite.",
          fil: "Kinokonekta ng application ang rule sa facts. Gamitin ang because, here, therefore. Dito pinapakita na kaya mong mag-isip, hindi lang mag-recitate."
        },
        acronym: {
          en: "Because + Here + Therefore = analysis that moves.",
          fil: "Because + Here + Therefore = gumagalaw na analysis."
        },
        facts: [
          {
            label: { en: "Marker secret", fil: "Marker secret" },
            detail: {
              en: "Many essays lose marks because they stop after the rule. Application is where the examiner sees judgment.",
              fil: "Maraming essay ang nawawalan ng points dahil tumitigil sa rule. Sa application nakikita ng examiner ang judgment."
            }
          },
          {
            label: { en: "Tiny joke", fil: "Munty joke" },
            detail: {
              en: "A conclusion without application is a dramatic exit from a room nobody entered.",
              fil: "Ang conclusion na walang application ay dramatic exit mula sa kwartong hindi pinasukan."
            }
          }
        ]
      },
      {
        title: {
          en: "Conclusion: short and earned",
          fil: "Conclusion: maikli at may basehan"
        },
        body: {
          en: "End with the likely result. Keep it short. If the facts are balanced, say so and explain which side is stronger.",
          fil: "Tapusin sa posibleng resulta. Panatilihing maikli. Kung balanced ang facts, sabihin ito at ipaliwanag kung aling side ang mas malakas."
        },
        acronym: {
          en: "C is not a repeat. C is the landing.",
          fil: "Ang C ay hindi ulit. Ang C ang landing."
        },
        facts: [
          {
            label: { en: "Balance", fil: "Balance" },
            detail: {
              en: "Law essays can accept nuanced answers when the reasoning is clear.",
              fil: "Tinatanggap ng law essay ang nuanced answers kung malinaw ang reasoning."
            }
          }
        ]
      }
    ],
    quiz: [
      {
        prompt: {
          en: "What does IRAC stand for?",
          fil: "Ano ang ibig sabihin ng IRAC?"
        },
        options: [
          { en: "Issue, Rule, Application, Conclusion", fil: "Issue, Rule, Application, Conclusion" },
          { en: "Idea, Reason, Answer, Case", fil: "Idea, Reason, Answer, Case" },
          { en: "Identify, Rewrite, Add, Copy", fil: "Identify, Rewrite, Add, Copy" },
          { en: "Intro, Recite, Argue, Continue", fil: "Intro, Recite, Argue, Continue" }
        ],
        answer: 0,
        explain: {
          en: "IRAC gives an essay a clean legal structure.",
          fil: "Nagbibigay ang IRAC ng malinaw na legal structure sa essay."
        }
      },
      {
        prompt: {
          en: "Which part connects the law to the facts?",
          fil: "Aling bahagi ang kumokonekta sa batas at facts?"
        },
        options: [
          { en: "Application", fil: "Application" },
          { en: "Title", fil: "Title" },
          { en: "Decoration", fil: "Dekorasyon" },
          { en: "Question number", fil: "Question number" }
        ],
        answer: 0,
        explain: {
          en: "Application is analysis. It explains why the rule leads to the result.",
          fil: "Ang application ang analysis. Ipinapaliwanag nito kung bakit humahantong sa resulta ang rule."
        }
      },
      {
        prompt: {
          en: "Which issue sentence is strongest?",
          fil: "Aling issue sentence ang pinakamalakas?"
        },
        options: [
          { en: "This is about law.", fil: "Tungkol ito sa law." },
          { en: "The issue is whether the agreement is enforceable.", fil: "Ang issue ay whether enforceable ang agreement." },
          { en: "I will write many rules.", fil: "Magsusulat ako ng maraming rules." },
          { en: "The answer is long.", fil: "Mahaba ang sagot." }
        ],
        answer: 1,
        explain: {
          en: "A strong issue names the legal question that the facts raise.",
          fil: "Ang malakas na issue ay pinapangalanan ang legal question mula sa facts."
        }
      },
      {
        prompt: {
          en: "What should the conclusion do?",
          fil: "Ano ang dapat gawin ng conclusion?"
        },
        options: [
          { en: "State the likely result briefly", fil: "Sabihin nang maikli ang posibleng resulta" },
          { en: "Introduce a brand-new rule", fil: "Magpasok ng bagong rule" },
          { en: "Repeat every sentence", fil: "Ulitin lahat ng pangungusap" },
          { en: "Avoid answering", fil: "Iwasan ang sagot" }
        ],
        answer: 0,
        explain: {
          en: "The conclusion should land the argument, not restart it.",
          fil: "Dapat ilapag ng conclusion ang argumento, hindi ito simulan muli."
        }
      }
    ],
    pairs: [
      {
        term: { en: "Issue", fil: "Issue" },
        match: { en: "Legal question", fil: "Legal na tanong" }
      },
      {
        term: { en: "Rule", fil: "Rule" },
        match: { en: "Law that controls", fil: "Batas na gagamitin" }
      },
      {
        term: { en: "Application", fil: "Application" },
        match: { en: "Rule plus facts", fil: "Rule plus facts" }
      },
      {
        term: { en: "Conclusion", fil: "Conclusion" },
        match: { en: "Likely result", fil: "Posibleng resulta" }
      }
    ],
    practice: {
      type: "essay",
      title: {
        en: "Build a tiny IRAC",
        fil: "Bumuo ng maliit na IRAC"
      },
      scenario: {
        en: "A student promised to sell a phone after receiving payment, then refused to deliver it.",
        fil: "Isang estudyante ang nangakong ibebenta ang phone matapos tumanggap ng bayad, pero tumangging ibigay ito."
      },
      fields: [
        {
          key: "issue",
          label: { en: "Issue", fil: "Issue" },
          placeholder: {
            en: "Whether the agreement can be enforced...",
            fil: "Whether enforceable ang agreement..."
          }
        },
        {
          key: "rule",
          label: { en: "Rule", fil: "Rule" },
          placeholder: {
            en: "A valid agreement requires...",
            fil: "Ang valid agreement ay nangangailangan ng..."
          }
        },
        {
          key: "application",
          label: { en: "Application", fil: "Application" },
          placeholder: {
            en: "Here, payment was received because...",
            fil: "Dito, natanggap ang bayad dahil..."
          }
        },
        {
          key: "conclusion",
          label: { en: "Conclusion", fil: "Conclusion" },
          placeholder: {
            en: "Therefore, the likely result is...",
            fil: "Samakatuwid, ang posibleng resulta ay..."
          }
        }
      ]
    }
  },
  {
    id: "exam-room",
    icon: ClipboardCheck,
    color: "blue",
    passScore: 4,
    title: {
      en: "Exam Room",
      fil: "Exam Room"
    },
    kicker: {
      en: "A mixed final gate for multiple choice, identification, and essay strategy.",
      fil: "Mixed final gate para sa multiple choice, identification, at essay strategy."
    },
    hook: {
      en: "PACE: Prioritize, Answer the format, Check, Exit calmly.",
      fil: "PACE: Prioritize, Answer the format, Check, Exit nang kalmado."
    },
    slides: [
      {
        title: {
          en: "Choose the right mode",
          fil: "Piliin ang tamang mode"
        },
        body: {
          en: "Before answering, ask what kind of response the item wants. Recognition, exact naming, and argument use different muscles.",
          fil: "Bago sumagot, tanungin kung anong uri ng response ang kailangan. Magkaiba ang recognition, exact naming, at argument."
        },
        acronym: {
          en: "Mode first. Answer second.",
          fil: "Mode muna. Sagot pagkatapos."
        },
        facts: [
          {
            label: { en: "Time", fil: "Oras" },
            detail: {
              en: "Fast marks first can calm the whole paper. Do the clear items before wrestling with the heavy ones.",
              fil: "Unahin ang malinaw na puntos para kumalma ang buong exam. Sagutan muna ang kaya bago ang mabibigat."
            }
          },
          {
            label: { en: "Final check", fil: "Final check" },
            detail: {
              en: "Use the last minutes for names, qualifiers, and conclusions. They are small doors to real marks.",
              fil: "Gamitin ang huling minuto para sa names, qualifiers, at conclusions. Maliliit silang pinto papunta sa tunay na points."
            }
          }
        ]
      }
    ],
    quiz: [
      {
        prompt: {
          en: "A question says: 'Identify the legal term.' What mode is needed?",
          fil: "Sabi ng tanong: 'Identify the legal term.' Anong mode ang kailangan?"
        },
        options: [
          { en: "Identification", fil: "Identification" },
          { en: "Essay only", fil: "Essay lang" },
          { en: "Random guessing", fil: "Random na hula" },
          { en: "Ignore the command", fil: "Balewalain ang command" }
        ],
        answer: 0,
        explain: {
          en: "The command asks for the exact term.",
          fil: "Humihingi ang command ng eksaktong term."
        }
      },
      {
        prompt: {
          en: "A question asks for the best answer from four choices. Which strategy helps most?",
          fil: "May tanong na humihingi ng best answer mula sa apat na choices. Aling strategy ang pinakamakatutulong?"
        },
        options: [
          { en: "CLEAR", fil: "CLEAR" },
          { en: "Write IRAC immediately", fil: "Magsulat agad ng IRAC" },
          { en: "Skip all clues", fil: "Laktawan lahat ng clues" },
          { en: "Choose the fanciest word", fil: "Piliin ang pinakapormal na word" }
        ],
        answer: 0,
        explain: {
          en: "CLEAR is built for multiple-choice thinking.",
          fil: "Ginawa ang CLEAR para sa multiple-choice thinking."
        }
      },
      {
        prompt: {
          en: "A law essay is weak if it only states rules. What is missing?",
          fil: "Mahina ang law essay kung puro rules lang. Ano ang kulang?"
        },
        options: [
          { en: "Application to facts", fil: "Application sa facts" },
          { en: "More decoration", fil: "Mas maraming dekorasyon" },
          { en: "Longer handwriting", fil: "Mas mahabang sulat-kamay" },
          { en: "A new topic", fil: "Bagong topic" }
        ],
        answer: 0,
        explain: {
          en: "Application turns knowledge into legal reasoning.",
          fil: "Ginagawa ng application na legal reasoning ang knowledge."
        }
      },
      {
        prompt: {
          en: "Which final-check habit fits identification answers?",
          fil: "Aling final-check habit ang bagay sa identification answers?"
        },
        options: [
          { en: "Check exact term and qualifier", fil: "Suriin ang exact term at qualifier" },
          { en: "Add an unrelated case", fil: "Magdagdag ng walang kaugnayang case" },
          { en: "Make every answer longer", fil: "Pahabain lahat ng sagot" },
          { en: "Erase short answers", fil: "Burahin ang maikling sagot" }
        ],
        answer: 0,
        explain: {
          en: "Identification rewards precision more than length.",
          fil: "Mas binibigyan ng puntos ng identification ang precision kaysa haba."
        }
      },
      {
        prompt: {
          en: "What does PACE remind you to do at the end?",
          fil: "Ano ang paalala ng PACE sa huli?"
        },
        options: [
          { en: "Check and exit calmly", fil: "Mag-check at lumabas nang kalmado" },
          { en: "Start a new essay", fil: "Magsimula ng bagong essay" },
          { en: "Change every answer", fil: "Palitan lahat ng sagot" },
          { en: "Ignore the timer", fil: "Balewalain ang timer" }
        ],
        answer: 0,
        explain: {
          en: "PACE ends with checking details and moving calmly.",
          fil: "Nagtatapos ang PACE sa pag-check ng detalye at kalmadong pag-move on."
        }
      }
    ],
    pairs: [
      {
        term: { en: "CLEAR", fil: "CLEAR" },
        match: { en: "MCQ strategy", fil: "MCQ strategy" }
      },
      {
        term: { en: "SNAP", fil: "SNAP" },
        match: { en: "Identification strategy", fil: "Identification strategy" }
      },
      {
        term: { en: "IRAC", fil: "IRAC" },
        match: { en: "Essay structure", fil: "Essay structure" }
      },
      {
        term: { en: "PACE", fil: "PACE" },
        match: { en: "Final exam rhythm", fil: "Final exam rhythm" }
      }
    ]
  }
];

function text(value, lang) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.en || "";
}

function readProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { quiz: {}, memory: {}, completed: {} };
    return { quiz: {}, memory: {}, completed: {}, ...JSON.parse(raw) };
  } catch {
    return { quiz: {}, memory: {}, completed: {} };
  }
}

function shuffle(items) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function buildCards(pairs) {
  return shuffle(
    pairs.flatMap((pair, index) => [
      { key: `${index}-term`, pairId: index, side: "term" },
      { key: `${index}-match`, pairId: index, side: "match" }
    ])
  );
}

function useAudioEngine() {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const musicRef = useRef(null);

  const ensureContext = useCallback(() => {
    if (!ctxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const master = ctx.createGain();
      master.gain.value = volume;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, [volume]);

  useEffect(() => {
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.setTargetAtTime(volume, ctxRef.current.currentTime, 0.08);
    }
  }, [volume]);

  const stopMusic = useCallback(() => {
    const music = musicRef.current;
    if (!music) return;
    clearInterval(music.interval);
    music.gain.gain.setTargetAtTime(0.0001, music.ctx.currentTime, 0.25);
    window.setTimeout(() => {
      music.oscillators.forEach((osc) => osc.stop());
      musicRef.current = null;
    }, 350);
  }, []);

  const startMusic = useCallback(() => {
    if (musicRef.current) return;
    const ctx = ensureContext();
    const gain = ctx.createGain();
    gain.gain.value = 0.03;
    gain.connect(masterRef.current);

    const oscillators = [0, 1, 2].map(() => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.connect(gain);
      osc.start();
      return osc;
    });

    const chords = [
      [196.0, 246.94, 329.63],
      [174.61, 220.0, 293.66],
      [207.65, 261.63, 329.63],
      [185.0, 233.08, 311.13]
    ];
    let chordIndex = 0;
    const applyChord = () => {
      const chord = chords[chordIndex % chords.length];
      oscillators.forEach((osc, index) => {
        osc.frequency.setTargetAtTime(chord[index], ctx.currentTime, 0.9);
      });
      chordIndex += 1;
    };

    applyChord();
    const interval = window.setInterval(applyChord, 4200);
    musicRef.current = { ctx, gain, oscillators, interval };
  }, [ensureContext]);

  const toggleAudio = useCallback(() => {
    if (enabled) {
      stopMusic();
      setEnabled(false);
      return;
    }
    ensureContext();
    startMusic();
    setEnabled(true);
  }, [enabled, ensureContext, startMusic, stopMusic]);

  const play = useCallback(
    (kind) => {
      if (!enabled || !masterRef.current) return;
      const ctx = ensureContext();
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      const osc = ctx.createOscillator();
      const settings = {
        tap: { freq: 420, type: "triangle", length: 0.07, peak: 0.035 },
        flip: { freq: 520, type: "sine", length: 0.08, peak: 0.045 },
        match: { freq: 660, type: "sine", length: 0.16, peak: 0.06 },
        wrong: { freq: 140, type: "sawtooth", length: 0.16, peak: 0.025 },
        pass: { freq: 784, type: "triangle", length: 0.18, peak: 0.065 },
        unlock: { freq: 988, type: "sine", length: 0.22, peak: 0.07 }
      }[kind] || { freq: 360, type: "sine", length: 0.1, peak: 0.04 };

      osc.type = settings.type;
      osc.frequency.value = settings.freq;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(settings.peak, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + settings.length);
      osc.connect(gain);
      gain.connect(masterRef.current);
      osc.start(now);
      osc.stop(now + settings.length + 0.03);

      if (kind === "unlock") {
        [1.25, 1.5].forEach((multiple, index) => {
          const extraOsc = ctx.createOscillator();
          const extraGain = ctx.createGain();
          extraOsc.type = "sine";
          extraOsc.frequency.value = settings.freq * multiple;
          extraGain.gain.setValueAtTime(0.0001, now + 0.08 * (index + 1));
          extraGain.gain.exponentialRampToValueAtTime(0.04, now + 0.1 * (index + 1));
          extraGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25 + 0.08 * index);
          extraOsc.connect(extraGain);
          extraGain.connect(masterRef.current);
          extraOsc.start(now + 0.08 * (index + 1));
          extraOsc.stop(now + 0.35 + 0.08 * index);
        });
      }
    },
    [enabled, ensureContext]
  );

  useEffect(() => stopMusic, [stopMusic]);

  return { enabled, volume, setVolume, toggleAudio, play };
}

function App() {
  const [lang, setLang] = useState("en");
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(readProgress);
  const audio = useAudioEngine();

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const unlockedIndex = useMemo(() => {
    let index = 0;
    while (index < stages.length && progress.completed[stages[index].id]) {
      index += 1;
    }
    return Math.min(index, stages.length - 1);
  }, [progress.completed]);

  const currentStage = stages[currentStageIndex];
  const isFinalStage = currentStageIndex === stages.length - 1;
  const quizDone = Boolean(progress.quiz[currentStage.id]);
  const memoryDone = Boolean(progress.memory[currentStage.id]);
  const stageDone = Boolean(progress.completed[currentStage.id]);

  const setPartDone = useCallback(
    (part, stageId) => {
      setProgress((previous) => {
        const next = {
          quiz: { ...previous.quiz },
          memory: { ...previous.memory },
          completed: { ...previous.completed }
        };
        next[part][stageId] = true;
        if (next.quiz[stageId] && next.memory[stageId] && !next.completed[stageId]) {
          next.completed[stageId] = true;
          window.setTimeout(() => audio.play("unlock"), 0);
        }
        return next;
      });
    },
    [audio]
  );

  const handleStageSelect = (index) => {
    if (index <= unlockedIndex) {
      setCurrentStageIndex(index);
      audio.play("tap");
    }
  };

  const resetProgress = () => {
    setProgress({ quiz: {}, memory: {}, completed: {} });
    setCurrentStageIndex(0);
    audio.play("tap");
  };

  const openNext = () => {
    const nextIndex = Math.min(currentStageIndex + 1, stages.length - 1);
    setCurrentStageIndex(nextIndex);
    audio.play("tap");
  };

  return (
    <main className="app-shell">
      <aside className="lesson-map" aria-label={ui[lang].lessonMap}>
        <div className="map-card">
          <div className="map-title">
            <Scale aria-hidden="true" />
            <span>Law Phone</span>
          </div>
          <div className="map-progress" aria-label={`${ui[lang].progress} ${unlockedIndex + 1} of ${stages.length}`}>
            <span style={{ width: `${((unlockedIndex + 1) / stages.length) * 100}%` }} />
          </div>
          <div className="stage-list">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const unlocked = index <= unlockedIndex;
              const complete = Boolean(progress.completed[stage.id]);
              return (
                <button
                  className={`stage-button ${currentStageIndex === index ? "active" : ""}`}
                  key={stage.id}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => handleStageSelect(index)}
                >
                  <span className={`stage-icon ${stage.color}`}>
                    {unlocked ? <Icon aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}
                  </span>
                  <span>
                    <strong>{text(stage.title, lang)}</strong>
                    <small>{complete ? ui[lang].open : unlocked ? ui[lang].stage : ui[lang].locked}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <section className="phone-shell" aria-label="Law Phone lesson">
        <div className="phone-speaker" aria-hidden="true" />
        <div className="phone-screen">
          <header className="phone-topbar">
            <div className="status-line">
              <span>LAW 5G</span>
              <span className="status-icons">
                <BatteryMedium aria-hidden="true" />
              </span>
            </div>
            <div className="app-toolbar">
              <div>
                <p className="eyebrow">Exam OS</p>
                <h1>{text(currentStage.title, lang)}</h1>
              </div>
              <div className="toolbar-actions">
                <button
                  className="icon-button"
                  type="button"
                  aria-label={audio.enabled ? ui[lang].soundOn : ui[lang].soundOff}
                  onClick={audio.toggleAudio}
                >
                  {audio.enabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
                </button>
                <button className="icon-button" type="button" aria-label={ui[lang].reset} onClick={resetProgress}>
                  <RotateCcw aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="quick-controls">
              <div className="segmented" aria-label={ui[lang].language}>
                <button type="button" className={lang === "en" ? "selected" : ""} onClick={() => setLang("en")}>
                  EN
                </button>
                <button type="button" className={lang === "fil" ? "selected" : ""} onClick={() => setLang("fil")}>
                  FIL
                </button>
              </div>
              <label className="volume-control">
                <span>{audio.enabled ? ui[lang].soundOn : ui[lang].soundOff}</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audio.volume}
                  onChange={(event) => audio.setVolume(Number(event.target.value))}
                  aria-label="Volume"
                />
              </label>
            </div>
          </header>

          <nav className="mobile-stage-tabs" aria-label={ui[lang].lessonMap}>
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const unlocked = index <= unlockedIndex;
              return (
                <button
                  key={stage.id}
                  type="button"
                  disabled={!unlocked}
                  className={currentStageIndex === index ? "active" : ""}
                  onClick={() => handleStageSelect(index)}
                  aria-label={text(stage.title, lang)}
                >
                  {unlocked ? <Icon aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}
                </button>
              );
            })}
          </nav>

          <div className="screen-scroll">
            <StageHero stage={currentStage} lang={lang} index={currentStageIndex} />
            <SlideDeck stage={currentStage} lang={lang} audio={audio} />
            {currentStage.practice ? <PracticeLab practice={currentStage.practice} lang={lang} audio={audio} /> : null}
            <QuizGate
              stage={currentStage}
              lang={lang}
              passed={quizDone}
              onPassed={() => setPartDone("quiz", currentStage.id)}
              audio={audio}
            />
            <MemoryMatch
              stage={currentStage}
              lang={lang}
              cleared={memoryDone}
              onCleared={() => setPartDone("memory", currentStage.id)}
              audio={audio}
            />
            <DoorPanel
              lang={lang}
              quizDone={quizDone}
              memoryDone={memoryDone}
              stageDone={stageDone}
              isFinalStage={isFinalStage}
              onNext={openNext}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function StageHero({ stage, lang, index }) {
  const Icon = stage.icon;
  return (
    <section className={`stage-hero ${stage.color}`}>
      <div className="stage-hero-icon">
        <Icon aria-hidden="true" />
      </div>
      <div>
        <p className="eyebrow">
          {ui[lang].stage} {index + 1}
        </p>
        <h2>{text(stage.kicker, lang)}</h2>
        <p>{text(stage.hook, lang)}</p>
      </div>
    </section>
  );
}

function SlideDeck({ stage, lang, audio }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = stage.slides[slideIndex];

  useEffect(() => {
    setSlideIndex(0);
  }, [stage.id]);

  const move = (direction) => {
    const next = Math.max(0, Math.min(stage.slides.length - 1, slideIndex + direction));
    setSlideIndex(next);
    audio.play("tap");
  };

  return (
    <section className="lesson-section">
      <div className="section-heading">
        <span className="section-icon">
          <BookOpen aria-hidden="true" />
        </span>
        <span>{text(slide.title, lang)}</span>
      </div>
      <div className="slide-panel">
        <p>{text(slide.body, lang)}</p>
        <div className="memory-hook">
          <Brain aria-hidden="true" />
          <strong>{text(slide.acronym, lang)}</strong>
        </div>
        <FactStrip facts={slide.facts} lang={lang} />
      </div>
      <div className="slide-controls">
        <button type="button" className="ghost-button" onClick={() => move(-1)} disabled={slideIndex === 0}>
          <ChevronLeft aria-hidden="true" />
          {ui[lang].previous}
        </button>
        <span>
          {slideIndex + 1}/{stage.slides.length}
        </span>
        <button
          type="button"
          className="ghost-button"
          onClick={() => move(1)}
          disabled={slideIndex === stage.slides.length - 1}
        >
          {ui[lang].next}
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function FactStrip({ facts, lang }) {
  const [activeFact, setActiveFact] = useState(0);
  const fact = facts[activeFact] || facts[0];

  useEffect(() => {
    setActiveFact(0);
  }, [facts]);

  return (
    <div className="fact-strip">
      <div className="fact-buttons">
        {facts.map((item, index) => (
          <button
            key={text(item.label, "en")}
            type="button"
            className={activeFact === index ? "active" : ""}
            onFocus={() => setActiveFact(index)}
            onMouseEnter={() => setActiveFact(index)}
            onClick={() => setActiveFact(index)}
          >
            <Lightbulb aria-hidden="true" />
            {text(item.label, lang)}
          </button>
        ))}
      </div>
      <div className="fact-detail">
        <CircleHelp aria-hidden="true" />
        <span>
          <strong>{ui[lang].fact}: </strong>
          {text(fact.detail, lang)}
        </span>
      </div>
    </div>
  );
}

function PracticeLab({ practice, lang, audio }) {
  if (practice.type === "identification") {
    return <IdentificationPractice practice={practice} lang={lang} audio={audio} />;
  }
  if (practice.type === "essay") {
    return <EssayPractice practice={practice} lang={lang} audio={audio} />;
  }
  if (practice.type === "eliminate") {
    return <EliminatePractice practice={practice} lang={lang} audio={audio} />;
  }
  return null;
}

function EliminatePractice({ practice, lang, audio }) {
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(false);
  const correctSelection =
    selected.length === practice.options.filter((option) => option.trap).length &&
    selected.every((index) => practice.options[index].trap);

  const toggle = (index) => {
    setChecked(false);
    setSelected((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index]));
    audio.play("tap");
  };

  const check = () => {
    setChecked(true);
    audio.play(correctSelection ? "match" : "wrong");
  };

  return (
    <section className="lesson-section practice-section">
      <div className="section-heading">
        <span className="section-icon">
          <Sparkles aria-hidden="true" />
        </span>
        <span>{text(practice.title, lang)}</span>
      </div>
      <p className="practice-prompt">{text(practice.prompt, lang)}</p>
      <div className="trap-grid">
        {practice.options.map((option, index) => (
          <button
            key={text(option.text, "en")}
            type="button"
            className={`${selected.includes(index) ? "selected" : ""} ${
              checked && option.trap ? "correct" : checked && selected.includes(index) ? "wrong" : ""
            }`}
            onClick={() => toggle(index)}
          >
            {checked && option.trap ? <Check aria-hidden="true" /> : <X aria-hidden="true" />}
            {text(option.text, lang)}
          </button>
        ))}
      </div>
      <button type="button" className="primary-button" onClick={check}>
        <Check aria-hidden="true" />
        {ui[lang].checkAnswer}
      </button>
      {checked ? (
        <p className={correctSelection ? "result good" : "result bad"}>
          {correctSelection ? ui[lang].correct : ui[lang].notYet}
        </p>
      ) : null}
    </section>
  );
}

function IdentificationPractice({ practice, lang, audio }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);

  const check = () => {
    const normalized = value.trim().toLowerCase();
    const correct = practice.answers.some((answer) => answer.toLowerCase() === normalized);
    setResult(correct);
    audio.play(correct ? "match" : "wrong");
  };

  return (
    <section className="lesson-section practice-section">
      <div className="section-heading">
        <span className="section-icon">
          <KeyRound aria-hidden="true" />
        </span>
        <span>{text(practice.title, lang)}</span>
      </div>
      <p className="practice-prompt">{text(practice.prompt, lang)}</p>
      <label className="answer-field">
        <span>{ui[lang].answer}</span>
        <input value={value} onChange={(event) => setValue(event.target.value)} placeholder={text(practice.hint, lang)} />
      </label>
      <button type="button" className="primary-button" onClick={check}>
        <Check aria-hidden="true" />
        {ui[lang].checkAnswer}
      </button>
      {result !== null ? <p className={result ? "result good" : "result bad"}>{result ? ui[lang].correct : ui[lang].notYet}</p> : null}
    </section>
  );
}

function EssayPractice({ practice, lang, audio }) {
  const [answers, setAnswers] = useState({});
  const completed = practice.fields.filter((field) => (answers[field.key] || "").trim().length > 8).length;

  useEffect(() => {
    if (completed === practice.fields.length) {
      audio.play("pass");
    }
  }, [audio, completed, practice.fields.length]);

  return (
    <section className="lesson-section practice-section">
      <div className="section-heading">
        <span className="section-icon">
          <FileText aria-hidden="true" />
        </span>
        <span>{text(practice.title, lang)}</span>
      </div>
      <p className="scenario">{text(practice.scenario, lang)}</p>
      <div className="essay-meter" aria-label={`${ui[lang].essayMeter}: ${completed} of ${practice.fields.length}`}>
        <span style={{ width: `${(completed / practice.fields.length) * 100}%` }} />
      </div>
      <div className="essay-fields">
        {practice.fields.map((field) => (
          <label key={field.key} className="answer-field">
            <span>{text(field.label, lang)}</span>
            <textarea
              value={answers[field.key] || ""}
              onChange={(event) => setAnswers((current) => ({ ...current, [field.key]: event.target.value }))}
              placeholder={text(field.placeholder, lang)}
              rows="2"
            />
          </label>
        ))}
      </div>
      <p className="result neutral">
        {completed}/{practice.fields.length} {ui[lang].allSet}
      </p>
    </section>
  );
}

function QuizGate({ stage, lang, passed, onPassed, audio }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setMessage("");
  }, [stage.id]);

  const score = stage.quiz.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
  const allAnswered = stage.quiz.every((_, index) => answers[index] !== undefined);
  const didPass = score >= stage.passScore;

  const selectAnswer = (questionIndex, optionIndex) => {
    setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }));
    setMessage("");
    audio.play("tap");
  };

  const submit = () => {
    if (!allAnswered) {
      setMessage(ui[lang].chooseAll);
      audio.play("wrong");
      return;
    }
    setSubmitted(true);
    if (didPass) {
      onPassed();
      audio.play("pass");
    } else {
      audio.play("wrong");
    }
  };

  const retry = () => {
    setAnswers({});
    setSubmitted(false);
    setMessage("");
    audio.play("tap");
  };

  return (
    <section className="lesson-section quiz-section">
      <div className="section-heading">
        <span className="section-icon">
          <DoorClosed aria-hidden="true" />
        </span>
        <span>{ui[lang].quizGate}</span>
      </div>
      <div className={`gate-summary ${passed ? "passed" : ""}`}>
        <span>
          {ui[lang].pass}: {stage.passScore}/{stage.quiz.length}
        </span>
        <strong>
          {ui[lang].score}: {submitted || passed ? score : "-"}
        </strong>
      </div>
      <div className="question-list">
        {stage.quiz.map((question, questionIndex) => (
          <article key={text(question.prompt, "en")} className="question-card">
            <h3>{text(question.prompt, lang)}</h3>
            <div className="option-list">
              {question.options.map((option, optionIndex) => {
                const selected = answers[questionIndex] === optionIndex;
                const correct = question.answer === optionIndex;
                return (
                  <button
                    key={text(option, "en")}
                    type="button"
                    className={`${selected ? "selected" : ""} ${submitted && correct ? "correct" : ""} ${
                      submitted && selected && !correct ? "wrong" : ""
                    }`}
                    onClick={() => selectAnswer(questionIndex, optionIndex)}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                    <span>{text(option, lang)}</span>
                  </button>
                );
              })}
            </div>
            {submitted ? <p className="explain">{text(question.explain, lang)}</p> : null}
          </article>
        ))}
      </div>
      {message ? <p className="result bad">{message}</p> : null}
      <div className="gate-actions">
        {passed ? (
          <span className="passed-badge">
            <Check aria-hidden="true" />
            {ui[lang].quizPassed}
          </span>
        ) : (
          <button type="button" className="primary-button" onClick={submit}>
            <Check aria-hidden="true" />
            {ui[lang].submit}
          </button>
        )}
        {submitted && !didPass && !passed ? (
          <button type="button" className="ghost-button" onClick={retry}>
            <RotateCcw aria-hidden="true" />
            {ui[lang].retry}
          </button>
        ) : null}
      </div>
    </section>
  );
}

function MemoryMatch({ stage, lang, cleared, onCleared, audio }) {
  const [cards, setCards] = useState(() => buildCards(stage.pairs));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [busy, setBusy] = useState(false);
  const clearedRef = useRef(false);

  const resetCards = useCallback(() => {
    setCards(buildCards(stage.pairs));
    setFlipped([]);
    setMatched([]);
    setBusy(false);
    clearedRef.current = false;
    audio.play("tap");
  }, [audio, stage.pairs]);

  useEffect(() => {
    resetCards();
  }, [stage.id]);

  useEffect(() => {
    if (matched.length === stage.pairs.length && !clearedRef.current) {
      clearedRef.current = true;
      onCleared();
      audio.play("pass");
    }
  }, [audio, matched.length, onCleared, stage.pairs.length]);

  const flip = (card) => {
    if (busy || flipped.includes(card.key) || matched.includes(card.pairId)) return;
    audio.play("flip");
    const nextFlipped = [...flipped, card.key];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      const first = cards.find((item) => item.key === nextFlipped[0]);
      const second = cards.find((item) => item.key === nextFlipped[1]);
      if (first.pairId === second.pairId) {
        window.setTimeout(() => {
          setMatched((current) => [...current, first.pairId]);
          setFlipped([]);
          audio.play("match");
        }, 250);
      } else {
        setBusy(true);
        window.setTimeout(() => {
          setFlipped([]);
          setBusy(false);
          audio.play("wrong");
        }, 750);
      }
    }
  };

  return (
    <section className="lesson-section memory-section">
      <div className="section-heading">
        <span className="section-icon">
          <Brain aria-hidden="true" />
        </span>
        <span>{ui[lang].memoryGate}</span>
      </div>
      <div className="memory-status">
        <span>
          {ui[lang].match}: {matched.length}/{stage.pairs.length}
        </span>
        {cleared ? (
          <span className="passed-badge small">
            <Check aria-hidden="true" />
            {ui[lang].memoryCleared}
          </span>
        ) : null}
      </div>
      <div className="memory-grid">
        {cards.map((card) => {
          const pair = stage.pairs[card.pairId];
          const isOpen = flipped.includes(card.key) || matched.includes(card.pairId);
          return (
            <button
              key={card.key}
              type="button"
              className={`memory-card ${isOpen ? "open" : ""} ${matched.includes(card.pairId) ? "matched" : ""}`}
              onClick={() => flip(card)}
              aria-pressed={isOpen}
            >
              <span className="card-back">
                <Scale aria-hidden="true" />
              </span>
              <span className="card-face">{text(pair[card.side], lang)}</span>
            </button>
          );
        })}
      </div>
      <button type="button" className="ghost-button block" onClick={resetCards}>
        <RotateCcw aria-hidden="true" />
        {ui[lang].flipAgain}
      </button>
    </section>
  );
}

function DoorPanel({ lang, quizDone, memoryDone, stageDone, isFinalStage, onNext }) {
  let line = ui[lang].needsQuiz;
  if (quizDone && !memoryDone) line = ui[lang].needsMemory;
  if (stageDone) line = isFinalStage ? ui[lang].finalDoor : ui[lang].doorOpen;

  return (
    <section className={`door-panel ${stageDone ? "open" : ""}`}>
      <div className="door-visual" aria-hidden="true">
        {stageDone ? <DoorOpen /> : <DoorClosed />}
      </div>
      <div>
        <h2>{stageDone ? (isFinalStage ? ui[lang].complete : ui[lang].open) : ui[lang].locked}</h2>
        <p>{line}</p>
      </div>
      {!isFinalStage ? (
        <button type="button" className="primary-button" disabled={!stageDone} onClick={onNext}>
          <DoorOpen aria-hidden="true" />
          {ui[lang].nextDoor}
        </button>
      ) : null}
    </section>
  );
}

export default App;

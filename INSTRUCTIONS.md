# Master Prompt & System Architecture Instructions

This document provides a **generic, subject-agnostic prompt template** to transform any lecture materials, slides, or course content into a mobile-first, stage-locked interactive learning app. It also documents the **failure points and post-mortem lessons** learned during development.

---

## 📜 Part 1: Generic Master Prompt Template (For Any Subject)

> **Copy & paste this prompt whenever you want to convert any course material (History, Science, Math, Literature, Medicine) into an interactive mobile learning app:**

```markdown
# MASTER PROMPT: Gamified Mobile-First Interactive Learning Odyssey

Convert the provided course materials/slides into a mobile-first, stage-locked interactive learning app using React, Tailwind CSS, and Lucide Icons.

---

## 1. 🔑 Stage-Locked Door Progression System
- Divide the curriculum into 4–6 logical **Stages** ending with a **Final Boss Master Exam**.
- Each stage must remain **LOCKED** with a glowing door icon until the student scores at least 80% on the **Stage Door Checkpoint Quiz**.

---

## 2. 📱 Mobile-First Ergonomics & Shell Design
- **Viewport**: Design inside a phone container shell (`max-w-[480px]`) centered on screen.
- **Touch Targets**: All buttons, cards, and options MUST have a minimum height of **48px** (`min-h-[48px]`), generous padding, and `whitespace-normal break-words` to prevent text truncation on small phone screens.
- **Bottom Navigation Dock**: Include a fixed glassmorphism mobile dock with tabs:
  1. 📖 **Lessons** (Story Reel Slide Cards)
  2. 🧭 **Story** (Time-Travel / Narrative Character Dialogue)
  3. 🧠 **Match** (3D Memory Card Game)
  4. ⚡ **Lab Sims** (Interactive Mini-Simulators)
  5. 🔑 **Door Quiz** (Stage Checkpoint Exams)

---

## 3. 🌐 Dual-Language Support (Bilingual Toggle)
- Include a **Language Switcher Toggle (`EN` 🌐 `TL`)** in the top header bar AND inside the Quiz Modal.
- All slides, bullet points, hover gossip, hints, story briefings, quiz questions, feedback, and graduation certificates MUST seamlessly translate between English and Tagalog (or target language).

---

## 4. 🧠 High Engagement & Memorability Features
- 💡 **Hover Secret Fact Chips**: Interactive chips on slides that play a sound and open an animated gossip drawer with surprising historical/scientific secrets.
- 🧠 **Mnemonic Acronym Vault**: Include catchy acronyms for core concepts (e.g. S.H.I.F.T., B.A.C.O.N.).
- 😂 **Subject Jokes**: Integrated subject-related humor and puns.
- 🎮 **3D Memory Matching Flip Card Game**: 16 cards matching Key Figures/Terms ↔ Discoveries/Definitions with 3D flip CSS (`perspective: 1000px; transform-style: preserve-3d; backface-visibility: hidden`).

---

## 5. 📝 Comprehensive Exam Checkpoints (3 Question Formats)
Each Stage Door Checkpoint Quiz MUST support:
1. **Multiple Choice Questions (MCQ)**: Instant explanation feedback.
2. **Identification Questions**: Type-in term recognition with case-insensitive matching.
3. **Essay / Reflection Prompts**: Open-ended student written prompts with key-concept checklist evaluation, word counters, and sample top-mark breakdowns.
4. **💡 Universal Clue / Hint Button**: A prominent glowing button on EVERY question type that reveals helpful clues without giving away the exact answer.

---

## 6. 🔊 Audio Sound Effects Management
- Use Web Audio API synthesized sound effects (`playSound('flip')`, `match`, `wrong`, `hover`, `unlock`, `fanfare`).
- **Autoplay Unlock**: Automatically resume `AudioContext` on the first user click/keypress to prevent browser audio blocking.
```

---

## ⚠️ Part 2: Points of Failure & Post-Mortem Lessons

| # | Point of Failure | Cause | Technical Fix Implemented |
|---|---|---|---|
| 1 | **Silent Sound Effects** | Web Audio `AudioContext` starts suspended until user interaction. | Added global listener in `soundManager.js` to call `audioCtx.resume()` on first user click. |
| 2 | **Missing Hints in Quizzes** | Hints were hidden behind conditional text links on identification questions only. | Added a glowing `💡 Need a Clue / Hint?` button for **all 3 question formats** (MCQ, Identification, Essay). |
| 3 | **Broken Hover Tooltips** | Hover facts used strict string replacement which broke on minor punctuation differences. | Replaced in-text string replacement with explicit **"Secret: Keyword"** interactive hover chips below bullet points. |
| 4 | **Boring / Passive Slide Reading** | Content lacked narrative framing or character agency. | Created `StoryIntroModal.jsx` featuring a **Time-Travel Detective storyline** with character dialogues and choices. |
| 5 | **Desktop-First vs Mobile Viewport** | Initial layout used desktop multi-column grids instead of phone ergonomics. | Redesigned into `mobile-app-shell` (`max-w-[480px]`) with a bottom mobile dock (`MobileNav.jsx`) and story progress bars. |
| 6 | **Non-Flipping Memory Cards** | 3D CSS classes were used as utility names without standard CSS rule definitions. | Added custom CSS rules for `-webkit-backface-visibility: hidden`, `preserve-3d`, and `rotateY(180deg)` in `index.css`. |
| 7 | **Missing Quiz Language Toggle** | Language state was set globally but quiz modal lacked an in-modal language switcher. | Added an `EN` / `TL` toggle button directly inside `CheckpointExam.jsx` header bar. |

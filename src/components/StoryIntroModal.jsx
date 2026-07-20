import React from 'react';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/soundManager';

const STAGE_STORIES = {
  en: {
    1: {
      title: "Mission 1: The Dark Age of Dogma",
      year: "Year 1540 — Renaissance Europe",
      avatar: "📜",
      character: "Master Chronicler",
      dialogue: "Welcome, Time-Travel Detective! For nearly 2,000 years, mankind has been trapped in a web of ancient Greek doctrines. Aristotle said Earth sits motionlessly at the center of the universe, and nobody dares to test it with real experiments! Your mission: inspect the 4 sparks that will ignite the Revolution!",
      choices: ["Let's break the 2,000-year silence!", "Tell me more about the ancient Greek dogma!"]
    },
    2: {
      title: "Mission 2: Secret Rendezvous in the Shadows",
      year: "Year 1543 — From Poland to Rome",
      avatar: "☀️",
      character: "Nicolaus Copernicus & Giordano Bruno",
      dialogue: "Psst! Come inside quickly! On my deathbed here in 1543, I have finished 'De Revolutionibus'. Earth is NOT the center of the universe—the SUN IS! But beware: the Inquisition is watching. Giordano Bruno is already preaching that stars are distant suns with endless exoplanets!",
      choices: ["Dethrone Earth and position the Sun at the center!", "Protect Copernicus' secret manuscript!"]
    },
    3: {
      title: "Mission 3: The Telescope & The Codebreaker",
      year: "Year 1610 — Venice & Paris",
      avatar: "🔭",
      character: "Galileo Galilei & François Viète",
      dialogue: "Look through this spyglass! I just turned it toward Jupiter and saw 4 tiny moons orbiting it! That proves NOT everything revolves around Earth! Meanwhile in Paris, François Viète is using vowels as unknown variables to rewrite all of mathematics!",
      choices: ["Peer through Galileo's telescope!", "Help Viète solve algebraic equations!"]
    },
    4: {
      title: "Mission 4: The Mercury Tube & The Mechanical Heart",
      year: "Year 1628 — Florence & London",
      avatar: "🧪",
      character: "Francis Bacon, Torricelli & William Harvey",
      dialogue: "Stand back! Evangelista Torricelli is about to flip a 1.2-meter tube filled with heavy mercury into a dish! If mercury drops, it will create a VACUUM—something Aristotle swore was impossible! Over in London, Dr. William Harvey is proving the heart is a mechanical pump!",
      choices: ["Measure the vacuum space with Torricelli!", "Examine Harvey's heart pump model!"]
    },
    5: {
      title: "Mission 5: The Grand Council of Revolutionaries",
      year: "Year 1687 — Time-Transcendent Academy",
      avatar: "🎓",
      character: "The Scientific Council",
      dialogue: "You have traveled across two centuries, witnessed planetary orbits, decoded symbolic algebra, and measured atmospheric pressure. The Grand Council now calls upon you for the final trial. Are you ready to earn your Certificate of Scientific Mastery?",
      choices: ["I am ready for the Final Boss Exam!", "Review the lecture notes one last time!"]
    }
  },
  tl: {
    1: {
      title: "Misyon 1: Ang Panahon ng Lumang Paniniwala",
      year: "Taong 1540 — Renaissance Europe",
      avatar: "📜",
      character: "Taga-tala ng Kasaysayan",
      dialogue: "Maligayang pagdating, Time-Travel Detective! Sa loob ng halos 2,000 taon, ang tao ay nakulong sa mga lumang aral ng Griyego. Sinabi ni Aristotle na ang Daigdig ay hindi gumagalaw sa gitna ng sansinukob, at walang sinumang nangahas na subukan ito sa totoong eksperimento! Misyon mo: suriin ang 4 na spark na magpapasiklab sa Rebolusyon!",
      choices: ["Basagin natin ang 2,000 taong katahimikan!", "Ikuwento pa ang tungkol sa lumang aral!"]
    },
    2: {
      title: "Misyon 2: Lihim na Pagkikita sa Dilim",
      year: "Taong 1543 — Mula Poland hanggang Roma",
      avatar: "☀️",
      character: "Nicolaus Copernicus at Giordano Bruno",
      dialogue: "Psst! Pumasok ka nang mabilis! Sa aking higaan bago mamatay ngayong 1543, natapos ko na ang 'De Revolutionibus'. HINDI ang Earth ang gitna ng sansinukob—ang ARAW ang nasa gitna! Ngunit mag-ingat: nagmamasid ang Inquisition. Ipinapangaral na ni Giordano Bruno na ang mga bituin ay mga malalayong Araw!",
      choices: ["Ilagay ang Araw sa gitna!", "Protektahan ang lihim na libro ni Copernicus!"]
    },
    3: {
      title: "Misyon 3: Ang Teleskopyo at Ang Codebreaker",
      year: "Taong 1610 — Venice at Paris",
      avatar: "🔭",
      character: "Galileo Galilei at François Viète",
      dialogue: "Sumilip ka sa teleskopyong ito! Nakita ko lang ang 4 na buwan na umiikot sa Jupiter! Patunay ito na HINDI lahat ay umiikot sa Earth! Samantala sa Paris, ginagamit ni François Viète ang mga vowels bilang unknowns para isulat ang algebra!",
      choices: ["Sumilip sa teleskopyo ni Galileo!", "Tulungan si Viète sa mga equation!"]
    },
    4: {
      title: "Misyon 4: Ang Tubo ng Mercury at ang Bomba ng Puso",
      year: "Taong 1628 — Florence at London",
      avatar: "🧪",
      character: "Francis Bacon, Torricelli at William Harvey",
      dialogue: "Mabilis na lumayo! Baliktarin ni Evangelista Torricelli ang 1.2-meter na tubong puno ng mercury sa isang lalagyan! Kapag bumaba ang mercury, gagawa ito ng VACUUM! Sa London naman, pinapatunayan ni Dr. William Harvey na ang puso ay isang bomba!",
      choices: ["Sukatin ang vacuum kasama si Torricelli!", "Suriin ang bomba ng puso ni Harvey!"]
    },
    5: {
      title: "Misyon 5: Ang Dakilang Kapulungan ng mga Siyentipiko",
      year: "Taong 1687 — Kapulungan ng Agham",
      avatar: "🎓",
      character: "Ang Kapulungan ng Siyentipiko",
      dialogue: "Naglakbay ka sa dalawang siglo, nakakita ng galaw ng planeta, nag-solve ng algebra, at nagsukat ng presyon ng hangin. Tinatawag ka na ng Dakilang Kapulungan para sa huling pagsubok. Handa ka na bang makuha ang iyong Sertipiko ng Kaalaman?",
      choices: ["Handa na ako sa Huling Exam!", "Mag-review muna ng lecture notes!"]
    }
  }
};

export default function StoryIntroModal({ stageId, lang = 'en', onClose }) {
  const langStories = STAGE_STORIES[lang] || STAGE_STORIES.en;
  const story = langStories[stageId] || langStories[1];

  const handleSelectChoice = () => {
    playSound('unlock');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="glass-panel max-w-md w-full rounded-3xl border-2 border-purple-500/40 p-5 shadow-2xl relative animate-fade-in space-y-4">
        
        {/* Header Tag */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 bg-amber-950 border border-amber-500/40 text-amber-300 text-[10px] font-black rounded-full uppercase tracking-wider">
              {story.year}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Stage {stageId} Briefing</span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-[11px] font-bold px-2 py-0.5 bg-slate-900 rounded-lg"
          >
            ✕
          </button>
        </div>

        {/* Character Dialogue Box */}
        <div className="flex items-start gap-3 bg-slate-900/90 rounded-2xl p-4 border border-purple-500/30">
          <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-2xl shrink-0 shadow-lg">
            {story.avatar}
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-amber-400 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              {story.character}
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              "{story.dialogue}"
            </p>
          </div>
        </div>

        {/* Story Choices */}
        <div className="space-y-2 pt-1">
          <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">
            {lang === 'tl' ? 'Pumili ng Aksyon:' : 'Choose Your Directive:'}
          </span>
          {story.choices.map((choice, i) => (
            <button
              key={i}
              onClick={handleSelectChoice}
              className="w-full p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/60 text-xs font-bold text-slate-100 flex items-center justify-between transition-all touch-active"
            >
              <span>{choice}</span>
              <ArrowRight className="w-4 h-4 text-purple-400" />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

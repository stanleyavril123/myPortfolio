import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import englishData from "../data.json";
import frenchData from "./fr.json";
import { messages } from "./messages";

const storageKey = "portfolio-language";
const dates = { Jan: "janv.", Feb: "févr.", Mar: "mars", Apr: "avr.", May: "mai", Jun: "juin", Jul: "juil.", Aug: "août", Sep: "sept.", Oct: "oct.", Nov: "nov.", Dec: "déc.", Present: "Aujourd’hui" };
const terms = {
  Languages: "Langages", "Systems & Network": "Systèmes et réseaux", Frontend: "Interface web", Backend: "Serveur", "Data & AI": "Données et IA", "DevOps & Tools": "DevOps et outils", "Tools & Testing": "Outils et tests",
  "Responsive UI": "Interfaces adaptatives", "Data pipelines": "Pipelines de données", "Data processing": "Traitement des données", Timers: "Minuteries", "State machines": "Machines à états", "Google Calendar": "Google Agenda",
};

export function localizeProject(project, language) {
  if (!project) return project;
  const sourceTitle = project.sourceTitle || project.title;
  const source = englishData.projects.find(item => item.title === sourceTitle) || project;
  const translated = language === "fr" ? frenchData.projects[sourceTitle] || {} : {};
  return {
    ...project, ...source, ...translated, sourceTitle,
    date: language === "fr" ? source.date.replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Present)\b/g, word => dates[word]) : source.date,
    stack: source.stack.map(term => language === "fr" ? terms[term] || term : term),
    link: source.link ? [source.link[0], messages[language].repo] : undefined,
  };
}

function localizedData(language) {
  if (language === "en") return englishData;
  return {
    ...englishData,
    contact: { ...englishData.contact, ...frenchData.contact },
    about: frenchData.about,
    experience: englishData.experience.map((item, index) => ({ ...item, ...frenchData.experience[index], date: item.date.replace(/\b(May|Aug|Present)\b/g, word => dates[word]) })),
    skills: englishData.skills.map(group => ({ category: terms[group.category] || group.category, items: group.items.map(item => terms[item] || item) })),
    projects: englishData.projects.map(project => localizeProject(project, language)),
  };
}

const LanguageContext = createContext({ language: "en", toggleLanguage: () => {}, data: englishData, ui: messages.en });
export const useLanguage = () => useContext(LanguageContext);

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem(storageKey) === "fr" ? "fr" : "en"; } catch { return "en"; }
  });
  const toggleLanguage = useCallback(() => setLanguage(current => current === "en" ? "fr" : "en"), []);
  const value = useMemo(() => ({ language, toggleLanguage, data: localizedData(language), ui: messages[language] }), [language, toggleLanguage]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = messages[language].pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", messages[language].pageDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", messages[language].pageTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", messages[language].pageDescription);
    try { localStorage.setItem(storageKey, language); } catch {}
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

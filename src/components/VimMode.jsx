import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Dialog, Link, Portal } from "@mui/material";
import { useLanguage } from "../locales/LanguageProvider";

const dotfilesUrl = "https://github.com/stanleyavril123/dotfiles";
const mono = '"Courier New", Courier, monospace';
const discoverEvent = "portfolio:open-hidden-mode";

export function openHiddenMode() {
  window.dispatchEvent(new Event(discoverEvent));
}

function BufferLine({ number, children, heading = false }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "3ch minmax(0, 1fr)", gap: { xs: 2, sm: 3 }, minHeight: "1.8em" }}>
      <Box aria-hidden="true" sx={{ color: "text.disabled", textAlign: "right", userSelect: "none" }}>{number}</Box>
      <Box sx={{ color: heading ? "primary.main" : "text.primary", fontWeight: heading ? 700 : 400, overflowWrap: "anywhere" }}>{children || "\u00a0"}</Box>
    </Box>
  );
}

function CommandBar({ command, invalid = false, fr, floating = false }) {
  return (
    <Box role="status" aria-label={fr ? "Barre de commande Vim" : "Vim command bar"}
      sx={{
        ...(floating ? { position: "fixed", inset: "auto 0 0", zIndex: theme => theme.zIndex.modal + 1, borderTop: "1px solid", borderColor: "divider", boxShadow: "0 -8px 30px rgba(0, 0, 0, 0.12)" } : {}),
        minHeight: floating ? 44 : 32, px: floating ? { xs: 2, sm: 3 } : 2, py: 0.5,
        backgroundColor: "background.default", color: "text.primary", fontFamily: mono,
        fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 1,
        paddingBottom: floating ? "max(4px, env(safe-area-inset-bottom))" : 0.5,
      }}>
      <Box component="span">{command || (fr ? "Lecture seule" : "Read only")}</Box>
      {command && <Box component="span" aria-hidden="true" sx={{ width: "0.6em", height: "1.1em", backgroundColor: "primary.main" }} />}
      {command && <Box component="span" sx={{ ml: "auto", color: invalid ? "warning.main" : "text.secondary", fontSize: "0.72rem", textAlign: "right" }}>
        {invalid ? (fr ? "Commande inconnue" : "Unknown command") : (fr ? "Entrée : exécuter · Échap : annuler" : "Enter: run · Esc: cancel")}
      </Box>}
    </Box>
  );
}

export default function VimMode() {
  const { data, language, toggleLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [buffer, setBuffer] = useState("dotfiles");
  const [command, setCommand] = useState("");
  const [invalidCommand, setInvalidCommand] = useState(false);
  const pending = useRef("");
  const scrollArea = useRef(null);
  const fr = language === "fr";

  useEffect(() => {
    const update = value => {
      pending.current = value;
      setCommand(value);
      setInvalidCommand(false);
    };
    const reset = () => update("");
    const onKeyDown = event => {
      if (event.isComposing || event.ctrlKey || event.metaKey || event.altKey || (event.repeat && !pending.current)) return;
      if (event.target?.closest?.('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]')) {
        reset();
        return;
      }
      if (!open && document.querySelector('[role="dialog"], [role="alertdialog"]')) {
        reset();
        return;
      }
      if (pending.current) {
        if (event.key === "Escape") {
          event.preventDefault();
          reset();
        } else if (event.key === "Backspace") {
          event.preventDefault();
          update(pending.current.slice(0, -1));
        } else if (event.key === "Enter") {
          event.preventDefault();
          const value = pending.current.trim();
          if (value === ":w" || value === ":q") {
            setOpen(value === ":w");
            reset();
          } else {
            setInvalidCommand(true);
          }
        } else if (event.key.length === 1) {
          event.preventDefault();
          update((pending.current + event.key).slice(0, 64));
        }
        return;
      }
      if (event.key === ":") {
        event.preventDefault();
        update(":");
        return;
      }
      if (open && (event.key === "j" || event.key === "k")) {
        event.preventDefault();
        if (scrollArea.current) scrollArea.current.scrollTop += event.key === "j" ? 64 : -64;
      }
      if (open && (event.key === "h" || event.key === "l")) {
        event.preventDefault();
        const nextBuffer = event.key === "h" ? "dotfiles" : "portfolio";
        if (nextBuffer !== buffer && scrollArea.current) scrollArea.current.scrollTop = 0;
        setBuffer(nextBuffer);
      }
    };
    const onDiscover = () => {
      reset();
      setBuffer("dotfiles");
      setOpen(true);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("blur", reset);
    window.addEventListener(discoverEvent, onDiscover);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("blur", reset);
      window.removeEventListener(discoverEvent, onDiscover);
    };
  }, [open, buffer]);

  const closeMode = () => {
    pending.current = "";
    setCommand("");
    setInvalidCommand(false);
    setOpen(false);
  };

  const linkSx = { color: "primary.main", textDecorationColor: "divider", "&:focus-visible": { outline: "2px solid currentColor", outlineOffset: 3 } };
  const tabSx = { fontFamily: mono, textTransform: "none", borderRadius: 0, px: 2, py: 1.5, minWidth: 0, color: "text.secondary", "&:hover": { backgroundColor: "action.hover" } };
  const portfolioLines = [
    { text: `# ${data.contact.name}`, heading: true },
    { text: `${data.contact.role} | ${data.contact.location}` },
    { text: "" },
    ...data.about.about_me.map(text => ({ text })),
    { text: "" },
    { text: fr ? "## Projets" : "## Projects", heading: true },
    ...data.projects.flatMap(project => [{ text: project.title, heading: true }, { text: project.summary }, { text: "" }]),
    { text: fr ? "## Compétences" : "## Skills", heading: true },
    ...data.skills.map(group => ({ text: `${group.category}: ${group.items.join(", ")}` })),
    { text: "" },
    { text: <Link href={`mailto:${data.contact.email}`} sx={linkSx}>{data.contact.email}</Link> },
  ];
  const dotfilesLines = [
    { text: "# ~/dotfiles", heading: true },
    { text: "" },
    { text: fr ? "Bienvenue dans mon coin du terminal." : "Welcome to my corner of the terminal." },
    { text: fr ? "Mes fichiers de configuration vivent ici." : "My personal configuration files live here." },
    { text: "" },
    { text: fr ? "## Le dépôt" : "## Repository", heading: true },
    { text: <Link href={dotfilesUrl} target="_blank" rel="noopener noreferrer" sx={linkSx}>github.com/stanleyavril123/dotfiles ↗</Link> },
    { text: "" },
    { text: "## Clone", heading: true },
    { text: "$ git clone https://github.com/stanleyavril123/dotfiles.git" },
    { text: "$ cd dotfiles" },
    { text: "" },
    { text: "## Navigation", heading: true },
    { text: fr ? "j / k   défiler" : "j / k   scroll" },
    { text: fr ? "h / l   changer d’onglet" : "h / l   switch tabs" },
    { text: fr ? ":q + Entrée   revenir au portfolio" : ":q + Enter   back to the portfolio" },
    { text: fr ? ":w + Entrée   ouvrir ce mode" : ":w + Enter   open this mode" },
  ];
  const lines = buffer === "dotfiles" ? dotfilesLines : portfolioLines;

  return (
    <>
    {!open && command && <Portal><CommandBar command={command} invalid={invalidCommand} fr={fr} floating /></Portal>}
    <Dialog fullScreen open={open} disableEscapeKeyDown aria-labelledby="vim-mode-title"
      PaperProps={{ sx: { backgroundColor: "background.default", color: "text.primary", fontFamily: mono, borderRadius: 0, display: "flex", flexDirection: "column" } }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: { xs: 2, sm: 3 }, py: 1.5, borderBottom: "1px solid", borderColor: "divider", gap: 1 }}>
        <Box id="vim-mode-title" component="h2" sx={{ m: 0, fontSize: "0.9rem", fontWeight: 400, fontFamily: mono }}>~/.config/stanley</Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button onClick={toggleLanguage} aria-label={fr ? "Switch to English" : "Passer en français"} sx={{ ...tabSx, p: 0.75 }}>{language.toUpperCase()}</Button>
          <Button onClick={closeMode} aria-label={fr ? "Quitter le mode caché" : "Exit hidden mode"} sx={{ ...tabSx, p: 0.75 }}>:q</Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", borderBottom: "1px solid", borderColor: "divider" }}>
        {["dotfiles", "portfolio"].map(tab => (
          <Button key={tab} onClick={() => { setBuffer(tab); if (scrollArea.current) scrollArea.current.scrollTop = 0; }} aria-pressed={buffer === tab}
            sx={{ ...tabSx, color: buffer === tab ? "primary.main" : "text.secondary", backgroundColor: buffer === tab ? "action.selected" : "transparent", borderBottom: "2px solid", borderColor: buffer === tab ? "primary.main" : "transparent" }}>{tab}.md</Button>
        ))}
      </Box>
      <Box ref={scrollArea} tabIndex={0} aria-label={buffer === "dotfiles" ? "Dotfiles" : "Portfolio"}
        sx={{ flex: 1, overflowY: "auto", p: { xs: 2, sm: 4 }, fontSize: { xs: "0.8rem", sm: "0.95rem" }, lineHeight: 1.8, "&:focus-visible": { outline: "1px solid", outlineColor: "primary.main", outlineOffset: -1 } }}>
        {lines.map((line, index) => <BufferLine key={`${buffer}-${index}`} number={index + 1} heading={line.heading}>{line.text}</BufferLine>)}
        <Box aria-hidden="true" sx={{ pl: { xs: "5ch", sm: "6ch" }, mt: 2, color: "text.disabled", lineHeight: 2 }}>~<br />~<br />~</Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "background.paper", color: "text.primary", borderTop: "1px solid", borderColor: "divider", fontSize: "0.75rem", minHeight: 30 }}>
        <Box sx={{ backgroundColor: "primary.main", color: "primary.contrastText", fontWeight: 700, px: 2, py: 0.5 }}>NORMAL</Box>
        <Box sx={{ px: 2 }}>{buffer}.md</Box>
        <Button onClick={closeMode} aria-label={fr ? "Quitter (:q)" : "Quit (:q)"}
          sx={{ ...tabSx, ml: "auto", px: 2, py: 0.5, fontSize: "inherit", color: "inherit" }}>:q {fr ? "quitter" : "quit"}</Button>
      </Box>
      <CommandBar command={command} invalid={invalidCommand} fr={fr} />
    </Dialog>
    </>
  );
}

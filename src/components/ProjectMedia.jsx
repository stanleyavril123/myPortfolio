import React, { useState } from "react";
import { Box, Link, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useLanguage } from "../locales/LanguageProvider";
import { radii } from "../styles/shape";

const assetUrl = path => /^https?:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export default function ProjectMedia({ project }) {
  const { ui } = useLanguage();
  const [failed, setFailed] = useState(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { media } = project;
  if (!media) return null;
  const src = assetUrl(media.src);
  const poster = media.poster ? assetUrl(media.poster) : undefined;
  const hideAnimation = reducedMotion && media.kind === "gif";

  return (
    <Box component="figure" sx={{ m: 0, minWidth: 0 }}>
      <Box sx={{ aspectRatio: media.aspectRatio || "16 / 9", borderRadius: radii.preview, overflow: "hidden", backgroundColor: "#101719", border: "1px solid", borderColor: "divider", display: "grid", placeItems: "center" }}>
        {failed || (hideAnimation && !poster) ? (
          <Typography sx={{ color: "#f1f2ef", px: 3, textAlign: "center" }}>{failed ? ui.previewUnavailable : ui.openAnimation}</Typography>
        ) : media.kind === "video" ? (
          <Box component="video" src={src} poster={poster} controls playsInline preload="none" aria-label={`${ui.videoPreview} ${project.title}`}
            onError={() => setFailed(true)} sx={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <Box component="img" src={hideAnimation ? poster : src} alt={`${ui.imagePreview} ${project.title}`} loading="lazy"
            onError={() => setFailed(true)} sx={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} />
        )}
      </Box>
      <Box component="figcaption" sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 1, mt: 1.25 }}>
        <Typography sx={{ fontSize: "0.72rem", fontFamily: "monospace", color: "text.secondary" }}>
          {ui[media.captionKey] || (media.kind === "video" ? ui.recordedDemo : media.kind === "gif" ? ui.animatedDemo : ui.screenshot)}{media.sampleData ? ` · ${ui.sampleFiles}` : ""}
        </Typography>
        <Link href={src} target="_blank" rel="noopener noreferrer" sx={{ fontSize: "0.72rem", display: "inline-flex", alignItems: "center", gap: 0.5 }}>
          {ui.openPreview}<OpenInNewIcon sx={{ fontSize: 13 }} />
        </Link>
        {ui[media.noteKey] && (
          <Typography sx={{ flexBasis: "100%", fontSize: "0.78rem", lineHeight: 1.6, color: "text.secondary" }}>
            {ui[media.noteKey]}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

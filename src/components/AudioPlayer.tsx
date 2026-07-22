"use client";
import { useState, useRef, useEffect } from "react";

interface Props {
  title: string;
  audioUrl?: string;
}

export default function AudioPlayer({ title, audioUrl }: Props) {
  const [playing, setPlaying]   = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onTimeUpdate = () => setProgress(el.currentTime);
    const onLoaded     = () => setDuration(el.duration);
    const onEnded      = () => setPlaying(false);

    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("ended", onEnded);
    };
  }, []);

  function togglePlay() {
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); } else { el.play(); }
    setPlaying((v) => !v);
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Number(e.target.value);
    setProgress(Number(e.target.value));
  }

  function fmt(s: number) {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  return (
    <div className="rounded-2xl border p-4 flex items-center gap-4 mb-6"
         style={{ background:"white", borderColor:"var(--line)" }}>
      {audioUrl && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
      )}

      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        className="shrink-0 w-12 h-12 rounded-full text-white flex items-center justify-center text-xl shadow-md transition-transform active:scale-95"
        style={{ background: "linear-gradient(135deg,#ff7a18,#b23a00)" }}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? "⏸" : "▶"}
      </button>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate" style={{ color:"var(--ink)" }}>
          🎵 {title}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs tabular-nums" style={{ color:"var(--muted)" }}>
            {fmt(progress)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={progress}
            onChange={seek}
            className="flex-1 h-1.5 accent-orange-500 cursor-pointer"
            aria-label="Seek"
          />
          <span className="text-xs tabular-nums" style={{ color:"var(--muted)" }}>
            {fmt(duration)}
          </span>
        </div>
      </div>

      {/* No audio notice */}
      {!audioUrl && (
        <span className="text-xs px-3 py-1 rounded-full"
              style={{ background:"var(--cream-2)", color:"var(--muted)" }}>
          Audio coming soon
        </span>
      )}
    </div>
  );
}

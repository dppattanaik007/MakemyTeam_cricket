import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export default function Header({ theme, onToggleTheme, playerCount }) {
  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-white/10 backdrop-blur-md"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        backgroundColor: "rgba(10, 41, 22, 0.96)",
      }}
      data-testid="app-header"
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <div
            className="relative flex h-12 w-12 shrink-0 items-center justify-center"
            aria-hidden
          >
            {/* Soft orange halo so the logo blends into the dark-green header */}
            <span
              className="absolute inset-0 rounded-full blur-[10px] opacity-45"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, #ff7b2c 0%, rgba(255,123,44,0) 70%)",
              }}
            />
            <img
              src={`${process.env.PUBLIC_URL || ""}/cricmanager-logo.png`}
              alt="CricManager"
              className="relative h-full w-full object-contain drop-shadow-[0_2px_8px_rgba(217,70,31,0.45)]"
              draggable="false"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="font-display text-xl tracking-wide text-[color:var(--brand-cream)] sm:text-[1.45rem]"
              data-testid="app-title"
            >
              Cric<span className="text-[color:var(--brand-orange)]">Manager</span>
            </span>
            <span className="text-[10px] font-medium tracking-wide text-white/65 sm:text-xs">
              From players to perfect teams — instantly.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="hidden rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 sm:inline"
            data-testid="header-player-count"
          >
            {playerCount} {playerCount === 1 ? "player" : "players"}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="rounded-full text-white hover:bg-white/10 hover:text-white"
            data-testid="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

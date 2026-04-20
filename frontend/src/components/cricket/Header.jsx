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
            className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-1 shadow-lg ring-1 ring-white/15"
            aria-hidden
          >
            <img
              src={`${process.env.PUBLIC_URL || ""}/cricmanager-logo.png`}
              alt="CricManager"
              className="h-full w-full object-contain"
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

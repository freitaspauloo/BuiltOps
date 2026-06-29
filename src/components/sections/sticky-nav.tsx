"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";
import type { Community } from "@/lib/types/community";
import { getNavStructure, type NavStructureItem } from "@/lib/sections/nav-groups";
import { LosaniLogo } from "@/components/ui/losani-logo";

type OpenMenu = {
  id: string;
  items: { id: string; label: string }[];
  anchor: DOMRect;
};

function NavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "relative whitespace-nowrap px-3 py-4 text-sm font-medium transition-colors",
        isActive
          ? "text-primary after:absolute after:inset-x-2 after:bottom-2 after:h-0.5 after:bg-primary"
          : "text-body hover:text-foreground",
      )}
    >
      {label}
    </a>
  );
}

export function StickyNav({ community }: { community: Community }) {
  const [active, setActive] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<OpenMenu | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const structure = getNavStructure(community);
  const sectionIds = structure.flatMap((item) =>
    item.type === "link" ? [item.id] : item.items.map((i) => i.id),
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--nav-height", "4.25rem");
    return () => {
      document.documentElement.style.removeProperty("--nav-height");
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -25% 0px", threshold: [0, 0.2, 0.45] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (!openMenu) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (navRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpenMenu(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  useEffect(() => {
    if (!openMenu) return;
    const close = () => setOpenMenu(null);
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("resize", close);
    };
  }, [openMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navigate = (id: string) => {
    setOpenMenu(null);
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleGroup = (item: Extract<NavStructureItem, { type: "group" }>, el: HTMLButtonElement) => {
    if (openMenu?.id === item.id) {
      setOpenMenu(null);
      return;
    }
    setOpenMenu({
      id: item.id,
      items: item.items,
      anchor: el.getBoundingClientRect(),
    });
  };

  const isGroupActive = (groupId: string, ids: string[]) =>
    ids.includes(active) || openMenu?.id === groupId;

  const linkState = (isActive: boolean) =>
    cn(
      "relative whitespace-nowrap px-3 py-4 text-left text-sm font-medium transition-colors lg:py-4 lg:text-center",
      isActive
        ? "text-primary after:absolute after:inset-x-2 after:bottom-2 after:h-0.5 after:bg-primary lg:after:bottom-2"
        : "text-body hover:text-foreground",
    );

  const renderMobileLinks = () => (
    <div className="flex flex-col py-2">
      {structure.map((item) => {
        if (item.type === "link") {
          return (
            <NavLink
              key={item.id}
              href={`#${item.id}`}
              label={item.label}
              isActive={active === item.id}
              onClick={() => setMobileOpen(false)}
            />
          );
        }
        return (
          <div key={item.id} className="border-t border-border">
            <p className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted">
              {item.label}
            </p>
            {item.items.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => navigate(child.id)}
                className={cn(
                  "block w-full px-3 py-3 text-left text-sm font-medium transition-colors",
                  active === child.id ? "text-primary" : "text-body hover:text-foreground",
                )}
              >
                {child.label}
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "relative z-50 mb-3 w-full bg-background transition-[box-shadow,background] duration-300",
          stuck && "sticky top-0 mb-0 border-b border-border/80 bg-background/95 backdrop-blur-md",
        )}
      >
        <nav aria-label="Community sections" className="grid grid-cols-[auto_1fr_auto] items-center gap-2 lg:gap-4">
          <div className="flex shrink-0 items-center py-2">
            <LosaniLogo />
          </div>

          <div className="hidden min-w-0 items-center justify-center lg:flex">
            {structure.map((item) => {
              if (item.type === "link") {
                return (
                  <NavLink
                    key={item.id}
                    href={`#${item.id}`}
                    label={item.label}
                    isActive={active === item.id}
                    onClick={() => setOpenMenu(null)}
                  />
                );
              }

              const childIds = item.items.map((i) => i.id);
              const isActive = isGroupActive(item.id, childIds);
              const isOpen = openMenu?.id === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  onClick={(e) => toggleGroup(item, e.currentTarget)}
                  className={linkState(isActive)}
                >
                  {item.label}
                  <span
                    className={cn(
                      "ml-0.5 inline-block text-[0.65em] text-muted transition-transform",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <button
              type="button"
              className="px-2 py-2 text-sm font-medium text-body lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? "Close" : "Menu"}
            </button>
            <a
              href="#registration"
              onClick={() => {
                setOpenMenu(null);
                setMobileOpen(false);
              }}
              className="bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover lg:px-5"
            >
              Register
            </a>
          </div>
        </nav>

        {mobileOpen && (
          <div
            id="mobile-nav-panel"
            className="border-t border-border bg-background lg:hidden"
          >
            {renderMobileLinks()}
          </div>
        )}
      </header>

      {mounted &&
        openMenu &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            className="fixed z-[300] hidden w-max min-w-[11rem] max-w-[min(16rem,calc(100vw-2rem))] border border-border bg-background py-1 shadow-[var(--shadow-card-hover)] lg:block"
            style={{
              top: openMenu.anchor.bottom + 4,
              left: openMenu.anchor.left + openMenu.anchor.width / 2,
              transform: "translateX(-50%)",
            }}
          >
            {openMenu.items.map((child) => (
              <button
                key={child.id}
                type="button"
                role="menuitem"
                onClick={() => navigate(child.id)}
                className={cn(
                  "block w-full px-4 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary",
                  active === child.id ? "text-primary" : "text-body hover:text-foreground",
                )}
              >
                {child.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

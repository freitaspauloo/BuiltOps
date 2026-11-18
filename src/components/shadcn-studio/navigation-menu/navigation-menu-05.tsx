"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuArrow,
} from "@/components/ui/navigation-menu";
import { ArrowRight, Box, Paintbrush, Sparkles } from "lucide-react";

const products = [
  {
    icon: <Sparkles className="size-5" />,
    label: "Design Tools",
    description: "Powerful tools for creating stunning interfaces",
    href: "#",
  },
  {
    icon: <Box className="size-5" />,
    label: "Component Library",
    description: "Pre-built components ready to use",
    href: "#",
  },
  {
    icon: <Paintbrush className="size-5" />,
    label: "Theme Builder",
    description: "Customize themes and styles effortlessly",
    href: "#",
  },
];

const ctaSection = {
  title: "Start Designing",
  description: "Explore our design system and build faster.",
  buttons: [
    { label: "Browse Components", icon: <ArrowRight className="size-4" />, variant: "primary" as const },
    { label: "Learn More", variant: "secondary" as const },
  ],
};

/** shadcn studio reference — design dropdown (05). */
export default function NavigationMenuDesignDemo() {
  return (
    <div className="flex items-center justify-center">
      <NavigationMenu className="*:last:left-auto md:max-lg:*:last:-left-full lg:*:last:left-0">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="[&>svg]:size-4">Design</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="nav-menu-panel-rich w-70 p-1 sm:w-120 lg:w-135">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1fr]">
                  <div>
                    {products.map((product) => (
                      <NavigationMenuLink
                        className="flex flex-row items-start gap-2 *:[svg]:mt-1 *:[svg]:size-5"
                        href={product.href}
                        key={product.label}
                      >
                        {product.icon}
                        <div>
                          <p className="font-medium">{product.label}</p>
                          <p className="text-muted">{product.description}</p>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4 bg-card p-4">
                    <div className="space-y-1">
                      <h4 className="font-medium">{ctaSection.title}</h4>
                      <p className="text-sm text-muted">{ctaSection.description}</p>
                    </div>
                    <div className="space-y-2">
                      {ctaSection.buttons.map((button) => (
                        <Button
                          key={button.label}
                          href="#"
                          variant={button.variant}
                          className="w-full justify-between"
                        >
                          {button.label}
                          {button.icon}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuPositioner>
          <NavigationMenuPopup>
            <NavigationMenuArrow />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenu>
    </div>
  );
}

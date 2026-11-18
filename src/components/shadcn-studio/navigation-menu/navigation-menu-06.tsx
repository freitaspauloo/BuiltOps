"use client";

import Image from "next/image";
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
import { ArrowRight, Code, GitBranch, Terminal, Zap } from "lucide-react";

const tools = [
  {
    icon: <Code className="size-5" />,
    label: "Code Editor",
    description: "Advanced code editing features",
    href: "#",
  },
  {
    icon: <Terminal className="size-5" />,
    label: "Terminal",
    description: "Integrated command line interface",
    href: "#",
  },
  {
    icon: <GitBranch className="size-5" />,
    label: "Version Control",
    description: "Git integration and management",
    href: "#",
  },
  {
    icon: <Zap className="size-5" />,
    label: "Webhooks",
    description: "Real-time event notifications",
    href: "#",
  },
];

const sidebar = {
  tutorial: {
    title: "Developer Guide",
    description: "Master the platform in 15 minutes",
    button: { label: "Read Guide", icon: <ArrowRight className="size-4" /> },
    image: "https://www.losanihomes.com/wp-content/uploads/2025/06/Benchmark-feature-communities_desktop-1-768x620.webp",
  },
};

/** shadcn studio reference — develop dropdown with image (06). */
export default function NavigationMenuDevelopDemo() {
  return (
    <div className="flex items-center justify-center">
      <NavigationMenu className="*:last:left-auto md:max-lg:*:last:-right-full lg:*:last:right-0">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="[&>svg]:size-4">Develop</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="nav-menu-panel-rich w-70 p-2 sm:w-145">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-sm font-medium text-muted">TOOLS</h4>
                    <div className="space-y-2">
                      {tools.map((feature) => (
                        <NavigationMenuLink
                          className="flex flex-row items-start gap-2 *:[svg]:size-5"
                          href={feature.href}
                          key={feature.label}
                        >
                          {feature.icon}
                          <div>
                            <p className="font-medium">{feature.label}</p>
                            <p className="text-muted">{feature.description}</p>
                          </div>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-card p-4">
                      <div className="relative aspect-video w-full overflow-hidden bg-mist">
                        <Image
                          src={sidebar.tutorial.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="280px"
                        />
                      </div>
                      <div className="mt-3 space-y-2">
                        <h4 className="mb-1 font-medium">{sidebar.tutorial.title}</h4>
                        <p className="text-sm text-muted">{sidebar.tutorial.description}</p>
                        <Button href="#" className="w-full justify-between" size="sm">
                          {sidebar.tutorial.button.label}
                          {sidebar.tutorial.button.icon}
                        </Button>
                      </div>
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

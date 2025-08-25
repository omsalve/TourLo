import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import { Home, Puzzle, PenTool, Boxes } from "lucide-react";

export function BentoGridSecondDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

// ✅ simple video component
const VideoHeader = ({ src }) => (
  <video
    src={src}
    autoPlay
    loop
    muted
    playsInline
    className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl object-cover"
  />
);

const items = [
  {
    title: "Everything Around The Home",
    description:
      "Craft the world around your project — hospitals, highways, malls, metros — so your sales team doesn’t just pitch a home, they sell a lifestyle.",
    header: <VideoHeader src="/videos/cardvideos/everythinghome.mp4" />,
    className: "md:col-span-2",
    icon: <Home className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Build Your Vibe",
    description: "Change interior themes, swap furniture, pick your vibe — make it yours.",
    header: <VideoHeader src="/videos/cardvideos/Kitchen Customisation Final.mp4" />,
    className: "md:col-span-1",
    icon: <Puzzle className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <VideoHeader src="/videos/design.mp4" />,
    className: "md:col-span-1",
    icon: <PenTool className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Real-Time Inventory",
    description:
      "No more “Let me check and get back. Just tap, talk, and sell — the data’s already there.",
    header: <VideoHeader src="/videos/cardvideos/inventory.mp4" />,
    className: "md:col-span-2",
    icon: <Boxes className="h-4 w-4 text-neutral-500" />,
  },
];

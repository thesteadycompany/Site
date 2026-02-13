"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { HomeFeedItem, HomeProjectItem } from "@/lib/home-feed";

const AUTOPLAY_MS = 5000;

type HomeProjectsCarouselProps = {
  heroItem: HomeFeedItem | null;
  items: HomeProjectItem[];
};

function toWrappedIndex(value: number, total: number): number {
  if (total <= 0) {
    return 0;
  }
  return ((value % total) + total) % total;
}

type CarouselSlideItem = {
  id: string;
  title: string;
  description: string;
  image?: string;
  url: string;
};

export function HomeProjectsCarousel({ heroItem, items }: HomeProjectsCarouselProps) {
  const slides: CarouselSlideItem[] = [
    ...(heroItem
      ? [
          {
            id: `hero-${heroItem.contentType}-${heroItem.slug}`,
            title: heroItem.title,
            description: heroItem.subtitle ?? "",
            image: heroItem.coverImage,
            url: heroItem.url,
          },
        ]
      : []),
    ...items.map((item) => ({
      id: `project-${item.slug}`,
      title: item.title,
      description: item.summary,
      image: item.thumbnail,
      url: item.url,
    })),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = slides.length;
  const currentIndex = toWrappedIndex(activeIndex, total);

  useEffect(() => {
    if (total <= 1 || isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [isPaused, total]);

  if (total === 0) {
    return null;
  }

  const handlePrevious = () => {
    setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <section
      className="p-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      aria-label="Projects carousel section"
    >
      <div className="overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {slides.map((slide) => (
            <div key={slide.id} className="w-full shrink-0">
              <Link href={slide.url} className="ui-hover ui-hover-lift grid gap-6 rounded-2xl p-2 md:grid-cols-[1fr_1.1fr] md:items-center">
                <div className="order-2 space-y-2 md:order-1">
                  <h3 className="text-2xl font-bold leading-tight text-primary sm:text-3xl">{slide.title}</h3>
                  <p className="line-clamp-3 text-sm leading-7 text-secondary sm:text-base">{slide.description}</p>
                </div>
                <div className="relative order-1 aspect-video w-full overflow-hidden rounded-2xl md:order-2">
                  {slide.image ? (
                    <Image
                      src={slide.image}
                      alt={`${slide.title} thumbnail`}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : null}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="이전 프로젝트"
            className="ui-hover inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary-background/90 text-secondary hover:bg-tertiary-background/80"
          >
            <span aria-hidden className="text-2xl font-normal leading-none">
              ‹
            </span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="다음 프로젝트"
            className="ui-hover inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary-background/90 text-secondary hover:bg-tertiary-background/80"
          >
            <span aria-hidden className="text-2xl font-normal leading-none">
              ›
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function HeroParallaxScene() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return undefined;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let targetScroll = 0;
    let currentX = 0;
    let currentY = 0;
    let currentScroll = 0;

    const apply = () => {
      frame = 0;

      currentX += (targetX - currentX) * 0.13;
      currentY += (targetY - currentY) * 0.13;
      currentScroll += (targetScroll - currentScroll) * 0.11;

      scene.style.setProperty("--far-x", `${(-3 * currentX).toFixed(2)}px`);
      scene.style.setProperty("--far-y", `${(-2 * currentY - 2 * currentScroll).toFixed(2)}px`);
      scene.style.setProperty("--bridge-x", `${(-6 * currentX).toFixed(2)}px`);
      scene.style.setProperty("--bridge-y", `${(-3 * currentY - 5 * currentScroll).toFixed(2)}px`);
      scene.style.setProperty("--road-x", `${(-9 * currentX).toFixed(2)}px`);
      scene.style.setProperty("--road-y", `${(-5 * currentY - 8 * currentScroll).toFixed(2)}px`);
      scene.style.setProperty("--employee-x", `${(-12 * currentX).toFixed(2)}px`);
      scene.style.setProperty("--employee-y", `${(-7 * currentY - 12 * currentScroll).toFixed(2)}px`);
      scene.style.setProperty("--tech-x", `${(-14 * currentX).toFixed(2)}px`);
      scene.style.setProperty("--tech-y", `${(-8 * currentY - 15 * currentScroll).toFixed(2)}px`);

      const unsettled =
        Math.abs(targetX - currentX) > 0.002 ||
        Math.abs(targetY - currentY) > 0.002 ||
        Math.abs(targetScroll - currentScroll) > 0.002;

      if (unsettled) frame = window.requestAnimationFrame(apply);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
      targetScroll = 0;
      currentX = 0;
      currentY = 0;
      currentScroll = 0;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      apply();
    };

    const motionEnabled = () => desktopQuery.matches && !reducedMotionQuery.matches;

    const handlePointerMove = (event) => {
      if (!motionEnabled() || !pointerQuery.matches) return;

      const rect = scene.getBoundingClientRect();
      const scale = window.innerWidth < 1200 ? 0.55 : 1;
      targetX = clamp((event.clientX - rect.left - rect.width / 2) / (rect.width / 2), -1, 1) * scale;
      targetY = clamp((event.clientY - rect.top - rect.height / 2) / (rect.height / 2), -1, 1) * scale;
      schedule();
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
      schedule();
    };

    const handleScroll = () => {
      if (!motionEnabled()) {
        if (targetScroll !== 0) reset();
        return;
      }

      const rect = scene.getBoundingClientRect();
      const scale = window.innerWidth < 1200 ? 0.55 : 1;
      targetScroll = clamp(-rect.top / Math.max(rect.height, 1), 0, 1) * scale;
      schedule();
    };

    const handleModeChange = () => {
      if (!motionEnabled()) reset();
      else handleScroll();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    desktopQuery.addEventListener("change", handleModeChange);
    reducedMotionQuery.addEventListener("change", handleModeChange);

    handleScroll();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      desktopQuery.removeEventListener("change", handleModeChange);
      reducedMotionQuery.removeEventListener("change", handleModeChange);
    };
  }, []);

  return (
    <div ref={sceneRef} className={styles.parallaxScene} aria-hidden="true">
      <div className={`${styles.parallaxLayer} ${styles.farLayer}`}>
        <Image
          src="/images/hero-v2/parallax/hero-far-background.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 110vw, 1px"
          className={styles.farPhoto}
        />
      </div>
      <div className={`${styles.parallaxLayer} ${styles.bridgeLayer}`}>
        <Image
          src="/images/hero-v2/parallax/hero-bridge.png"
          alt=""
          fill
          quality={90}
          sizes="(min-width: 1024px) 110vw, 1px"
          className={styles.bridgePhoto}
        />
      </div>
      <div className={`${styles.parallaxLayer} ${styles.roadLayer}`}>
        <Image
          src="/images/hero-v2/parallax/hero-road.jpg"
          alt=""
          fill
          quality={90}
          sizes="(min-width: 1024px) 110vw, 1px"
          className={styles.roadPhoto}
        />
      </div>
      <div className={`${styles.parallaxLayer} ${styles.employeeLayer}`}>
        <Image
          src="/images/hero-v2/parallax/hero-employee.png"
          alt=""
          fill
          quality={90}
          sizes="(min-width: 1400px) 38vw, (min-width: 1024px) 42vw, 1px"
          className={styles.employeePhoto}
        />
      </div>
      <div className={`${styles.parallaxLayer} ${styles.techLayer}`} />
    </div>
  );
}

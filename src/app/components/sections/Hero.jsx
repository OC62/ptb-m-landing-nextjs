import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

const directions = [
  ["01", "Защита объектов", "Обеспечение транспортной безопасности"],
  ["02", "Аудит безопасности", "Оценка системы защиты объекта"],
  ["03", "Обучение персонала", "Подготовка в сфере транспортной безопасности"],
  ["04", "Консультации", "Ответы на вопросы о защите объектов"],
];

const desktopCards = [
  ["Профильная специализация", "Транспортная безопасность объектов дорожного хозяйства", "M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z M8 12l3 3 5-6"],
  ["Комплексный подход", "Услуги по защите от актов незаконного вмешательства", "m12 3 10 5-10 5L2 8l10-5Z M2 12l10 5 10-5 M2 16l10 5 10-5"],
  ["Документы", "Ознакомьтесь с реквизитами и документами компании", "M14 2H5v20h14V7l-5-5Z M14 2v5h5 M8 12h8 M8 16h8"],
  ["Открытый диалог", "Обсудите задачу со специалистом", "M21 11a9 9 0 0 1-9 9H4l-3 3V11a10 10 0 0 1 20 0Z M7 11h.01 M12 11h.01 M17 11h.01"],
];

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.image} aria-hidden="true">
        <Image
          src="/images/hero-v2/canonical/hero-reference-desktop.jpg"
          alt=""
          fill
          priority
          quality={96}
          sizes="100vw"
          className={styles.photo}
        />
      </div>
      <div className={styles.canonicalHotspots} aria-label="Действия первого экрана">
        <Link href="/contacts" className={styles.hotspotConsult} aria-label="Получить консультацию" />
        <Link href="/services" className={styles.hotspotServices} aria-label="Наши услуги" />
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.diagonal} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            БЕЗОПАСНЫЕ ДОРОГИ —<br />УСТОЙЧИВАЯ СТРАНА
          </p>
          <h1 id="hero-heading" className={styles.heading}>
            ОБЕСПЕЧЕНИЕ{" "}
            <span className={styles.accent}>ТРАНСПОРТНОЙ</span>{" "}
            БЕЗОПАСНОСТИ
          </h1>
          <p className={styles.description}>
            ПТБ-М оказывает комплекс услуг по защите объектов дорожного хозяйства
            от актов незаконного вмешательства в соответствии с требованиями
            законодательства.
          </p>
          <div className={styles.actions}>
            <Link href="/contacts" className={`${styles.button} ${styles.primary}`}>
              Получить консультацию <span aria-hidden="true">→</span>
            </Link>
            <Link href="/services" className={`${styles.button} ${styles.secondary}`}>
              Наши услуги <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <p className={styles.aside}>
          КОНТРОЛЬ<br />ПРОФИЛАКТИКА<br />ЗАЩИТА<br />НАДЁЖНОСТЬ
        </p>
        <p className={styles.desktopNote}>
          ИНФРАСТРУКТУРА<br />В ДВИЖЕНИИ<br />ПОД НАДЁЖНОЙ<br />ЗАЩИТОЙ
        </p>
        <ul className={styles.desktopCards} aria-label="О работе с ПТБ-М">
          {desktopCards.map(([title, description, icon]) => (
            <li key={title} className={styles.trustCard}>
              <span className={styles.icon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                  <path d={icon} />
                </svg>
              </span>
              <div>
                <p className={styles.trustTitle}>{title}</p>
                <p className={styles.trustDescription}>{description}</p>
              </div>
            </li>
          ))}
        </ul>
        <ul className={`${styles.directions} ${styles.compactDirections}`} aria-label="Направления работы ПТБ-М">
          {directions.map(([number, title, description]) => (
            <li key={number} className={styles.card}>
              <span className={styles.number} aria-hidden="true">{number}</span>
              <div>
                <p className={styles.cardTitle}>{title}</p>
                <p className={styles.cardDescription}>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

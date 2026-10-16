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
  ["С 2017 года", "успешно обеспечиваем транспортную безопасность", "M6 2v3 M18 2v3 M3 9h18 M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z M7 13h2 M11 13h2 M15 13h2 M7 17h2 M11 17h2"],
  ["Аккредитация", "официальное право на оказание услуг в сфере транспортной безопасности", "M6 2h8l4 4v16H6z M14 2v5h5 M9 12h6 M9 16h4 M15.5 18.5l1.4 1.4 2.8-3.2"],
  ["Государственные заказчики", "доверяют нам", "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75"],
  ["Реальные результаты", "в действии", "M3 20h18 M6 16l4-4 3 3 5-7 M18 8h3v3"],
];

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.image} aria-hidden="true">
        <Image
          src="/images/hero-v2/canonical/hero-leonardo-source.jpg"
          alt=""
          fill
          priority
          quality={96}
          sizes="100vw"
          className={styles.photo}
        />
      </div>
      <div className={styles.canonicalHotspots} aria-label="Действия первого экрана">
        <Link href="#contact" className={styles.hotspotConsult} aria-label="Получить консультацию" />
        <Link href="#services" className={styles.hotspotServices} aria-label="Наши услуги" />
      </div>
      <div className={styles.employeeBrand} aria-hidden="true">
        <span className={styles.employeeBrandMark}>///</span>
        <strong>ПТБ-М</strong>
        <small>ТРАНСПОРТНАЯ<br />БЕЗОПАСНОСТЬ</small>
      </div>
      <div className={styles.canonicalPanelContrast} aria-hidden="true">
        <p className={styles.canonicalPanelTop}>
          КОНТРОЛЬ<br />ПРОФИЛАКТИКА<br />ЗАЩИТА<br />НАДЁЖНОСТЬ
        </p>
        <p className={styles.canonicalPanelBottom}>
          ИНФРАСТРУКТУРА<br />В ДВИЖЕНИИ<br />ПОД НАДЁЖНОЙ<br />ЗАЩИТОЙ
        </p>
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

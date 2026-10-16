import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

const directions = [
  ["01", "Защита объектов", "Обеспечение транспортной безопасности"],
  ["02", "Аудит безопасности", "Оценка системы защиты объекта"],
  ["03", "Обучение персонала", "Подготовка в сфере транспортной безопасности"],
  ["04", "Консультации", "Ответы на вопросы о защите объектов"],
];

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.image} aria-hidden="true">
        <Image
          src="/images/hero-night-highway-v2.webp"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className={styles.photo}
        />
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
        <ul className={styles.directions} aria-label="Направления работы ПТБ-М">
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

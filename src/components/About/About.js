import { Outlet } from 'react-router-dom';
import SectionHeading from '../UI/SectionHeading/SectionHeading';
import styles from './About.module.css';
import Button from '../UI/Button/Button';

function About() {
  return (
    <section className={styles.wrapper}>
      <SectionHeading>About</SectionHeading>
      <div className={styles.intro}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <nav className={styles['about-nav']}>
        <Button link="about1">About Text 1</Button>
        <Button link="about2">About Text 2</Button>
      </nav>
      <Outlet />
    </section>
  );
}

export default About;

import { Routes, Route } from 'react-router-dom';
import styles from './Help.module.css';
import HelpTextOne from './HelpTextOne';
import HelpTexTwo from './HelpTextTwo';
import SectionHeading from '../UI/SectionHeading/SectionHeading';
import Button from '../UI/Button/Button';
import useSetDocumentTitle from '../../hooks/use-setDocumentTitle';

const Help = () => {
  useSetDocumentTitle('Help');

  return (
    <section className={styles.wrapper}>
      <SectionHeading>Help</SectionHeading>
      <div className={styles.intro}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <nav className={styles['help-nav']}>
        <Button link="help1">Help Text 1</Button>
        <Button link="help2">Help Text 2</Button>
      </nav>
      <Routes>
        <Route path="help1" element={<HelpTextOne />} />
        <Route path="help2" element={<HelpTexTwo />} />
        <Route index element={null} />
        <Route path="*" element={<div>Help text not found!</div>} />
      </Routes>
    </section>
  );
};

export default Help;

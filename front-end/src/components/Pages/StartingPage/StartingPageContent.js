import { Link } from 'react-router-dom';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  return (
    // <div className={classes.body}>
    <section className={classes.starting}>
      <h1>Welcome to Appointment App!</h1>

      <button>
        <Link to={'/doctors'}>Get Started</Link>
      </button>
    </section>
    // </div>
  );
};

export default StartingPageContent;

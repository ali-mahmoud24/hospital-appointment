import { Link } from 'react-router-dom';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  return (
    // <div className={classes.body}>
    <section className={classes.starting}>
      <h1>Welcome to Appointment App!</h1>

      {/* <button>
        <Link to={'/auth'}>Get Started</Link>
      </button> */}
      <button>
        <Link to={'/auth/admin'}>Admin</Link>
      </button>

      <hr />
      
      <button>
        <Link to={'/auth/user'}>User</Link>
      </button>
    </section>
    // </div>
  );
};

export default StartingPageContent;

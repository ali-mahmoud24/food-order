import Button from '../ui/FormElements/button';

import classes from './hero.module.css';

const Hero = () => {
  return (
    <>
      <section className={classes.hero}>
        <div className={classes['hero-banner']}>
          <h1>welcome to okdac clinic</h1>
          <p>
            Book in-person or video consultations with your doctor now and Find
            out why 100s of healthcare providers choose Okadoc to help them
            provide better health outcomes.
          </p>
          <Button>Order Food</Button>
        </div>
      </section>
    </>
  );
};

export default Hero;

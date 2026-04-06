import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const SplitText = ({
  text = '',
  className = '',
  delay = 0.05,
  animationFrom = { opacity: 0, y: 20 },
  animationTo = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const letters = text.split('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <p
      ref={ref}
      className={`inline-block overflow-hidden ${className}`}
      style={{ textAlign, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={animationFrom}
          animate={inView ? animationTo : animationFrom}
          transition={{
            duration: 0.5,
            delay: i * delay,
            ease: 'easeOut',
          }}
          onAnimationComplete={() => {
            if (i === letters.length - 1 && onLetterAnimationComplete) {
              onLetterAnimationComplete();
            }
          }}
          className="inline-block"
          style={{ willChange: 'transform, opacity' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </p>
  );
};

export default SplitText;

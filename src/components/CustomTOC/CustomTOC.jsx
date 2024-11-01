import React, { useRef, useState } from 'react';
import styles from './CustomTOC.module.scss';
import TOCInline from '@theme/TOCInline';
import cn from 'classnames';

export const CustomTOC = ({ toc }) => {
  if (toc.length === 0) return null;

  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const TOCContainer = useRef(null);
  const TOCButton = useRef(null);

  if (TOCContainer.current) {
    const TOC = document.querySelector(`.${styles.TOCContainer} ul`);
    const height = getComputedStyle(TOC).height;

    if (expanded) {
      TOCContainer.current.style.height = height;
      TOCButton.current.style.borderBottomLeftRadius = '0';
      TOCButton.current.style.borderBottomRightRadius = '0';
    } else {
      TOCContainer.current.style.height = '0px';
      TOCContainer.current.style.overflow = 'hidden';

      TOCButton.current.style.borderBottomLeftRadius = '0';
      TOCButton.current.style.borderBottomRightRadius = '0';
    }

    setTimeout(() => {
      if (expanded) {
        if (TOCButton.current) {
          TOCContainer.current.style.overflow = 'visible';
          TOCButton.current.style.borderBottomLeftRadius = '0';
          TOCButton.current.style.borderBottomRightRadius = '0';
        }
      } else {
        if (TOCButton.current) {
          TOCButton.current.style.borderBottomLeftRadius = '0.4rem';
          TOCButton.current.style.borderBottomRightRadius = '0.4rem';
        }
      }
    }, 311);
  }

  return (
    <div
      className={cn(styles.customTOC, { [styles.expanded]: expanded })}
    >
      <button type='button' className={styles.button} ref={TOCButton} onClick={() => handleExpand()}>
        Зміст цієї сторінки
        <svg
          className={styles.icon}
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
        >
          <path
            d='M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z'
            fill='currentColor'
          ></path>
        </svg>
      </button>
      <div
        className={styles.TOCContainer}
        style={{
          willChange: 'height',
          transition: 'height 311ms ease-in-out',
        }}
        ref={TOCContainer}
      >
        <TOCInline toc={toc} />
      </div>
    </div>
  );
};

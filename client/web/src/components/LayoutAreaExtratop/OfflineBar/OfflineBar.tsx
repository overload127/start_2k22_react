import { useEffect } from 'react';

import style from './OfflineBar.module.scss';

function OfflineBar(): JSX.Element {
  useEffect(() => {
    const intervalClockId = setInterval(() => {
      console.log('ping');
    }, 1000);

    return () => {
      clearInterval(intervalClockId);
    };
  }, []);

  return (
    <div className={style.container}>
      <span className={style.icon}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none">
          <path fill="#FB8C00" d="M0 9a9 9 0 1 1 18 0A9 9 0 0 1 0 9z" />
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 4c-.79 0-1.38.7-1.25 1.48l.67 4.03a.59.59 0 0 0 1.16 0l.67-4.03A1.27 1.27 0 0 0 9 4zm0 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
          />
        </svg>
      </span>
      <span className={style.text}>Вы не в сети.</span>
    </div>
  );
}

export default OfflineBar;

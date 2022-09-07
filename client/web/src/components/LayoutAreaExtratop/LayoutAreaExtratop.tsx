import { useAppSelector } from '../../hooks/redux';

import OfflineBar from './OfflineBar/OfflineBar';

import style from './LayoutAreaExtratop.module.scss';

function LayoutAreaExtratop(): JSX.Element | null {
  const { isBadConnection } = useAppSelector((state) => state.authReducer);

  if (!isBadConnection) {
    return null;
  }

  return (
    <div className={style.container}>
      <OfflineBar />
    </div>
  );
}

export default LayoutAreaExtratop;

import { Suspense } from 'react';

function withSuspense(Component: React.ComponentType): JSX.Element {
  return (
    <Suspense fallback={<span>Загрузка компонента! ... </span>}>
      <Component />
    </Suspense>
  );
}

export default withSuspense;

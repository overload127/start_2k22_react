import { NavLink } from 'react-router-dom';

function Page404(): JSX.Element {
  return (
    <div>
      <div>
        <h1>Страница не найдена. Ошибка 404.</h1>
        <ol>
          <li>
            <NavLink to="/">Вернуться на главную</NavLink>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Page404;

import React from 'react';
import headerLogo from '../images/header.svg';

function Header({children}) {

  return (
    <header className={"header content__element content__element_type_header"}>
      <img src={headerLogo} alt="Сервис Место-Россия. Логотип" className="header__logo"/>

      {children && (
        <nav className="header__menu">
          <ul className="header__menu-list">
            {(children.length > 1 ? children : [children]).map((item, pos) => (
              <li className="header__menu-item" key={pos}>
                {item}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;

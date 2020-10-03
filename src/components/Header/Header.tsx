import React from 'react';

import './Header.scss';

const Header = () => {
  return (
    <div className="header__container">
      <span className="material-icons icon__pedal">pedal_bike</span>
      <span className="header__text">Oslo City Bikes</span>
    </div>
  );
};

export default Header;

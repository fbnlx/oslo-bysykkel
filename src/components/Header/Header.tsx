import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setActiveStation, setStationStatus } from '../../actions/stationActions';
import { Station } from '../../types/Station';

import './Header.scss';
import { setPosition } from '../../actions/mapActions';

const Header = (props: { stationList: Station[] }) => {
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResultList, setSearchResultList] = useState<Station[]>([]);
  const dispatch = useDispatch();

  const searchRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (isSearchActive) {
      document.body.addEventListener('mousedown', closeOnBodyClick);
    }
    return () => document.body.removeEventListener('mousedown', closeOnBodyClick);
  }, [isSearchActive]);

  useEffect(() => {
    if (!searchValue) {
      setSearchResultList([]);
    } else {
      const results = props.stationList.filter((station) =>
        station.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResultList(results);
    }
  }, [searchValue]);

  const getStationInformation = async (): Promise<void> => {
    try {
      const stations = await axios.get('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json');
      dispatch(setStationStatus(stations.data.data.stations));
    } catch (e) {
      console.log(e);
    }
  };

  const closeOnBodyClick = (e: any) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setDefaults();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleToggleSearch = (isActive?: boolean) => {
    if (isActive !== undefined) {
      setSearchActive(isActive);
    } else {
      setSearchActive(!isSearchActive);
    }
  };

  const handleSelectStation = (station: Station) => {
    dispatch(setActiveStation(station));
    dispatch(setPosition({ lat: station.lat, lon: station.lon }));
    getStationInformation();
    setDefaults();
  };

  const setDefaults = () => {
    setSearchValue('');
    setSearchResultList([]);
    handleToggleSearch(false);
  };

  return (
    <div className={`header__container ${isSearchActive ? 'search-active' : ''}`}>
      {!isSearchActive ? (
        <div className="content__left" onClick={() => handleToggleSearch()}>
          <span className="material-icons icon__search">search</span>
          <span className="header__text">Search for a station...</span>
          <span className="material-icons icon__pedal">pedal_bike</span>
        </div>
      ) : (
        <div ref={searchRef} className="content__search">
          <span className="material-icons icon__search">search</span>
          <input value={searchValue} placeholder="Station name..." onChange={handleInput} autoFocus />
          {isSearchActive && searchResultList.length > 0 && (
            <div className="result-list">
              {searchResultList.slice(0, 5).map((result) => (
                <div
                  key={result.station_id}
                  className="search-result"
                  onClick={() => handleSelectStation(result)}
                >
                  <span className="result-text">{result.name}</span>
                  <span className="result-address">{result.address}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;

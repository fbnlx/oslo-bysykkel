import moment from 'moment';
import React from 'react';
import { Station } from '../../types/Station';

import './StationDetails.scss';

interface StationProps {
  station: Station;
}

const StationDetails = ({ station }: StationProps) => {
  return (
    <div className="details__container">
      <span className="details__name">{station.name}</span>
      <span className="details__address">{station.address}</span>
      <div className="details__availability">
        <div className="availability__container">
          <span className="material-icons icon">directions_bike</span>
          <span className="available-text">
            <span className="available-number">
              {station.num_bikes_available !== undefined ? station.num_bikes_available : ' '}
            </span>
            bikes available
          </span>
        </div>
        <div className="availability__container">
          <span className="material-icons icon">house</span>
          <span className="available-text">
            <span className="available-number">
              {station.num_docks_available !== undefined ? station.num_docks_available : ' '}
            </span>
            docks available
          </span>
        </div>
      </div>
      <span className="last-updated">
        Last updated:{' '}
        {station.last_reported && moment.unix(station.last_reported).format('DD/MMM/YYYY hh:mm:ss')}
      </span>
    </div>
  );
};

export default StationDetails;

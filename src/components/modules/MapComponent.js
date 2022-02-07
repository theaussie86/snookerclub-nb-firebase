import React, { useState, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { useRef } from 'react';
import LoaderUrl from '../../images/loader.gif';

const Map = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = useRef(null);
  const [map, setMap] = useState()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}))
    }
    if (map) {
      map.setOptions(options);
    }
  }, [ref, map, options])

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  )
}


const render = (status) => {
  return <img src={LoaderUrl} alt={status} />
}


const MapComponent = () => {

  const [zoom, setZoom] = useState(16) // eslint-disable-line
  const [center, setCenter] = useState({ // eslint-disable-line
    lat: 53.538,
    lng: 13.258
  })

  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render}>
      <Map
        center={center}
        zoom={zoom}
        // onIdle={onIdle}
        style={{ flexGrow: '1', height: '100%' }}
      >
        <Marker key={'home'} position={{ lat: 53.538967, lng: 13.259983 }} />
      </Map>
    </Wrapper>
  );

}

const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

export default MapComponent;
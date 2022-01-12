import React, { useState, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { useRef } from 'react';
import { createCustomEqual } from 'fast-equals';
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
  }, [ref, map])

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options])

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

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

  const [zoom, setZoom] = useState(16)
  const [center, setCenter] = useState({
    lat: 53.538,
    lng: 13.258
  })

  const onIdle = (m) => {
    // console.log("onIdle");
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render}>
      <Map
        center={center}
        zoom={zoom}
        onIdle={onIdle}
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
    return /*() => {
      if (marker) {
        marker.setMap(null);
      }
    };*/
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a, b) => {
    if (
      a instanceof window.google.maps.LatLng ||
      b instanceof window.google.maps.LatLng
    ) {
      return new window.google.maps.LatLng(a).equals(new window.google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback,
  dependencies
) {
  // eslint-disable-next-line
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default MapComponent;
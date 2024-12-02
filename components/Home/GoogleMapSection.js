import React, { useContext, useEffect, useState } from 'react';
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
} from '@react-google-maps/api';
import { DestinationContext } from '@/context/DestinationContext';
import { SourceContext } from '@/context/SourceContext';

const containerStyle = {
  width: '100%',
  height: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 300,
};


function GoogleMapSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [center, setCenter] = useState({
    lat: 43.6539,
    lng: -79.38799,
  });
  const [map, setMap] = useState(null);
  const [directionsResult, setDirectionsResult] = useState(null);

  // Handle updates for source and destination
  useEffect(() => {
    if (source?.lat && source?.lng && map) {
      map.panTo({ lat: source.lat, lng: source.lng });
      setCenter({ lat: source.lat, lng: source.lng });
    }
    if (source?.lat && destination?.lat) {
      fetchDirections();
    }
  }, [source]);

  useEffect(() => {
    if (destination?.lat && destination?.lng && map) {
      map.panTo({ lat: destination.lat, lng: destination.lng });
      setCenter({ lat: destination.lat, lng: destination.lng });
    }
    if (source?.lat && destination?.lat) {
      fetchDirections();
    }
  }, [destination]);

  // Fetch directions using the DirectionsService
  const fetchDirections = () => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResult(result); // Pass the full result to DirectionsRenderer
        } else {
          console.error('Directions request failed due to:', status);
        }
      }
    );
  };

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: '89bc4d78fcfe8dde' }}
    >
      {/* Source Marker */}
      {source?.lat && (
        <MarkerF position={{ lat: source.lat, lng: source.lng }}>
          <OverlayView
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-[#800000] text-[18px]">{source.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      )}

      {/* Destination Marker */}
      {destination?.lat && (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: '/reach.png',
            scaledSize: {
              width: 45,
              height: 45,
            },
          }}
        >
          <OverlayView
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-[#800000] text-[18px]">{destination.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      )}

      {/* Directions Renderer */}
      {directionsResult && (
        <DirectionsRenderer
          directions={directionsResult}
          options={{
            polylineOptions: {
              strokeColor: '#800000',
              strokeWeight: 6,
            },
            suppressMarkers: true,
          }}
        />
      )}
    </GoogleMap>
  );
}

export default GoogleMapSection;

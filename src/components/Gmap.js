import React, { useEffect, useRef } from 'react';

const GMap = () => {
  const googleMapRef = useRef(null);
  let googleMap = null;
 
  // list of icons
  const iconList = {
      pinGreen: 'http://maps.google.com/mapfiles/kml/paddle/grn-blank.png',
      pinYellow:'http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png',
      pinRed: 'http://maps.google.com/mapfiles/kml/paddle/red-blank.png',
    track0: 'http://earth.google.com/images/kml-icons/track-directional/track-0.png',
    track1: 'http://earth.google.com/images/kml-icons/track-directional/track-1.png',
    track2: 'http://earth.google.com/images/kml-icons/track-directional/track-2.png',
    track3: 'http://earth.google.com/images/kml-icons/track-directional/track-3.png',
    track4: 'http://earth.google.com/images/kml-icons/track-directional/track-4.png',
    track5: 'http://earth.google.com/images/kml-icons/track-directional/track-5.png',
    track6: 'http://earth.google.com/images/kml-icons/track-directional/track-6.png',
    track7: 'http://earth.google.com/images/kml-icons/track-directional/track-7.png',
    track8: 'http://earth.google.com/images/kml-icons/track-directional/track-8.png',
    track9: 'http://earth.google.com/images/kml-icons/track-directional/track-9.png',
    track10: 'http://earth.google.com/images/kml-icons/track-directional/track-10.png',
    track11: 'http://earth.google.com/images/kml-icons/track-directional/track-11.png',
    track12: 'http://earth.google.com/images/kml-icons/track-directional/track-12.png',
    track13: 'http://earth.google.com/images/kml-icons/track-directional/track-13.png',
    track14: 'http://earth.google.com/images/kml-icons/track-directional/track-14.png',
    track15: 'http://earth.google.com/images/kml-icons/track-directional/track-15.png',
  }
 
  // list of the marker object along with icon
  const markerList = [
    

    { lat: 32.517774,  lng: -93.734555, icon: iconList.pinGreen },
    { lat: 32.444771, lng:  -93.844588, icon: iconList.pinGreen },
    { lat: 32.422505,  lng: -93.751248, icon: iconList.pinRed },

       { lat: 32.567774,  lng: -93.834555, icon: iconList.pinGreen },
    { lat: 32.445771, lng:  -93.849458, icon: iconList.pinGreen },
    { lat: 32.422345,  lng: -93.778648, icon: iconList.pinRed },


     { lat: 32.497203,  lng: -93.740114, icon: iconList.pinGreen },
    { lat: 32.504922, lng:  -93.731213, icon: iconList.pinGreen },
    { lat: 32.519330,  lng: -93.751967, icon: iconList.pinRed },
     { lat: 32.567774,  lng: -93.834555, icon: iconList.pinGreen },
    { lat: 32.508242, lng:  -93.709439, icon: iconList.pinGreen },
    { lat: 32.509113,  lng: -93.747541, icon: iconList.pinRed },

    { lat: 32.474660,  lng: -93.767096, icon: iconList.pinGreen },
    { lat: 32.492902, lng:  -93.726603, icon: iconList.pinGreen },
    { lat: 32.531687,  lng: -93.772609, icon: iconList.pinRed },



  ]
  
 
  useEffect(() => {
    googleMap = initGoogleMap();
    var bounds = new window.google.maps.LatLngBounds();
    markerList.map(x => {
      const marker = createMarker(x);
      bounds.extend(marker.position);
    });
  
    //googleMap.fitBounds(bounds); // the map to contain all markers
  }, []);
 
 
  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: 32.4918622, lng: -93.7550222},
      zoom: 12
    });
  }

  // create marker on google map
  const createMarker = (markerObj) => new window.google.maps.Marker({
    position: { lat: markerObj.lat, lng: markerObj.lng },
    map: googleMap,
    icon: {
      url: markerObj.icon,
      // set marker width and height
      scaledSize: new window.google.maps.Size(50, 50)
    },
            
  });

  return <div
    ref={googleMapRef}
    style={{ width: '100%', height: 800 }}
  />
}
 
export default GMap;
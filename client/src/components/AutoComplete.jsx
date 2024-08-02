import React, { useRef, useEffect } from "react";

const AutoComplete = () => {
  const autoCompleteRef = useRef(null);
  const inputRef = useRef(null);
  
  const options = {
    componentRestrictions: { country: "ng" }, // Restrict results to Nigeria
    fields: ["address_components", "geometry", "icon", "name"], // Desired fields
  };

  useEffect(() => {
    // Initialize the Google Maps Autocomplete instance
    if (window.google && window.google.maps) {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );

      // Add listener to handle place selection
      autoCompleteRef.current.addListener("place_changed", () => {
        const place = autoCompleteRef.current.getPlace();
        console.log(place); // Log place details
        // You can handle place data here, e.g., update the state or pass to parent
      });
    }
  }, []);

  return (
    <div>
      <label htmlFor="autocomplete">Enter address:</label>
      <input id="autocomplete" ref={inputRef} type="text" />
    </div>
  );
};

export default AutoComplete;
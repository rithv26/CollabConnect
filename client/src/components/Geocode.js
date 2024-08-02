import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const {
  suggestions: { status, data },
  setValue,
  clearSuggestions,
} = usePlacesAutocomplete({
  requestOptions: {
    /* Define search scope here */
  },
  debounce: 300,
});

export const handleSuggestionClick = (suggestion) => {
  const {
    structured_formatting: { main_text, secondary_text },
  } = suggestion;

  getGeocode({ address: `${main_text} ${secondary_text}` })
    .then((results) => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      console.log(map);
      if (map) {
        map.flyTo({ center: [lng, lat], zoom: 12.8 }); // Fly to the selected location
      }
      setCoordinates({ lat, lng });
      updateMarkers(
        lat,
        lng,
        selectedFilters.includes("Hackers"),
        selectedFilters.includes("Developers"),
        selectedFilters.includes("Researchers"),
        remote,
      );
    })
    .catch((error) => {
      console.error("Error getting geocode:", error);
    });

  if (secondary_text) setValue(`${main_text} ${secondary_text}`, false);
  if (!secondary_text) setValue(`${main_text}`, false);
  clearSuggestions();
};

export const handleEnterPress = (e) => {
  if (e.key === "Enter" && data.length > 0) {
    handleSuggestionClick(data[0]); // Select the first suggestion
  }
};

export const renderSuggestions = () =>
  data.map((suggestion, index) => {
    const {
      place_id,
      structured_formatting: { main_text, secondary_text },
    } = suggestion;

    return (
      <li
        key={place_id}
        className={`cursor-pointer px-2 py-[6px] hover:bg-gray-200 ${
          index === data.length - 1 ? "rounded-bl-3xl rounded-br-3xl" : ""
        }`}
        onClick={() => handleSuggestionClick(suggestion)}
      >
        <span className="text-black">{main_text}</span>{" "}
        <small className="text-gray-700">{secondary_text}</small>
      </li>
    );
  });

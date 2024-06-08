import { useAuth } from "@/context/useAuth";
import { findArea } from "@/utils/findArea";
import queryString from "query-string";
import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Heading } from "../../Heading";
import Counter from "../../inputs/Counter";
import CountrySelect, { CountrySelectValue } from "../../inputs/CountrySelect";
import { Modal } from "./Modal";
import PriceSlider from "../../inputs/PriceSlider";
import CategoriesSelect from "../../inputs/CategoriesSelect";
import SortingOptions from "../../inputs/SortingOptions";

const TOKEN = import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN;

type Props = {};

enum STEPS {
  LOCATION = 0,
  GUESTS = 1,
  ADVANCED = 2,
}

const INITIAL_VIEWPORT = {
  latitude: 21.001823,
  longitude: 105.846263,
  zoom: 5,
};

const SearchModal: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const url = useLocation();

  const { isSearchOpen, onSearchClose } = useAuth();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [marker, setMarker] = useState({
    latitude: 21.001823,
    longitude: 105.846263,
  });
  const [step, setStep] = useState(STEPS.LOCATION);
  const [area, setArea] = useState("");
  const [guest, setGuest] = useState(1);
  const [bed, setBed] = useState(1);
  const [bedroom, setBedroom] = useState(1);
  const [bathroom, setBathroom] = useState(1);
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(600);
  const [category, setCategory] = useState("");
  const [secondCategory, setSecondCategory] = useState("");
  const [sortColumn, setSortColumn] = useState("updatedAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [resetSelect, setResetSelect] = useState(0);

  const onClose = () => {
    onSearchClose();
    setStep(0);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = async () => {
    if (step !== STEPS.ADVANCED) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }
    const updateQuery: any = {
      ...currentQuery,
      area,
      max_guest: guest,
      min_beds: bed,
      min_bedrooms: bedroom,
      min_bathrooms: bathroom,
      min_nightly_price: minPrice,
      max_nightly_price: maxPrice,
      category1: category,
      category2: secondCategory,
      sort_column: sortColumn,
      sort_direction: sortDirection,
    };

    const url = queryString.stringifyUrl(
      {
        url: "/properties",
        query: updateQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    onSearchClose();

    navigate(url);
    window.scrollTo({ top: 0 });
  };

  const actionLabel = step === STEPS.ADVANCED ? "Search" : "Next";

  const secondaryLabel = step === STEPS.LOCATION ? undefined : "Back";

  useEffect(() => {
    if (location?.latlng) {
      const [latitude, longitude] = location.latlng.map(Number);
      setViewport((prev) => ({
        ...prev,
        latitude,
        longitude,
      }));
      setMarker({
        latitude,
        longitude,
      });
      const newArea = findArea(latitude, longitude);
      if (newArea) {
        setArea(newArea);
      }
    }
  }, [location]);

  // useEffect(() => {
  //   console.log("Area:", area);
  // }, [area]);
  const handleMove = (evt: any) => {
    const { latitude, longitude, zoom } = evt.viewState;
    setViewport({
      latitude,
      longitude,
      zoom,
    });
  };

  let bodyContent = (
    <div className="flex flex-col justify-between gap-4 h-[63vh]">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        key={resetSelect}
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <div className="w-full h-[40vh] rounded-lg flex justify-center overflow-hidden">
        <Map
          {...viewport}
          onMove={handleMove}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={TOKEN}
          dragRotate={false}
        >
          <Marker latitude={marker.latitude} longitude={marker.longitude} />
        </Map>
      </div>
    </div>
  );

  if (step === STEPS.GUESTS) {
    bodyContent = (
      <div className="flex flex-col gap-4 h-[63vh]">
        <Heading
          title="How many guests are coming?"
          subtitle="Make sure everything is comfortable!"
        />
        <hr />
        <div className="h-full flex flex-col justify-between">
          <Counter
            title="Guests"
            subtitle="How many guests are coming?"
            value={guest}
            onChange={(value) => setGuest(value)}
          />
          <hr />
          <Counter
            title="Beds"
            subtitle="How many beds do you need?"
            value={bed}
            onChange={(value) => setBed(value)}
          />
          <hr />
          <Counter
            title="Rooms"
            subtitle="How many rooms do you need?"
            value={bedroom}
            onChange={(value) => setBedroom(value)}
          />
          <hr />
          <Counter
            title="Bathrooms"
            subtitle="How many bathrooms do you need?"
            value={bathroom}
            onChange={(value) => setBathroom(value)}
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.ADVANCED) {
    bodyContent = (
      <div className="flex flex-col gap-8 h-[63vh] overflow-y-scroll no-scrollbar">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <PriceSlider
          title="Price range"
          subtitle="Nightly prices before fees and taxes"
          minPrice={minPrice}
          maxPrice={maxPrice}
          onChangeMin={setMinPrice}
          onChangeMax={setMaxPrice}
        />

        <CategoriesSelect
          title="Categories"
          subtitle="Choose at most 2 categories as you wish"
          cate1={category}
          cate2={secondCategory}
          onChangeCate1={setCategory}
          onChangeCate2={setSecondCategory}
        />
        <SortingOptions
          title="Sorting options"
          subtitle="Choose how you want to display "
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onChangeSortColumn={setSortColumn}
          onChangeSortDirection={setSortDirection}
        />
      </div>
    );
  }

  const clearAllFilters = () => {
    setLocation(undefined);
    setViewport(INITIAL_VIEWPORT);
    setMarker({
      latitude: 21.001823,
      longitude: 105.846263,
    });
    setStep(STEPS.LOCATION);
    setArea("");
    setGuest(1);
    setBed(1);
    setBedroom(1);
    setBathroom(1);
    setMinPrice(10);
    setMaxPrice(600);
    setCategory("");
    setSecondCategory("");
    setSortColumn("updatedAt");
    setSortDirection("desc");
    setResetSelect((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (
      url.pathname === "/properties" &&
      Object.keys(queryString.parse(url.search)).length === 0
    ) {
      clearAllFilters();
    }
  }, [url]);

  return (
    <Modal
      isOpen={isSearchOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryLabel={secondaryLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
      sm={step === STEPS.LOCATION}
      clearAll={clearAllFilters}
    />
  );
};

export default SearchModal;

export interface ResponseInterface<T> {
  data: T[];
  results: number;
}

export interface AirportInterface {
  icao: string;
  city: string;
  name: string;
  state: State;
  type: string;
  region: Region;
  status: string;
  country: Country;
  location: string;
  geometry: Geometry;
  latitude: Latitude;
  longitude: Longitude;
}

export interface Country {
  code: string;
  name: string;
}

export interface Geometry {
  coordinates: number[];
  type: string;
}

export interface Latitude {
  decimal: number;
  degrees: string;
}

export interface Longitude {
  decimal: number;
  degrees: string;
}

export interface Region {
  code: string;
  name: string;
}

export interface State {
  code: string;
  name: string;
}

export interface AirportDetailInterface {
  wind: Wind;
  icao: string;
  clouds: Cloud[];
  observed: string;
  station: Station;
  raw_text: string;
  dewpoint: Dewpoint;
  humidity: Humidity;
  barometer: Barometer;
  elevation: Elevation;
  visibility: Visibility;
  flight_category: string;
  temperature: Temperature;
  ceiling: Pick<Cloud, "feet" | "meters">;
}

export interface Barometer {
  hg: number;
  mb: number;
  hpa: number;
  kpa: number;
}

export interface Cloud {
  code: string;
  text: string;
  feet: number;
  meters: number;
  base_feet_agl: number;
  base_meters_agl: number;
}

export interface Dewpoint {
  celsius: number;
  fahrenheit: number;
}

export interface Elevation {
  feet: number;
  meters: number;
}

export interface Humidity {
  percent: number;
}

export interface Station {
  name: string;
  type: string;
  location: string;
  geometry: Geometry;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Temperature {
  celsius: number;
  fahrenheit: number;
}

export interface Visibility {
  miles: string;
  meters: string;
  miles_float: number;
  meters_float: number;
}

export interface Wind {
  degrees: number;
  speed_kph: number;
  speed_kts: number;
  speed_mph: number;
  speed_mps: number;
}

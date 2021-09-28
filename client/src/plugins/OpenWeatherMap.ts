import { Ref, ref, computed } from "vue";
import axios, { AxiosRequestConfig } from "axios";
import useSettings from "./Settings";

interface OpenWeatherMapResponse {
  base: string;
  clouds: OpenWeatherMapClouds;
  cod: number;
  coord: OpenWeatherMapCoords;
  dt: number;
  id: number;
  main: OpenWeatherMapMain;
  name: string;
  sys: OpenWeatherMapSys;
  timezone: number;
  visibility: number;
  weather: OpenWeatherMapWeather[];
  wind: OpenWeatherMapWind;
}

interface OpenWeatherMapClouds {
  all: number;
}

interface OpenWeatherMapCoords {
  lat: number;
  lon: number;
}

interface OpenWeatherMapMain {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface OpenWeatherMapSys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

interface OpenWeatherMapWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface OpenWeatherMapWind {
  deg: number;
  gust: number;
  speed: number;
}

class OwmService {
  private _baseUrl: string;
  private _appId: string;
  private _city: Ref<string>;
  private _currentWeather: Ref<OpenWeatherMapResponse>;

  constructor() {
    const settings = useSettings();
    this._baseUrl = "https://api.openweathermap.org/data/2.5/";
    this._appId = process.env.VUE_APP_OWM_API_KEY!;
    this._currentWeather = ref({} as OpenWeatherMapResponse);
    this._city = ref(settings.weather.city);

    console.log(this._baseUrl, this._appId, this._city, this._currentWeather);

    setTimeout(async () => await this.fetchData(), 1000);
  }

  private async fetchData(): Promise<void> {
    console.log("fetching weather data...");
    this._currentWeather.value = await axios
      .get("weather", {
        baseURL: this._baseUrl,
        params: { q: this._city.value, appid: this._appId, units: "metric" },
      } as AxiosRequestConfig)
      .then((response) => {
        switch (response.status) {
          case 200:
            return response.data;
          default:
            throw "API Error";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  get currentWeather() {
    return computed(() => this._currentWeather.value);
  }

  get city() {
    return computed(() => this._city.value);
  }
}

const owmService = new OwmService();

const useOwm = () => owmService;

export default useOwm;

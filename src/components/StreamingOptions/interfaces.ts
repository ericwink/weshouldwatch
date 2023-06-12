export interface Props {
  media_type: string;
  id: string;
  title: string;
}

export interface ProviderData {
  logo_path: string;
  provider_name: string;
}

export interface AvailabilityData {
  rent: ProviderData[];
  buy: ProviderData[];
  flatrate: ProviderData[];
  link: string;
}

export interface StreamOptions {
  [provider_name: string]: { logo_path: string; watchOption: string[] };
}
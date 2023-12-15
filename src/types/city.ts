type Country = {
  country: string;
  emoji: string;
};

type City = Country & {
  id: number;
  cityName: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
};

export type { City, Country };

export interface FormAPIInfo {
  id:               string;
  slug:             string;
  name:             string;
  released:         Date;
  background_image: string;
  rating:           number;
  rating_top:       number;
  ratings_count:    number;
  reviews_count:    number;
  created_at:       string;
  updated_at:       string;
  genres:           Genre[];
  platforms:        Genre[];
}

export interface Genre {
  id:   string;
  name: string;
}

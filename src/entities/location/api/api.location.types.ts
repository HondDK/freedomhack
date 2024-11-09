export type TGetCountryResDto = {
  id: number;
  cities: TGetCountryResDto
  name_kz: string;
  name_ru: string;
  name_en: string;
}[]
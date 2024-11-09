export type TGetWorkDirectionResDto = {
  id: number;
  name_kz: string;
  name_ru: string;
  name_en: string;
  sub_work_directions: Omit<TGetWorkDirectionResDto, 'sub_work_directions'>
}[]
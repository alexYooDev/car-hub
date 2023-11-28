import { CarProps, FilterProps } from "@/types";
import axios from "axios";

export async function fetchAllCars(filters: FilterProps) {

  const {manufacturer, model, year, fuel, limit} = filters;

  const options = {
    method: 'GET',
    url: 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars',
    params: { 
      model,
      manufacturer,
      year,
      fuel,
      limit
     },
    headers: {
      'X-RapidAPI-Key': '5ee035c4eamsh280cd41dde1d15cp186ff8jsn72cf74b6e973',
      'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
    },
  };

  const response = await axios.request(options);

  const result = await response.data;
  
  return result;
} 

export const calculateCarRent = (city_mpg: number, year:number) => {
  
  // Base rental price per day in dollar
  const basePricePerDay = 50;

  // Additional rate per mile
  const mileageFactor = 0.1;

  // Additional rate per year of vehiclce
  const ageFactor = 0.05;


  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');

  const {make, year, model} = car;

  url.searchParams.append('customer', 'hrjavascript-mastery');

  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('angle', `${angle}`);

  return `${url}`
}

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(type, value);

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    return newPathname;
}
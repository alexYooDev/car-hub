'use client'

import { CustomFilter, Hero, SearchBar } from "@/components"
import { fetchAllCars } from "@/utils"
import { CarCard } from "@/components";
import { FilterProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import ShowMore from "@/components/ShowMore";
import { useState, useEffect } from "react";

export default function Home() {

  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /* search states */
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2020);
  const [limit, setLimit] = useState(10);

/*   const [search, setSearch] = useState({
    manufacturer: '',
    model: '',
    fuel: '',
    year: 2020,
    limit: 10
  }) */

  const getCars = async () => {

    setIsLoading(true);

    try {

      const result = await fetchAllCars({
        manufacturer,
        year,
        model,
        limit,
        fuel
      });

      setAllCars(result);

    } catch(error) {
      console.log(error);

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCars();
  }, [manufacturer, model, fuel, year, limit])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalog</h1>
          <p>Explore the cars you might like</p>
          <div className='home__filters'>
            <SearchBar />
            <div className='home__filter-container'>
              <CustomFilter title='fuel' options={fuels} />
              <CustomFilter title='year' options={yearsOfProduction} />
            </div>
          </div>
          {!isDataEmpty ? (
            <section>
              <div className='home__cars-wrapper'>
                {allCars?.map((car) => (
                  <CarCard key={car} car={car} />
                ))}
              </div>
              <ShowMore
                pageNumber={(limit || 10) / 10}
                isNext={(limit || 10) > allCars.length}
              />
            </section>
          ) : (
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

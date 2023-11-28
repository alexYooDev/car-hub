'use client'

import { CustomFilter, Hero, SearchBar } from "@/components"
import { fetchAllCars } from "@/utils"
import { CarCard } from "@/components";
import { FilterProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import ShowMore from "@/components/ShowMore";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {

  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /* search state */
  const [search, setSearch] = useState({
    manufacturer: '',
    model: '',
    fuel: '',
    year: 2020,
    limit: 10
  })

  const getCars = async () => {

    setIsLoading(true);

    try {

      const result = await fetchAllCars({
        manufacturer: search.manufacturer,
        year: search.year,
        model: search.model,
        limit: search.limit,
        fuel: search.fuel
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
  }, [search.manufacturer,
      search.year,
      search.model,
      search.model,
      search.fuel])

  /* const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars; */

  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalog</h1>
          <p>Explore the cars you might like</p>
          <div className='home__filters'>
            <SearchBar 
              search={search}
              setSearch={setSearch}
            />
            <div className='home__filter-container'>
              <CustomFilter title='fuel' options={fuels} setFilter={setSearch}/>
              <CustomFilter title='year' options={yearsOfProduction} setFilter={setSearch} />
            </div>
          </div>
          {allCars.length > 0 ? (
            <section>
              <div className='home__cars-wrapper'>
                {allCars?.map((car) => (
                  <CarCard key={car} car={car} />
                ))}
              </div>
              { isLoading && (
                <div className="mt-16 w-full flex-center">
                  <Image
                    src='/loader.svg'
                    alt='loading'
                    width={50}
                    height={50}
                    className='object-contaim'
                  />
                </div>
              )}
              <ShowMore
                pageNumber={search.limit / 10}
                isNext={search.limit > allCars.length}
                setLimit={setSearch}
              />
            </section>
          ) : (
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
              <p>{allCars}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

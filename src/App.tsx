import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FormAPIInfo, Genre } from './models/form';
import { v4 } from 'uuid';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [platforms, setPlatforms] = useState<Genre[]>([]);
  const { register, reset, handleSubmit } = useForm<FormAPIInfo>()
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const { data } = await axios.get<FormAPIInfo>('https://mocki.io/v1/7c033695-a247-4c07-a5ff-484598745462');

    if (data) {
      reset(data)

      setGenres(data.genres);
      setPlatforms(data.platforms);
    } else {
      setError(true);
    }

    setIsLoading(false);
  }
  
  const onSubmit = (data: FormAPIInfo) => {
    console.log(data, genres, platforms)
  }

  const handleChangeGenres = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target
    const newGenres = genres.map((el: Genre) => ({ id: el.id, name: el.id === name ? value : el.name }));

    setGenres(newGenres);
  }

  const addGenre = () => {
    setGenres([
      ...genres,
      {
        id: v4(),
        name: ''
      }
    ])

  }

  
  const handleChangePlatform = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target
    const newPlatforms = platforms.map((el: Genre) => ({ id: el.id, name: el.id === name ? value : el.name }));

    setPlatforms(newPlatforms);
  }
  
  const addPlatforms = () => {
    setPlatforms([
      ...platforms,
      {
        id: v4(),
        name: ''
      }
    ])

  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }

  useEffect(() => {
    if (isLoading) {
      fetchData()
    }
  }, [])

  return (
    <div className='w-screen h-screen bg-gray-50 text-gray-900 p-2.5 dark:bg-gray-700 dark:text-white overflow-auto overflow-x-hidden'>
      <section className={`container mx-auto max-w-xl py-4 ${isLoading ? 'animate-pulse' : ''}`}>
        {
          error && (
            <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                  </svg>
                  <span className="sr-only">Error icon</span>
              </div>
              <div className="ms-3 text-sm font-normal">Error Loading Data</div>
            </div>
          )
        }
        <h1 className='text-4xl font-extrabold dark:text-white'>Form</h1>
        <hr className='border border-b my-4' />
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="slug">Slug</label>
                <input type="text" { ...register("slug") }  />
              </div>
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" {...register("name")}  />
              </div>
              <div>
                  <label htmlFor="released">Released</label>
                  <input type="date" {...register('released')} />
              </div>  
              <div>
                  <label htmlFor="rating">Rating</label>
                  <input {...register("rating")}  />
              </div>
              <div>
                  <label htmlFor="rating_top">Rating Top</label>
                  <input type="number" {...register("rating_top")}  />
              </div>
              <div>
                  <label htmlFor="ratings_count">Ratings Count</label>
                  <input type="number" {...register("ratings_count")}  />
              </div>
              <div>
                  <label htmlFor="reviews_count">Reviews Count</label>
                  <input type="number" {...register("reviews_count")}  />
              </div>
              <div>
                  <label htmlFor="created_at">Created At</label>
                  <input type="string" {...register("created_at")}  />
              </div>
              <div>
                  <label htmlFor="updated_at">Updated At</label>
                  <input type="string" {...register("updated_at")}  />
              </div>
            </div>
            <div className='space-y-2 mb-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg'>Genres</h3>
                <button onClick={addGenre} type='button' className='px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Add</button>
              </div>
              {genres.flatMap((el: Genre) => (
                <input type="string" key={el.id} name={el.id} value={el.name} onChange={handleChangeGenres}  />
              ))}
            </div>
            <div className='space-y-2 mb-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg'>Platforms</h3>
                <button onClick={addPlatforms} type='button' className='px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Add</button>
              </div>
              {platforms.flatMap((el: Genre) => (
                <input type="string" key={el.id} name={el.id} value={el.name} onChange={handleChangePlatform}  />
              ))}
            </div>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFile} />
                </label>
            </div> 
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

      </section>
    </div>
  );
}

export default App;

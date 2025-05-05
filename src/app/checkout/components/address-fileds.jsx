// components/address/AddressFields.js
'use client';

import { useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import FloatingInput from '@/components/ui/floatingInput';
import FloatingSelect from '@/components/ui/floatingSelect';
import { useFormContext, useWatch } from 'react-hook-form';

export default function AddressFields({
  namePrefix = '',
  bgColor = 'bg-white'
}) {
  const { control, setValue } = useFormContext();

  const country = useWatch({ control, name: `${namePrefix}country` });
  const state = useWatch({ control, name: `${namePrefix}state` });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (country) {
      const result = State.getStatesOfCountry(country);
      setStates(result);
      setValue(`${namePrefix}state`, '');
      setValue(`${namePrefix}city`, '');
      setCities([]);
    }
  }, [country]);

  useEffect(() => {
    if (country && state) {
      const result = City.getCitiesOfState(country, state);
      setCities(result);
      setValue(`${namePrefix}city`, '');
    }
  }, [state]);

  return (
    <>
      <div className='flex w-full gap-2'>
        <FloatingInput
          label='First Name'
          name={`${namePrefix}firstName`}
          rules={{ required: 'First name is required' }}
          className={` ${bgColor}`}
        />
        <FloatingInput
          label='Last Name'
          name={`${namePrefix}lastName`}
          rules={{ required: 'Last name is required' }}
          className={` ${bgColor}`}
        />
      </div>

      <FloatingInput
        label='Phone Number'
        name={`${namePrefix}phone`}
        type='tel'
        rules={{ required: 'Phone number is required' }}
        className={` ${bgColor}`}
      />

      <FloatingInput
        name={`${namePrefix}email`}
        label='Email Address'
        type='email'
        className={` ${bgColor}`}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            message: 'Enter a valid email'
          }
        }}
      />

      <FloatingSelect
        name={`${namePrefix}country`}
        placeholder='Select Country'
        rules={{ required: 'Please select a country' }}
        options={Country.getAllCountries().map((c) => ({
          label: c.name,
          value: c.isoCode
        }))}
        className={bgColor}
      />

      <FloatingInput
        label='Street Address'
        name={`${namePrefix}address`}
        rules={{ required: 'Address is required' }}
        className={` ${bgColor}`}
      />

      <FloatingInput
        label='Apartment, Suite, etc. (optional)'
        name={`${namePrefix}address2`}
        className={` ${bgColor}`}
      />

      <div className='grid w-full grid-cols-2 gap-2 sm:grid-cols-3'>
        <FloatingSelect
          name={`${namePrefix}state`}
          placeholder='Select State'
          rules={{ required: 'Please select a state' }}
          options={states.map((s) => ({
            label: s.name,
            value: s.isoCode
          }))}
          className={bgColor}
        />

        <FloatingSelect
          name={`${namePrefix}city`}
          placeholder='Select City'
          rules={{ required: 'Please select a city' }}
          options={cities.map((c) => ({
            label: c.name,
            value: c.name
          }))}
          className={bgColor}
        />

        <FloatingInput
          label='ZIP Code'
          name={`${namePrefix}zip`}
          rules={{ required: 'ZIP Code is required' }}
          className={bgColor}
        />
      </div>
    </>
  );
}

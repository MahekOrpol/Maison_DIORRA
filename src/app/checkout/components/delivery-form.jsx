'use client';

import { useCheckoutStore } from '@/lib/checkout-store';
import { useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FloatingSelect } from '@/components/ui/floatingSelect';
import FloatingInput from '@/components/ui/floatingInput';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const DeliveryForm = ({ onNext, onPrev }) => {
  const { address, setAddress } = useCheckoutStore();
  const [formData, setFormData] = useState(
    address || { name: '', street: '', city: '' }
  );

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  const countries = Country.getAllCountries();
  const handleCountryChange = (code) => {
    setSelectedCountry(code);
    console.log(code);
    const stateList = State.getStatesOfCountry(code);
    console.log(stateList);
    setStates(stateList);
  };
  const handleStateChange = (stateCode) => {
    setSelectedState(stateCode);
    const cities = City.getCitiesOfState(selectedCountry, stateCode);
    console.log(cities);
    setCities(cities);
  };
  const handleCityChange = (value) => {
    setSelectedCity(value);
  };
  const handleSubmit = () => {
    setAddress(formData);
    onNext(); // Move to payment step
  };

  return (
    <div>
      <h2 className='mb-4 text-2xl font-semibold'>Select Delivery Address</h2>
      <form className='grid max-w-xl grid-cols-1 gap-3 md:grid-cols-2'>
        {/* Country Select */}
        <div className='col-span-2'>
          <FloatingSelect
            placeholder='Country/Region'
            value={selectedCountry}
            onChange={handleCountryChange}
            options={countries.map((c) => ({
              label: c.name,
              value: c.isoCode
            }))}
            className=''
          />
        </div>
        <FloatingInput
          label='First Name'
          name='firstName'
          //   value={phone}
          //   onChange={setPhone}
        />
        <FloatingInput
          label='Last Name'
          name='lastName'
          //   value={phone}
          //   onChange={setPhone}
        />
        <FloatingInput
          label='Phone Number'
          name='lastName'
          //   value={phone}
          //   onChange={setPhone}
        />
        <FloatingInput
          label='Email Id'
          name='lastName'
          //   value={phone}
          //   onChange={setPhone}
        />
        <div className='col-span-2'>
          <FloatingInput
            label='Address'
            name='address'
            //   value={phone}
            //   onChange={setPhone}
          />
        </div>
        <div className='col-span-2'>
          <FloatingInput
            label='Apartment, suite,etc. (optional)'
            name='address2'
            //   value={phone}
            //   onChange={setPhone}
          />
        </div>
        {/* State Select (based on country) */}
        <div className='col-span-2 flex gap-4'>
          <FloatingSelect
            placeholder='State'
            value={selectedState}
            onChange={handleStateChange}
            options={states.map((s) => ({
              label: s.name,
              value: s.isoCode
            }))}
            className=''
          />
          <FloatingSelect
            placeholder='City'
            value={selectedCity}
            onChange={handleCityChange}
            options={cities.map((c) => ({
              label: c.name,
              value: c.name
            }))}
            className=''
          />
          <FloatingInput
            label='ZIP Code'
            name='zip'
            //   value={phone}
            //   onChange={setPhone}
          />
        </div>
        <div className='col-span-2 my-3'>
          <p className='mb-2'>Save Address as</p>
          <Button variant='outline' className='bg-secondary mr-4 px-8'>
            Home
          </Button>
          <Button variant='outline' className='bg-secondary px-8'>
            Office
          </Button>
        </div>
        <div className='col-span-2'>
          <Checkbox id='terms' className='mr-2' />
          <label
            htmlFor='terms'
            className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Save this address for the future reference
          </label>
        </div>
        <Button className='bg-black py-2 text-white'>Save Address</Button>
      </form>
      <button onClick={onPrev} className='bg-gray-400 px-4 py-2'>
        Back
      </button>
      <button onClick={handleSubmit} className='bg-black px-4 py-2 text-white'>
        Next
      </button>
    </div>
  );
};

export default DeliveryForm;

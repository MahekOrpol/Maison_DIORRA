'use client';

import { useCheckoutStore } from '@/lib/checkout-store';
import { useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FloatingInput } from '@/components/ui/floatingInput';

const DeliveryForm = ({ onNext, onPrev }) => {
  const { address, setAddress } = useCheckoutStore();
  const [formData, setFormData] = useState(
    address || { name: '', street: '', city: '' }
  );

  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedState, setSelectedState] = useState('WA');
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
    setCities(cities);
  };

  const handleSubmit = () => {
    setAddress(formData);
    onNext(); // Move to payment step
  };

  return (
    <div>
      {/* <div>
        <h2 className='text-xl font-bold'>Enter Delivery Address</h2>
        <input
          type='text'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder='Full Name'
          className='mt-2 w-full border p-2'
        />
        <input
          type='text'
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          placeholder='Street Address'
          className='mt-2 w-full border p-2'
        />
        <input
          type='text'
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder='City'
          className='mt-2 w-full border p-2'
        />

        <div className='mt-4 flex justify-between'>
          <button onClick={onPrev} className='bg-gray-400 px-4 py-2'>
            Back
          </button>
          <button
            onClick={handleSubmit}
            className='bg-black px-4 py-2 text-white'
          >
            Next
          </button>
        </div>
      </div> */}
      <form className='grid max-w-xl grid-cols-1 gap-4 md:grid-cols-2'>
        {/* Country Select */}
        <div className='col-span-2'>
          <label>Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e.target.value)}
            className='w-full rounded border p-2'
          >
            {countries.map((c, i) => (
              <option key={i} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* State Select (based on country) */}
        <div>
          <label>State/Province</label>
          <select
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
            className='w-full rounded border p-2'
          >
            {states.map((s) => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label>City</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className='w-full rounded-md border p-2'
          >
            {cities.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Address Line 1 */}
        <div className='col-span-2'>
          <label>Street Address</label>
          <input
            type='text'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className='w-full rounded border p-2'
          />
        </div>

        {/* Postal Code */}
        <div>
          <label>Postal Code</label>
          <input
            type='text'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className='w-full rounded border p-2'
          />
        </div>

        {/* Phone */}
        <div>
          <label>Phone Number</label>
          <input
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='w-full rounded border p-2'
          />
        </div>
        <FloatingInput placeholder='Email address' />
      </form>
    </div>
  );
};

export default DeliveryForm;

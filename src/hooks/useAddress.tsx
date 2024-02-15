import { useCallback } from 'react';

export interface ICity {
  [zipCode: string]: string;
}

export interface IAddressData {
  county: { [countyCode: string]: string };
  city: { [countyCode: string]: ICity };
}

export const useCountyOrder = (addressData: IAddressData) => {
  return useCallback(
    (county: string): string | null => {
      for (const [order, item] of Object.entries(addressData.county)) {
        if (item === county) {
          return order;
        }
      }
      return null;
    },
    [addressData.county],
  );
};

export const useZipCode = (addressData: IAddressData) => {
  return useCallback(
    (order: string, city: string): string => {
      for (const [zip, item] of Object.entries(addressData.city[order])) {
        if (item === city) {
          return zip;
        }
      }
      return '';
    },
    [addressData.city],
  );
};

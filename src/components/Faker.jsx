import React from 'react';
import styled from 'styled-components';
import { faker } from '@faker-js/faker';

const Faker = () => {
  var data = [];
  var exampleRow = {
    companyName: faker.company.companyName(),
    address: faker.address.streetAddress(),
    city: faker.address.cityName(),
    zipCode: faker.address.zipCode(),
    phone: faker.phone.number(),
    accountName: faker.finance.accountName(),
    accountNo: faker.finance.account(),
    iban: faker.finance.iban(),
    balance: faker.finance.amount(),
    currency: faker.finance.currencyCode(),
  };

  for (var i = 0; i < 100; i += 1) {
    data.push({
        companyName: faker.company.companyName(),
        address: faker.address.streetAddress(),
        city: faker.address.cityName(),
        zipCode: faker.address.zipCode(),
        phone: faker.phone.number(),
        accountName: faker.finance.accountName(),
        accountNo: faker.finance.account(),
        iban: faker.finance.iban(),
        balance: faker.finance.amount(),
        currency: faker.finance.currencyCode(),
      });
  }
  console.log(data);

  return <div></div>;
};

export default Faker;

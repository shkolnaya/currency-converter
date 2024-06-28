# Angular 17 Currency Converter App

## Overview

This Angular 17 application displays the current exchange rates for USD and EUR against UAH in the header and provides a currency conversion component. Users can input an amount in one currency and get the equivalent amount in another, with support for at least three currencies (UAH, USD, EUR). The conversion is bidirectional and updates dynamically based on user inputs and selections.

## Features

### Header with Current Exchange Rates
- Displays the latest USD and EUR exchange rates against UAH.
- Fetches the current rates from a public API.

### Currency Conversion Component
- Provides separate inputs and selects for two currencies.
- Allows input of the amount to convert.
- Supports UAH, USD, GBP, and EUR in the select dropdowns.
- Performs bidirectional conversion: changing the value or currency in one input updates the other.
- Updates conversions accurately upon changing the selected currency in any dropdown.

## Setup and Installation

### Prerequisites
- Node.js and npm installed
- Angular CLI installed globally (`npm install -g @angular/cli`)

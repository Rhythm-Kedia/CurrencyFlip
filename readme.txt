Currency Flip - A Currency Converter Web Application
----------------------------------------------------

Made by - Rhythm Kedia (24b1071)

------------------------------------------------------------------------------------------------------------------------------------------------------

Overview

This web application enables users to:
1. Convert currency values between over 160 currencies.
2. Explore three length paths to maximize returns through exchange rate discrepancies.

The application utilizes real-time exchange rate data fetched from a currency API (https://v6.exchangerate-api.com/v6/) and features an intuitive user interface.

Additional Components
- Responsive design using Bootstrap (styling).
- Dropdowns with search functionality powered by Select2 (for dropdowns).
- Interactive flip buttons for easy currency switching (additional usage).

-------------------------------------------------------------------------------------------------------------------------------------------------------

Technologies Used

External Resources
- Bootstrap: For making responsive layout and styling.
  - CDN (so that loading is faster) : https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css

- Select2: For enhanced dropdowns with search functionality by implementing the advanced dropdown features provided by Select2. Obtained from - jsDelivr.
  - CSS CDN: https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css
  - JS CDN: https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js

- jQuery: Used for DOM manipulation and AJAX requests (specifically for fetch API).
  - CDN: https://code.jquery.com/jquery-3.6.0.min.js

Local Resources
- Images:
  - currency-icon.png
  - flip.svg

API
- ExchangeRate-API: https://v6.exchangerate-api.com/v6/

-------------------------------------------------------------------------------------------------------------------------------------------------------

How to Use:

1. Convert Currency:
   - Enter the amount in the "Amount" field.
   - Select the source currency from the "From Currency" dropdown.
   - Select the target currency from the "To Currency" dropdown.
   - Click the "Convert" button to view the result.
   
   This gives you the converted amount (in green colour).

2. Flip Currencies:
   
   An additional feature to enhance user experience. 
   - Click the flip button between the "From Currency" and "To Currency" fields to switch them.
  
   This will swap your From currency and To Currency with each other.

3. Find Arbitrage Paths:
   - Select the starting and ending currencies in the arbitrage section.
   - Enter the number of paths desired (It is set to 3 by default).
   - Click the "Calculate Best Paths" button to view arbitrage insights in a table format.
   
   This will give you the top n (= number of path wanted) paths to get you currency converted.

-------------------------------------------------------------------------------------------------------------------------------------------------------
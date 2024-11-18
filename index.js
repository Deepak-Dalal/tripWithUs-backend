const express = require('express');
const cors = require('cors');
const { hotels } = require('./constants');

const app = express();
const port = 3000;

app.use(cors());

function sortPriceLowToHigh(hotelA,hotelB){
  return hotelA.price-hotelB.price;
}

function sortPriceHighToLow(hotelA,hotelB){
  return hotelB.price-hotelA.price;
}

app.get('/hotels/sort/pricing', (req, res) => {
  const pricing = req.query.pricing;
  const result = hotels.slice();
  if(pricing === 'low-to-high'){
    result.sort(sortPriceLowToHigh);
  } else if (pricing === 'high-to-low'){
    result.sort(sortPriceHighToLow);
  }
  res.json({ hotels: result });
});

function sortRatingLowToHigh(hotelA,hotelB){
  return hotelA.rating-hotelB.rating;
}

function sortRatingHighToLow(hotelA,hotelB){
  return hotelB.rating-hotelA.rating;
}

app.get('/hotels/sort/rating', (req, res) => {
  const rating = req.query.rating;
  const result = hotels.slice();
  if(rating === 'low-to-high'){
    result.sort(sortRatingLowToHigh);
  } else if (rating === 'high-to-low'){
    result.sort(sortRatingHighToLow);
  }
  res.json({ hotels: result });
});

function sortReviewsLowToHigh(hotelA,hotelB){
  return hotelA.reviews-hotelB.reviews;
}

function sortReviewsHighToLow(hotelA,hotelB){
  return hotelB.reviews-hotelA.reviews;
}

app.get('/hotels/sort/reviews', (req, res) => {
  const reviews = req.query.reviews;
  const result = hotels.slice();
  if(reviews === 'least-to-most'){
    result.sort(sortReviewsLowToHigh);
  } else if (reviews === 'most-to-least'){
    result.sort(sortReviewsHighToLow);
  }
  res.json({ hotels: result });
});

function filterByAmenity(amenity){
  return hotels.filter((hotel) => hotel.amenity.toLowerCase() === amenity);
}

app.get('/hotels/filter/amenity', (req, res) => {
  const amenity = req.query.amenity;
  const result = filterByAmenity(amenity);
  res.json({ hotels: result });
});

function filterByCountry(country){
  return hotels.filter((hotel) => hotel.country.toLowerCase() === country);
}

app.get('/hotels/filter/country', (req, res) => {
  const country = req.query.country;
  const result = filterByCountry(country);
  res.json({ hotels: result });
});

function filterByCategory(category){
  return hotels.filter((hotel) => hotel.category.toLowerCase() === category);
}

app.get('/hotels/filter/category', (req, res) => {
  const category = req.query.category;
  const result = filterByCategory(category);
  res.json({ hotels: result });
});

app.get('/hotels', (req, res) => {
  const result = hotels;
  res.json({ hotels: result });
});

app.get('/', (req, res) => {
  res.send('Welcome to TripWithUs');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

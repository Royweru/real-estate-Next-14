const axios = require('axios');

async function test() {
  try {
    const data = {
      title: 'Beautiful Test House',
      description: 'A very nice test house for sale',
      videoUrl: '',
      priceType: 'purchase',
      purchasePrice: 500000,
      rentalPrice: null,
      locationId: 'clx... (needs valid ID)',
      statusId: 'clx...',
      typeId: 'clx...',
      categoryId: 'clx...',
      images: [{ url: 'https://example.com/img1.jpg' }],
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      amenities: ['clx...'],
    };
    
    // We can't actually do this without a valid user token and IDs,
    // so let's check the backend logs instead or just write a next.js server script
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}
test();

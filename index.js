import express from 'express';
import cors from 'cors'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import connectDB from './Database/config.js';
import routes from './Routers/userRouter.js'
import place from './Routers/placeRouter.js'
import book from './Routers/bookingRouter.js'
import bodyParser from 'body-parser';
dotenv.config()

const app = express();

connectDB()
const port=process.env.PORT;

const destinationData = {
    Kerala: {
      hotels: [
         { 
             id: 1, 
             name: 'The Leela Kovalam, A Raviz Hotel', 
             price: '₹5000', 
             image: 'https://content.r9cdn.net/rimg/himg/83/a5/4e/expediav2-421296-128e98-125446.jpg?width=335&height=268&crop=true',
             reviews: [
               { author: 'John Doe', rating: 3, comment: 'Great stay, very comfortable.' },
             
             ]
           },
           { 
             id: 2, 
             name: 'The Novotel Kochi, Infopark Hotel', 
             price: '₹ 5,381', 
             image: 'https://content.r9cdn.net/rimg/himg/c9/99/71/ice-102923-70000151_3XL-405107.jpg?width=335&height=268&crop=true&outputtype=webp',
             reviews: [
               { author: 'John Doe', rating: 4, comment: 'Great stay, very comfortable.' },
               ]
           },
           { 
             id: 3, 
             name: 'Uday Samudra Leisure Beach Hotel', 
             price: '₹ 8,229', 
             image: 'https://content.r9cdn.net/rimg/himg/13/67/4a/expediav2-153956-0d94bc-241137.jpg?width=335&height=268&crop=true&outputtype=webp',
             reviews: [
               { author: 'John Doe', rating: 4, comment: 'Great stay, very comfortable.' },
              ]
           },
           { 
             id: 4, 
             name: 'Kochi Marriott Hotel', 
             price: '₹ 10,310+', 
             image: 'https://content.r9cdn.net/rimg/himg/f2/c7/29/leonardo-2156263-180733836-282507.jpg?width=335&height=268&crop=true&outputtype=webp',
             reviews: [
               { author: 'Jane Smith', rating: 5, comment: 'Exceptional service and amenities.' }
             ]
           },
           { 
             id: 5, 
             name: 'The The Panoramic Getaway Wonderful Hotel', 
             price: '₹ 11,588', 
             image: 'https://content.r9cdn.net/rimg/himg/14/0f/92/expediav2-806183-107961-618210.jpg?width=335&height=268&crop=true&outputtype=webp',
             reviews: [
               { author: 'John Doe', rating: 4, comment: 'Great stay, very comfortable.' },
               { author: 'Jane Smith', rating: 5, comment: 'Exceptional service and amenities.' }
             ]
           },
           { 
             id: 6, 
             name: 'The Vythiri Village Hotel', 
             price: '₹ 7,222', 
             image: 'https://content.r9cdn.net/rimg/himg/73/35/9e/expediav2-505609-6d54b7-532525.jpg?width=335&height=268&crop=true&outputtype=webp',
             reviews: [
               { author: 'John Doe', rating: 4, comment: 'Great stay, very comfortable.' },
               
             ]
           },
         ],
         places: [
          { name: 'Alleppey', description: 'Famous for its backwaters and houseboats.', image: 'https://www.holidify.com/images/bgImages/ALLEPPEY.jpg', price: '₹1800', travelExpenses: '₹500', food: 'Included' },
          { name: 'Kumarakom', description: 'Known for its picturesque backwaters and bird sanctuary.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Kumarkom.jpg/1200px-Kumarkom.jpg', price: '₹1600', travelExpenses: '₹300', food: 'Available' },
          { name: 'Munnar', description: 'This little town attracts tourists from around the globe all through the year.', image:'https://keralatourpackagesguide.com/wp-content/uploads/2017/05/munnar-hillstation-places-to-visit-in-kerala.jpg', price: '₹1300', travelExpenses: '₹600',food: 'Available' },
          { name: 'Bekal', description: 'Bekal,a small town in Kasaragod district,is not just a known tourist location.', image:'https://keralatourpackagesguide.com/wp-content/uploads/2017/05/bekal-for-kasaragod.jpg', price: '₹1000', travelExpenses: '₹400',food: 'Available' },
       
        ],
        packages: [
          {
            name: 'Backwater Bliss',
            description: 'Explore the serene backwaters with a 3-day package.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm8xffwI_sGKtVBE2WVLTNm8XdaYkL8BpxLQ&s',
            price: '₹5000',
            itinerary: [
              { day: 1, activities: 'Visit Alleppey backwaters.' },
              { day: 2, activities: 'Houseboat cruise in Kumarakom.' },
              { day: 3, activities: 'Relax and enjoy the local cuisine.' },
            ],
            hotels: [
              { name: 'Hotel Backwater', price: '₹1500 per night' },
              { name: 'Lake View Resort', price: '₹1700 per night' },
            ],
            food: 'Included',
            travelExpenses: '₹2800',
          },
          {
            name: 'Kerala Highlights',
            description: 'A comprehensive 5-day tour of Kerala.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrsjXBsTEg8TlmCB3pNoAN5gMW0LFsku3aQg&s',
            price: '₹10000',
            itinerary: [
              { day: 1, activities: 'Explore Kochi.' },
              { day: 2, activities: 'Visit Munnar hills.' },
              { day: 3, activities: 'Explore Thekkady.' },
              { day: 4, activities: 'Relax in Alleppey.' },
              { day: 5, activities: 'Return home.' },
            ],
            hotels: [
              { name: 'Hotel Backwater', price: '₹3500 per night' },
              { name: 'Lake View Resort', price: '₹4000 per night' },
            ],
            food: 'Included',
            travelExpenses: '₹2500',
          },
        ],
      },
  
    Goa: {
      hotels: [
        { 
          id: 1, 
          name: 'Resorte Marinha Dourada', 
          price: '₹3160', 
          image: 'https://r1imghtlak.ibcdn.com/94800ab88e0411e98c770242ac110004.jpg?output-quality=75&downsize=328:180&output-format=webp',
          reviews: [
            { author: 'John Doe', rating: 3, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        { 
          id: 2, 
          name: 'Alagoa Resort', 
          price: '₹ 1879', 
          image: 'https://r1imghtlak.ibcdn.com/dbc62ad2a44c11eb883c0242ac110002.jfif?output-quality=75&downsize=328:180&output-format=webp',
          reviews: [
            { author: 'John Doe', rating: 3, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        { 
          id: 3, 
          name: 'Hyatt Centric Candolim Goa', 
          price: '₹ 9648', 
          image: 'https://r1imghtlak.ibcdn.com/842684025c8211e98d9f0242ac110003.jpg?output-quality=75&downsize=328:180&output-format=webp',
          reviews: [
            { author: 'John Doe', rating: 5, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        { 
          id: 4, 
          name: 'SinQ Beach Resort', 
          price: '₹ 2703', 
          image: 'https://r1imghtlak.ibcdn.com/10f8eab475b711e7a8fd0a209fbd0127.jpg?output-quality=75&downsize=328:180&output-format=webp',
          reviews: [
            { author: 'John Doe', rating: 3, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        { 
          id: 5, 
          name: 'Magnum Resorts- Near Candolim Beach', 
          price: '₹ 3098', 
          image: 'https://r2imghtlak.ibcdn.com/r2-mmt-htl-image/htl-imgs/201806261703123778-fb07a0f2a37c11ed86590a58a9feac02.jpg?output-quality=75&downsize=328:180&output-format=webp',
          reviews: [
            { author: 'John Doe', rating: 4, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        { 
          id: 6, 
          name: 'Shining Sand Beach Hotel', 
          price: '₹ 5761', 
          image: 'https://r2imghtlak.ibcdn.com/r2-mmt-htl-image/htl-imgs/201509141442016504-b4a0df465f5411e8a4070a9df65c8753.jpg?output-quality=75&downsize=328:180&output-format=webp',
          reviews: [
            { author: 'John Doe', rating: 5, comment: 'Great stay, very comfortable.' },
            
          ]
        },
  
      ],
      places: [
        { 
          name: 'Calangute Beach', 
          description: 'Famous for its sandy beach and vibrant nightlife.', 
          image: 'https://media1.thrillophilia.com/filestore/b8iqw6n62s37df5vqj13dpxr17cg_shutterstock_1850377780.jpg?w=400&dpr=2', 
          price: '₹1500', 
          travelExpenses: '₹400', 
          food: 'Available' 
        },
        { 
          name: 'Panaji', 
          description: 'The capital city with colonial architecture and riverfront.', 
          image: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/206000/206665-Panaji.jpg', 
          price: '₹1200', 
          travelExpenses: '₹300', 
          food: 'Available' 
        },
        // Add other places...
      ],
      packages: [
        { 
          name: 'Goa Beach Escape', 
          description: 'Enjoy a 4-day tour of Goa\'s famous beaches.', 
          image: 'https://travelfromindia.com/assets/uploads/news-80.jpg', 
          price: '₹10000', 
          itinerary: [
            { day: 1, activities: 'Baga Beach. Adjacent to Calangute, visit Baga Beach, famous for its exciting nightlife and lively atmosphere Anjuna Flea Market' },
            { day: 2, activities: 'Chapora Fort,Basilica of Bom Jesus. ...' },
            { day: 3, activities: 'Aguada Fort and Lighthouse,Fontainhas Latin Quarter..' },
            { day: 4, activities: 'Palolem Beach,Agonda Beach...' },
          ], 
          hotels: [
            { name: 'Beach View Resort', price: '₹2000 per night' },
           
          ], 
          food: 'Available', 
          travelExpenses: '₹2000' 
        },
        ],
    },
    AndhraPradesh: {
      hotels: [
        { 
          id: 1, 
          name: 'The Park Visakhapatnam', 
          price: '₹ 6,926', 
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/a7/58/80/the-park-visakhapatnam.jpg?w=300&h=300&s=1',
          reviews: [
            { author: 'John Doe', rating: 4, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        { 
          id: 2, 
          name: '. Novotel Visakhapatnam Varun Beach', 
          price: '₹ 9,674', 
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/97/13/5a/novotel-visakhapatnam.jpg?w=300&h=300&s=1',
          reviews: [
            { author: 'John Doe', rating: 5, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        { 
          id: 3, 
          name: 'The  Hotel Manorama', 
          price: '₹ 3,766', 
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/d8/00/af/manorama-hotel.jpg?w=300&h=300&s=1',
          reviews: [
            { author: 'John Doe', rating: 3, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        { 
          id: 4, 
          name: ' Fortune Select Grand Ridge, Tirupati', 
          price: '₹ 6,720', 
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/f7/82/50/profile-picture.jpg?w=300&h=300&s=1',
          reviews: [
            { author: 'John Doe', rating: 5, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        { 
          id: 5, 
          name: 'Grand Vijayawada By Grt Hotels', 
          price: '₹ 5,423', 
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/71/96/9c/hotel-closer-to-benz.jpg?w=300&h=300&s=1',
          reviews: [
            { author: 'John Doe', rating: 4, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        { 
          id: 6, 
          name: 'Gadiraju Palace Convention Centre & Hotel', 
          price: '₹ 2,487', 
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/a6/c1/b5/main-entrance.jpg?w=300&h=300&s=1',
          reviews: [
            { author: 'John Doe', rating: 5, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        // Add other hotels...
      ],
      places: [
        { 
          name: 'Visakhapatnam', 
          description: 'A port city known for its beaches and naval base.', 
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Vizag_View_from_Kailasagiri.jpg/1920px-Vizag_View_from_Kailasagiri.jpg', 
          price: '₹1200', 
          travelExpenses: '₹750', 
          food: 'Available' 
        },
        { 
          name: 'Tirupati', 
          description: 'Famous for the Tirumala Venkateswara Temple.', 
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1S185C6gUp1q2TAt_RqFGEfRtcR4hR96__w&s', 
          price: '₹1500', 
          travelExpenses: '₹600', 
          food: 'Included' 
        },
        // Add other places...
      ],
      packages: [
        { 
          name: 'Vizag Highlights', 
          description: 'Explore the scenic beauty of Visakhapatnam.', 
          image: 'https://dastravels.in/wp-content/uploads/2020/01/maxresdefault-1024x576.jpg', 
          price: '₹7500', 
          itinerary: [
            { day: 1, activities: 'Visit R.K. Beach.' },
            { day: 2, activities: 'Visakhapatnam Local Sightseeing Tour by Cab' },
            { day: 3, activities: '1 Day Vizag to Araku Valley Tour by Cab' },
  
            // Add other days...
          ], 
          hotels: [
            { name: 'Vizag Beach Hotel', price: '₹2000 per night' },
            // Add other hotels...
          ], 
          food: 'Included', 
          travelExpenses: '₹3000' 
        },
        // Add other packages...
      ],
    },
    Tamilnadu: {
      hotels: [
        { 
          id: 1, 
          name: 'Hilton Chennai', 
          price: '₹ 10,820', 
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/64/c4/e8/hilton-chennai-facade.jpg?w=300&h=300&s=1',
          reviews: [
            { author: 'John Doe', rating: 5, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        { 
          id: 2, 
          name: 'Taj Connemara, Chennai', 
          price: '₹ 11,700', 
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/20/5a/f0/facade.jpg?w=300&h=300&s=1',
          reviews: [
            { author: 'John Doe', rating: 4, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        { 
          id: 3, 
          name: 'Hotel Tamil Nadu, Yercaud', 
          price: '₹ 1700', 
          image: 'https://www.ttdconline.com/_next/hotel-tamil-nadu/yercaud/1.jpg',
          reviews: [
            { author: 'John Doe', rating: 4, comment: 'Great stay, very comfortable.' },
            
          ]
        },
        // Add other hotels...
      ],
      places: [
        { 
          name: 'Chennai', 
          description: 'The capital city with a rich cultural heritage.', 
          image: 'https://www.shutterstock.com/image-photo/chennai-text-on-marina-beach-260nw-1765681589.jpg', 
          price: '₹1200', 
          travelExpenses: '₹400', 
          food: 'Available' 
        },
        { 
          name: 'Madurai', 
          description: 'Known for its ancient temples and rich history.', 
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/71/bf/0e/madurai-meenakshi-temple.jpg?w=1000&h=1000&s=1', 
          price: '₹1400', 
          travelExpenses: '₹300', 
          food: 'Included' 
        },
        // Add other places...
      ],
      packages: [
        { 
          name: 'Tamil Nadu Tour', 
          description: 'Experience the diverse culture and heritage of Tamil Nadu.', 
          image: 'https://images.pexels.com/photos/18287947/pexels-photo-18287947/free-photo-of-view-of-arulmigu-ramanathaswamy-temple-in-rameshwaram.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
          price: '₹7000', 
          itinerary: [
            { day: 1, activities: 'Explore Chennai.' },
            { day: 2, activities: 'Melmaruvathur- Thiruvannamalai Tour' },
            { day: 3, activities: 'Pondicherry Tour' },
  
            // Add other days...
          ], 
          hotels: [
            { name: 'Chennai Grand Hotel', price: '₹2500 per night' },
            // Add other hotels...
          ], 
          food: 'Included', 
          travelExpenses: '₹1200' 
        },
        // Add other packages...
      ],
    },
    Karnataka: {
      hotels: [
        { 
          id: 1, 
          name: ' The Leela Bhartiya City Bengaluru', 
          price: '₹5000', 
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/86/e8/c6/the-leela-bhartiya-city.jpg?w=300&h=300&s=1',
          reviews: [
            { author: 'Anita Rao', rating: 5, comment: 'Excellent facilities and great location.' },
          ]
        },
        { 
          id: 2, 
          name: 'Palm Meadows Resort', 
          price: '₹6000', 
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/02/e6/1b/74/palm-meadows-club.jpg?w=300&h=300&s=1',
          reviews: [
            { author: 'Karan Singh', rating: 4, comment: 'Luxurious stay with top-notch service.' },
          ]
        },
        { 
          id: 3, 
          name: 'Evolve Back Coorg', 
          price: '₹3000', 
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/a9/d6/bc/lily-pool-villa.jpg?w=300&h=300&s=1',
          reviews: [
            { author: 'Karan Singh', rating: 3, comment: 'Luxurious stay with top-notch service.' },
          ]
        },
        // Add other hotels...
      ],
      places: [
        { 
          name: 'Mysore', 
          description: 'Known for its royal heritage and Mysore Palace.', 
          image: 'https://images.pexels.com/photos/27680519/pexels-photo-27680519/free-photo-of-mysore-palace.jpeg?auto=compress&cs=tinysrgb&w=600', 
          price: '₹1200', 
          travelExpenses: '₹300', 
          food: 'Available' 
        },
        { 
          name: 'Coorg', 
          description: 'Famous for its coffee plantations and scenic beauty.', 
          image: 'https://tripver.com/wp-content/uploads/2024/08/coorg-karnataka.jpg', 
          price: '₹1500', 
          travelExpenses: '₹400', 
          food: 'Included' 
        },
        // Add other places...
      ],
      packages: [
        { 
          name: 'Coorg Escape', 
          description: 'Experience the lush greenery and coffee plantations of Coorg.', 
          image: 'https://dynamic.tourtravelworld.com/package-images/photo-big/dir_9/259453/237601.jpg', 
          price: '₹5500', 
          itinerary: [
            { day: 1, activities: 'Visit coffee plantations.' },
            { day: 2, activities: 'Abbey Falls,Dubare Elephant Camp,Tibetan Monastery' },
            { day: 3, activities: 'Omkareswara Temple: Visit Omkareswara Temple,Cauvery Nisargadhama,Golden Temple,Visit the Golden Temple or Tibetan Monastery,Irupu Falls:' },
           
  
          ], 
          hotels: [
            { name: 'Coorg Resort', price: '₹2000 per night' },
            // Add other hotels...
          ], 
          food: 'Included', 
          travelExpenses: '₹1000' 
        },
        // Add other packages...
      ],
    },
  };
  
const corsOptions = {
  origin: 'https://heroic-lebkuchen-8664c2.netlify.app/', // Your frontend URL
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));


app.use(cookieParser()); 
app.use(express.json())
app.use('/api',routes)
app.use('/api/place', place);
app.use('/api/book', book);
app.use(bodyParser.json()); 
//app.use('/api/destinations', destination);


app.get('/',(req,res)=>{
    res.send(`<h1>Welcome to Travel World Backend</h1>`)

})

// Get all destinations
app.get('/destinations', (req, res) => {
    res.json(Object.keys(destinationData));
  });
  
  // Get details for a specific destination
  app.get('/destinations/:name', (req, res) => {
    const name = req.params.name;
    const data = destinationData[name];
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  });
  
  // Get all hotels for a specific destination
  app.get('/destinations/:name/hotels', (req, res) => {
    const name = req.params.name;
    const data = destinationData[name];
    if (data) {
      res.json(data.hotels);
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  });
  
  // Get all places for a specific destination
  app.get('/destinations/:name/places', (req, res) => {
    const name = req.params.name;
    const data = destinationData[name];
    if (data) {
      res.json(data.places);
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  });
  
  // Get all packages for a specific destination
  app.get('/destinations/:name/packages', (req, res) => {
    const name = req.params.name;
    const data = destinationData[name];
    if (data) {
      res.json(data.packages);
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  });
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
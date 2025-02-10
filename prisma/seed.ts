import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Uncomment and adjust the following block if you want to insert amenities

  console.log("Inserting amenities...")
  const amenities = [
    'Air Conditioning',
    'Balcony',
    'CCTV',
    'Dishwasher',
    'Elevator',
    'Furnished',
    'Garden',
    'Gym',
    'Internet',
    'Laundry',
    'Parking',
    'Pet Friendly',
    'Pool',
    'Security',
    'Storage',
    'Wheelchair Access',
    'WiFi',
    'Fireplaces',
    'Rooftop decks',
    'Smartlocks',
  ]

  for (const name of amenities) {
    await prisma.amenity.upsert({
      where: { name },
      update: { name },
      create: { name },
    })
  }
  console.log("Done inserting amenities....")
  

//   console.log('Inserting locations....')
//   const locations = [
//     {
//       county: "Kiambu",
//       city: "Ruaka",
//     },
//     {
//       county: "Nairobi",
//       city: "Garden estate",
//     },
//     {
//       county: "Nairobi",
//       city: "Komarok",
//     },
//     {
//       county: "Nairobi",
//       city: "Roysambu",
//     },
//   ]

//   for (const location of locations) {
//     await prisma.location.create({
//       data: location,
//     })
//   }
//   console.log("Done inserting locations...")
// }

  console.log('Inserting property status....')
  const PropertyStatus = [
    "Active","Pending","Closed"
  ]

  for (const status of PropertyStatus) {
    await prisma.status.create({
      data:{
        name:status
      },
    })
  }
  console.log("Done inserting property status...")

  console.log('Inserting property types....')
  const PropertyTypes= [
    "Apartments","Commercial buildings","Houses","Bedsitters"
  ]

  for (const type of PropertyTypes) {
    await prisma.type.create({
      data:{
        name:type
      },
    })
  }
  console.log("Done inserting property types...")
}



main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
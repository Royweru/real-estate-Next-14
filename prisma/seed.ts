import { db } from '@/lib/prismadb'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // console.log("Inserting amenities...")
  // const amenities = [
  //   'Air Conditioning',
  //   'Balcony',
  //   'CCTV',
  //   'Dishwasher',
  //   'Elevator',
  //   'Furnished',
  //   'Garden',
  //   'Gym',
  //   'Internet',
  //   'Laundry',
  //   'Parking',
  //   'Pet Friendly',
  //   'Pool',
  //   'Security',
  //   'Storage',
  //   'Wheelchair Access',
  //   'WiFi',
  //   'Fireplaces',
  //   'Rooftop decks',
  //   'Smartlocks'
  // ]
 
  // for (const name of amenities) {
  //   await prisma.amenity.upsert({
  //     where: { name },
  //     update: {name},
  //     create: { name },
  //   })
  // }
  // console.log("Done inserting amenities....")

  console.log('Inserting locations....')
  const locations = [
    {
      county: "Kiambu",
      city: "Ruaka",
    },
    {
      county: "Nairobi",
      city: "Garden estate",
    },
    {
      county: "Nairobi",
      city: "Komarok",
    },
    {
      county: "Nairobi",
      city: "Roysambu",
    },
  ]

 for(const location of locations){
     await db.location.create({
      data:{...location}
     })
 }
  console.log("Done inserting locations...")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
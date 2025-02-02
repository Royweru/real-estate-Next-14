import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
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
    'WiFi'
  ]

  for (const name of amenities) {
    await prisma.amenity.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
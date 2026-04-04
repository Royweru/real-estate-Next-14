import Image from 'next/image'
import { ListingType } from '../types'

export const MediaSection = ({
  data,
}: {
  data: ListingType
}) => {
  if (!data) return null

  const hasVideo = !!data.videoUrl
  const images = data.images ?? []
  const hasImages = images.length > 0

  if (!hasVideo && !hasImages) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-16">
        <p className="text-sm text-neutral-500">No media uploaded for this listing.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Video Section */}
      {hasVideo && (
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <video
            src={data.videoUrl!}
            controls
            className="w-full max-h-[420px] bg-black object-contain"
          />
        </div>
      )}

      {/* Images Grid */}
      {hasImages && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {/* Hero image — spans 2 cols on all breakpoints */}
          {images[0] && (
            <div className="relative col-span-2 row-span-2 aspect-[16/10] overflow-hidden rounded-xl border border-slate-200">
              <Image
                fill
                src={images[0].url}
                alt={`${data.title} — image 1`}
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Remaining images — 1 col each, square aspect */}
          {images.slice(1).map((img, idx) => (
            <div
              key={img.url}
              className="relative aspect-square overflow-hidden rounded-xl border border-slate-200"
            >
              <Image
                fill
                src={img.url}
                alt={`${data.title} — image ${idx + 2}`}
                className="object-cover object-center"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { createListingSchema } from "../schemas";
import { Category, Type, Status, Location, Amenity } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { X } from "lucide-react";
import { ImageUpload } from "@/components/image-upload";
import { VideoUpload } from "@/components/video-upload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateListingFormProps {
  locations: Location[];
  status: Status[];
  types: Type[];
  categories: Category[];
  amenities: Amenity[];
}
export const CreateListingForm = ({
  locations,
  status,
  types,
  categories,
  amenities,
}: CreateListingFormProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const progressBarWidth = `${((currentPage - 1) / 2) * 100}%`;
  const router = useRouter()
  const form = useForm<z.infer<typeof createListingSchema>>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      title: "",
      description: "",
      priceType: "rental",
      purchasePrice: null,
      rentalPrice: null,
      locationId: "",
      statusId: "",
      typeId: "",
      categoryId: "",
      images: [],
      videoUrl: undefined,
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      amenities: [],
      // isFeatured: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof createListingSchema>) => {
    try {
      // Handle form submission
      console.log(values);
      const res = await axios.post('/api/listings/create',values)
      if(res.status ===201) {
        toast.success("Listing created successfully!!",{
          style:{
            backgroundColor:"green",
            color: "#ffff",
          }

        })
        form.reset()
        router.push('/management/properties')
      }
    } catch (error) {
      console.error(error);
      toast.error("Ooopsy seems like something went wrong")
    }

  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-y-6 p-4">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-bold text-stone-800/90">
          Create New Listing
        </h2>
        <p className="text-neutral-600">
          Fill in the details below to create a new property listing
        </p>

        {/* Progress Steps */}
        <div className="flex justify-between items-center w-full max-w-5xl mt-4 mx-auto">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full ${
                currentPage >= 1
                  ? "bg-sky-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } 
          flex items-center justify-center transition-colors duration-300`}
            >
              1
            </div>
            <div className="ml-2">Basic Info</div>
          </div>
          <div className="h-[2px] bg-gray-200 mx-2 flex-1 relative">
            <div
              className="absolute top-0 left-0 h-full bg-sky-500 transition-all duration-300"
              style={{ width: progressBarWidth }}
            />
          </div>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full ${
                currentPage >= 2
                  ? "bg-sky-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } 
          flex items-center justify-center transition-colors duration-300`}
            >
              2
            </div>
            <div className="ml-2">Details</div>
          </div>
          <div className="h-[2px] bg-gray-200 mx-2 flex-1 relative">
            <div
              className="absolute top-0 left-0 h-full bg-sky-500 transition-all duration-300"
              style={{ width: progressBarWidth }}
            />
          </div>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full ${
                currentPage >= 3
                  ? "bg-sky-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } 
          flex items-center justify-center transition-colors duration-300`}
            >
              3
            </div>
            <div className="ml-2">Media</div>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-8 w-full max-w-6xl mx-auto"
        >
          {/* Page 1: Basic Info */}
          {currentPage === 1 && (
            <section className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-semibold text-stone-700">
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                        placeholder="Property Title"
                         {...field} 
                         />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="typeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            {types.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Card className="mt-4">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-stone-700">Price Details</h4>
                      
                      <FormField
                        control={form.control}
                        name="priceType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  // Reset prices when switching type
                                if(value === "purchase"){
                                  form.setValue("rentalPrice", null)
                                }else{
                                  form.setValue("purchasePrice", null)
                                }
                                }}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"

                              >

                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="purchase" />
                                  </FormControl>
                                  <FormLabel className="font-normal italic`">
                                    Purchase Price
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="rental" />
                                  </FormControl>
                                  <FormLabel className="font-normal italic">
                                    Rental Price (per month)
                                  </FormLabel>
                                </FormItem>

                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch('priceType') === 'purchase' ? (
                        <FormField
                          control={form.control}
                          name="purchasePrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Enter purchase price"
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                                  value={field.value ?? ''}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <FormField
                          control={form.control}
                          name="rentalPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Enter monthly rental price"
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                                  value={field.value ?? ''}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>

                <FormField
                  control={form.control}
                  name="locationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location.id} value={location.id}>
                                {location.county} ,{location.city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                 control={form.control}
                 name ="area"
                 render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input
                       type="number"
                       placeholder="Enter area in square meters"
                        {...field}
                       />
                    </FormControl>
                    <FormMessage/>
                  </FormItem> 
                 )}
              />
              </div>
            </section>
          )}

          {/* Page 2: Property Details */}
          {currentPage === 2 && (
            <section className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-semibold text-stone-700">
                Property Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="statusId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {status.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                control={form.control}
                name="bedrooms"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                      type="number" 
                      placeholder="Enter number of bedrooms" 
                      {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                />  
                <FormField
                control={form.control}
                name="bathrooms"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                      type="number" 
                      placeholder="Enter number of bathrooms"
                       {...field}
                       />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormControl>
                        <Textarea
                          placeholder="Enter property description..."
                          className="h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amenities"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="text-base">Amenities</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {amenities.map((amenity) => (
                            <label
                              key={amenity.id}
                              className={`
                                flex items-center gap-x-2 p-3  border rounded-lg cursor-pointer transition-colors
                                  ${field.value?.some((id: string) => id === amenity.id) 
                                  ? 'border-sky-500 bg-sky-50' 
                                  : 'border-gray-200 hover:border-sky-200'
                                }

                              `}
                            >
                              <input
                                type="checkbox"
                                checked={field.value?.some(id => id === amenity.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    field.onChange([...field.value || [], amenity.id]);

                                  } else {
                                    field.onChange(
                                      field.value?.filter(id => id !== amenity.id) || []
                                    );
                                  }
                                }}
                                className="size-5 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                {amenity.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>
          )}

          {/* Page 3: Media Upload */}
          {currentPage === 3 && (
            <section className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-semibold text-stone-700">
                Media Upload
              </h3>
              
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <div className="space-y-6">
                    {/* Images Upload */}

                    <div className="space-y-2">
                      <h4 className="font-medium text-stone-700">
                        Property Images
                      </h4>
                      <div className="border-2 border-dashed flex flex-col items-center justify-center rounded-lg p-8 text-center">
                       <h3 className=" text-md text-neutral-700 font-semibold">
                        Image upload here
                       </h3>
                       <p className=" text-sm text-stone-500/80">
                        Upload up to 10 images of the property
                       </p>
                       <p className=" text-sm text-stone-500/80">
                        Supported formats: JPG, PNG, JPEG (max 10MB each)
                       </p>

                       <div className = ' mt-4 relative '>
                       <ImageUpload
                            disabled = {false}
                            onChange={(url) =>
                              field.onChange([...field.value, { url }])
                            }
      
                        />
                       </div>
                      
                      </div>
                      <div className="grid grid-cols-4 gap-4 mt-4">
                        {field.value.length >0  && field.value.map((img: {url: string}) => (
                          <div className="aspect-square rounded-md relative group"
                           key={img.url}
                          >
                            <Image
                              fill
                              src={img.url}
                              alt="Property Image"
                              className="object-cover object-center rounded-md"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                              onClick={()=>field.onChange(field.value.filter((current: {url: string}) => current.url !== img.url))}
                            >
                              <X className="size-4 text-white font-bold" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                   
                  </div>
                )}
              />
              <FormField 
                control={form.control}
                name="videoUrl"
                render={({ field }) => (  
               <div className="space-y-2">
                      <h4 className="font-medium text-stone-700">Property Video Tour</h4>
                      <p className = 'text-sm  text-stone-900/85 font-light'>
                         This is optional but highly recommended
                      </p>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                       <VideoUpload onChange={field.onChange} disabled={false}/>  
                      </div>
                      {field.value &&(
                           <div className="relative mt-4">
                           <video 
                             className="w-full rounded-lg"
                             controls
                             src={field.value}
                           />
                           <Button
                             variant="destructive"
                             size="icon"
                             className="absolute top-2 right-2"
                             onClick={() => field.onChange(null)}
                           >
                             <X className="size-4 text-white font-bold" />
                           </Button>
                         </div>
                      )}
                    </div>
                )}
              />
            </section>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              type={currentPage === 3 ? "submit" : "button"}
              onClick={() => {
                if (currentPage < 3) {
                  setCurrentPage((prev) => Math.min(3, prev + 1));
                }
              }}
            >
              {currentPage === 3 ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

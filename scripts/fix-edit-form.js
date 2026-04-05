const fs = require('fs');

const path = 'c:/Users/Admin/OneDrive/Desktop/apartimenti/features/listings/components/edit-listing-form.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix 1: early return
const target1 = `  if (!data) return;
  <div className=" w-full min-h-screen justify-center items-center font-bold">
    <h1 className="text-4xl max-w-md tracking-normal leading-relaxed">
      Sorry, looks like there is no listing found !
    </h1>
  </div>;`;

const replacement1 = `  if (!data) {
    return (
      <div className=" w-full min-h-screen flex justify-center items-center font-bold">
        <h1 className="text-4xl max-w-md tracking-normal leading-relaxed">
          Sorry, looks like there is no listing found !
        </h1>
      </div>
    );
  }`;

content = content.replace(target1.replace(/\n/g, '\r\n'), replacement1.replace(/\n/g, '\r\n'));

// Fix 2: Validation
const target2 = `            <Button
              type={currentPage === 3 ? "submit" : "button"}
              onClick={() => {
                if (currentPage < 3) {
                  setCurrentPage((prev) => Math.min(3, prev + 1));
                }
              }}
            >
              {currentPage === 3 ? "Save changes" : "Next"}
            </Button>`;

const replacement2 = `            <Button
              disabled={form.formState.isSubmitting}
              type={currentPage === 3 ? "submit" : "button"}
              onClick={async () => {
                if (currentPage === 1) {
                  const isValid = await form.trigger([
                    "title",
                    "typeId",
                    "priceType",
                    "purchasePrice",
                    "rentalPrice",
                    "locationId",
                    "area",
                  ]);
                  if (isValid) setCurrentPage(2);
                } else if (currentPage === 2) {
                  const isValid = await form.trigger([
                    "statusId",
                    "categoryId",
                    "bedrooms",
                    "bathrooms",
                    "description",
                    "amenities",
                  ]);
                  if (isValid) setCurrentPage(3);
                }
              }}
            >
              {currentPage === 3 ? "Save changes" : "Next"}
            </Button>`;

content = content.replace(target2.replace(/\n/g, '\r\n'), replacement2.replace(/\n/g, '\r\n'));

fs.writeFileSync(path, content);
console.log("Success");

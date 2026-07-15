import {
  Camera,
  ImagePlus,
  Trash2,
} from "lucide-react";

const ReceiptImageUpload = ({ images, setImages }) => {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            Receipt Images
          </h2>

          <p className="text-sm text-slate-500">
            Upload receipt or beam photos.
          </p>

        </div>

      </div>

      <div className="mt-6 flex flex-wrap gap-4">

        {/* Camera */}

        <label className="cursor-pointer rounded-xl border border-dashed p-5 hover:bg-slate-50">

          <Camera className="mx-auto mb-2" />

          <p className="text-sm">
            Camera
          </p>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            hidden
            onChange={handleFiles}
          />

        </label>

        {/* Gallery */}

        <label className="cursor-pointer rounded-xl border border-dashed p-5 hover:bg-slate-50">

          <ImagePlus className="mx-auto mb-2" />

          <p className="text-sm">
            Gallery
          </p>

          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFiles}
          />

        </label>

      </div>

      {images.length > 0 && (

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

          {images.map((image, index) => (

            <div
              key={index}
              className="relative rounded-xl overflow-hidden border"
            >

              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="h-28 w-full object-cover"
              />

              <button
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white"
              >
                <Trash2 size={15} />
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ReceiptImageUpload;
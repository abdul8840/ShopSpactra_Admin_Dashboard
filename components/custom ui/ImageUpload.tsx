/* eslint-disable react/jsx-key */
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';
import { Plus, Trash } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div className="">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div className='relative w-[200px] h-[200px]'>
            <div key={url} className="absolute top-0 right-0 z-10">
                <Button 
                    onClick={() => onRemove(url)}
                    size="sm"
                    className='bg-[#FF0000] text-white'
                >
                    <Trash className='h-4 w-4' />
                </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="j8iw5gl0" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button onClick={() => open()} className="bg-gray-500 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;

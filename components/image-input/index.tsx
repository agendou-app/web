import axios from 'axios'

import { ImageIcon, UpdateIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { cn } from '@/lib/utils'

export function ImageInput() {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState([])
  const maxNumber = 1

  const onChange = async (imageList: ImageListType) => {
    if (imageList[0].file) {
      const formData = new FormData()
      formData.append('image', imageList[0].file)

      try {
        setIsLoading(true)
        const response = await axios.post<{ data: { url: string } }>(
          'https://api.imgbb.com/1/upload',
          formData,
          {
            params: {
              key: process.env.NEXT_PUBLIC_IMGBB_API_KEY,
            },
          },
        )
        setIsLoading(false)

        const url = response.data.data.url
        setImages(imageList as never[])
      } catch (error) {
        setImages(images)
        console.error(error)
      }
    }
  }

  return (
    <ImageUploading
      multiple={false}
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({ imageList, onImageUpload, onImageUpdate }) => (
        <>
          {imageList.length === 0 ? (
            <button
              onClick={onImageUpload}
              disabled={isLoading}
              className="flex aspect-video h-[72px] items-center justify-center gap-2 rounded-md border text-lg text-muted-foreground"
            >
              {isLoading ? (
                <UpdateIcon className="animate-spin opacity-100" />
              ) : (
                <>
                  <ImageIcon width={24} height={24} />
                  <p>Logo</p>
                </>
              )}
            </button>
          ) : (
            imageList.map((image, index) => (
              <div
                key={index}
                className="flex aspect-video h-[72px] cursor-pointer items-center justify-center overflow-hidden rounded-md border"
                onClick={() => {
                  if (!isLoading) {
                    onImageUpdate(index)
                  }
                }}
              >
                {isLoading ? (
                  <UpdateIcon className="animate-spin opacity-100" />
                ) : (
                  <Image
                    src={image['data_url']}
                    alt="Logo"
                    width="100"
                    height="100"
                    className="w-full"
                  />
                )}
              </div>
            ))
          )}
        </>
      )}
    </ImageUploading>
  )
}

import { ImageInput } from '@/components/image-input'

export function LogoForm() {
  return (
    <div id="image-upload-form-container" className="py-4">
      <div className="rounded-md border">
        <div className="flex p-6">
          <div className="flex-1">
            <h3 className="text-base">Upload de Imagem</h3>
            <p className="pb-3 pt-1 text-sm text-muted-foreground">
              Envie uma imagem para sua agenda
            </p>
          </div>

          <ImageInput />
          {/* <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              field.onChange(e.target.files[0])
            }
          }}
        /> */}
        </div>

        <footer className="flex justify-end border-t bg-accent/50 px-6 py-3"></footer>
      </div>
    </div>
  )
}
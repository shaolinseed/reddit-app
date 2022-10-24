import React, { useState } from "react"

const useUploadFile = () => {
  const [uploadedFile, setUploadedFile] = useState<string>()

  const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()

    if (event.target.files?.[0]) {
      fileReader.readAsDataURL(event.target.files[0])
    }

    fileReader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setUploadedFile(readerEvent.target.result as string)
      }
    }
  }

  return {
    uploadedFile,
    setUploadedFile,
    onUploadFile,
  }
}
export default useUploadFile

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, CheckCircle, Loader2, XCircle } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/config"


interface UploadResponse{
    message:string,
    details:{
        status:string,
        chunks:number 
    }
}

export function UploadSection(){

    const [isUploading,setIsUploading]=useState(false)
    const [uploadResult,setUploadResult]=useState<UploadResponse | null>(null)
    const [error,setError]=useState<string | null> (null)
    const [filename,setFilename]=useState<string | null>(null)


    const onDrop=useCallback(async(acceptedFiles:File[])=>{

        const file=acceptedFiles[0];

        if(!file) return 

        if(file.type!=='application/pdf'){
            setError('please upload a PDF file only')
            setUploadResult(null)
            setFilename(null)
            return 

        }

        setFilename(file.name)
        setIsUploading(true)
        setError(null)
        setUploadResult(null)

        try{
            const formData=new FormData()
            formData.append("file",file)

            const response=await fetch(API_ENDPOINTS.upload,{
                method:"POST",
                body:formData
            })

            if(!response.ok){
                const errorData=await response.json().catch(()=>({message:'upload failed please try again'}))
                throw new Error(errorData.message || 'upload failed')

            }

            const result:UploadResponse=await response.json() 
            setUploadResult(result)


        }catch(err){
            setError(err instanceof Error ? err.message : "an unkown error occured")
            setFilename(null)

        }finally{
            setIsUploading(false)

        }
    },[])

    const {getRootProps,getInputProps,isDragActive,open}=useDropzone({
        onDrop,
        accept:{"application/pdf":[".pdf"]},
        multiple:false,
        disabled:isUploading,
        noClick:true,
        noKeyboard:true
    })

    const renderContent=()=>{
        if(isUploading){
            return(
                <>
                   <Loader2 className="h-10 w-10 text-primary animate-spin"></Loader2>
                   <p className="mt-4 text-lg font-medium text-primary">
                    Uploading "{filename}"....
                   </p>
                   <p className="text-sm text-muted-foreground">
                    Please wait while we process your document 
                   </p>

                </>
            )
        }

        if(uploadResult && filename){
            return(
                <>
                   <CheckCircle className="h-10 w-10 text-green-600"/>
                   <p className='mt-4 text-lg font-medium text-foreground'>
                     "{filename}"
                   </p>
                   <p>
                     u can ask question anout this docunent 
                   </p>
                </>
            )
        }

        return(
            <>
               <Upload className="h-10 w-10 text-muted-foreground"/>
               <p className="mt-4 text-lg font-medium text-foreground">
                    Drag and drop your pdf here or {""}
                    <span className="font-semibold text-primary ">
                        Browse files 
                    </span>
               </p>
               <p className="text-sm text-muted-foreground">
                    Maximum file size : 50 MB 
               </p>
            </>
        )
    }

    return(
        <>
           <Card className="w-full bg-card shadow-lg shadow-blue-500/5 border border-border/60">
              <CardContent className="p-6">
                    <div className="text-center mb-6 ">
                            <h2 className="text-2xl font-semiboldtext-black ">
                                Upload your document 
                            </h2>
                            <p className="text-muted-foreground mt-1">
                                Start by providing a PDF document  to analyze 
                            </p>
                    </div>

                    <div {...getRootProps()}
                       className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer duration-300 ease-in-out
                                        ${isDragActive ? "border-primary bg-blue-50" :"border-border/100 bg-background hover:bg-gray-200"}
                                        ${isUploading  || uploadResult ? "cursor-default opacity-90" : ""}
                     `
                    }>
                         <input {...getInputProps()}/>
                         <div className="flex flex-col items-center justify-center gap-2">
                            {renderContent()}
                            {!isUploading && (
                                <Button type="button" onClick={open} className="mt-4">
                                    Browse PDF
                                </Button>
                            )}
                         </div>
                    </div>

                    {/* error message - appears below the dropzone */}
                    {
                        error && (
                            <div className="mt-4 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                                    <XCircle className="h-5 w-5 flex-shrink-0"/>
                                    <span className="font-medium">
                                        {error}
                                    </span>
                            </div>
                        )
                    }

              </CardContent>

           </Card>
        </>
    )

}
import { useState } from "react";
import { Card,CardContent,CardHeader,CardTitle } from "./ui/card";
import { BookOpen, ChevronDown, ChevronRight, FileText } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Button } from "./ui/button";


interface Source{
    page:number,
    content:string 
}

interface QueryResponse{
    answer:string,
    sources:Source[] 
}

interface AnswerSectionProps{
    response?:QueryResponse | null;
}

export function AnswerSection({response}:AnswerSectionProps){

    const [isSourcesOpen,setIsSourcesOpen]=useState(false)

    if(!response){
        return(
            <>
               <Card className="w-full opacity-50">
                 <CardContent className="p-6">
                        <div className="text-center py-8">
                             <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
                             <h3 className="text-lg font-medium text-muted-foreground">
                                No answer yet 
                             </h3>
                             <p className="text-sm text-muted-foreground">
                                Upload a PDF and ask a question to see answer here 
                             </p>
                        </div>  
                 </CardContent> 
               </Card>
            </>
        )
    }

    return(
        <>
           <Card className="w-full">
                <CardHeader >
                    <CardTitle className="flex items-center gap-2 text-primary">
                        <BookOpen className="h-5 w-5"/>
                        Answer 
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-6 pt-0">
                    {/* answer  */}
                    <div className="mb-6">
                        <div className="prose prose-sm max-w-none">
                            <p className="text-foreground leading-relaxed whietspace-pre-wrap">
                                {response.answer}
                            </p>
                        </div>
                    </div>

                    {/* sources  */}
                    {
                        response.sources && response.sources.length >0 && (
                            <div className="border-t pt-4">
                                <Collapsible open={isSourcesOpen}>
                                  <CollapsibleTrigger asChild>
                                     <Button variant='ghost' className='w-full justify-between p-0 h-auto'>
                                       <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4"/>
                                            <span className="font-medium">
                                                Sources ({response.sources.length})
                                            </span>
                                       </div>
                                       {
                                        isSourcesOpen ? <ChevronDown className="h-4 w-4"/> : <ChevronRight className="h-4 w-4"/>
                                       }
                                     </Button>
                                  </CollapsibleTrigger>

                                  <CollapsibleContent className="mt-4">
                                       <div className="space-y-3">
                                            {
                                                response.sources.map((source,indx)=>(
                                                    <div key={indx} className="p-3 bg-muted-50 rounded-lg border border-border">

                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-2xl">
                                                                Page {source.page}
                                                            </div>
                                                        </div>

                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                            {source.content}
                                                        </p>
                                                    </div>
                                                ))
                                            }
                                       </div>
                                  </CollapsibleContent>

                                </Collapsible>
                            </div>
                        )
                    }
                </CardContent>
           </Card>
        </>
    )
}
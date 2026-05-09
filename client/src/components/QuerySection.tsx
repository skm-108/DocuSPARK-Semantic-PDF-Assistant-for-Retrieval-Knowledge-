
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, Send, Loader2 } from 'lucide-react'
import { API_ENDPOINTS } from '@/lib/config'

interface QueryResponse {
  answer: string
  sources: Array<{
    page: number
    content: string
  }>
}

interface QuerySectionProps {
  onAnswerReceived?: (response: QueryResponse) => void
}

export function QuerySection({ onAnswerReceived }: QuerySectionProps) {
  const [question, setQuestion] = useState('')
  const [isQuerying, setIsQuerying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!question.trim()) {
      setError('Please enter a question')
      return
    }

    setIsQuerying(true)
    setError(null)

    try {
      const response = await fetch(API_ENDPOINTS.query, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question.trim() }),
      })

      if (!response.ok) {
        throw new Error('Query failed')
      }

      const result: QueryResponse = await response.json()
      onAnswerReceived?.(result)
      setQuestion('')
    } catch (err) {
      setError('Failed to get answer. Please upload a PDF first.')
      console.error('Query error:', err)
    } finally {
      setIsQuerying(false)
    }
  }

  return (
    <Card className="w-full border border-border/50 shadow-sm rounded-2xl mt-25">
      <CardContent className="p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center gap-2 border-b pb-3">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Ask a Question</h2>
        </div>
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="What would you like to know from the PDF?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isQuerying}
              className="flex-1 rounded-xl"
            />
            <Button 
              type="submit" 
              disabled={isQuerying || !question.trim()}
              className="px-6 rounded-xl"
            >
              {isQuerying ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Ask
                </>
              )}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100/70 border border-red-300 text-red-800 text-sm rounded-lg flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          {/* Loading State */}
          {isQuerying && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing your question...
            </div>
          )}
        </form>

        {/* Helper Text */}
        <div className="text-xs text-muted-foreground bg-muted/40 p-3 rounded-lg">
           Tip: You can ask about <span className="font-medium">summaries</span>, <span className="font-medium">specific pages</span>, or <span className="font-medium">key points</span> from the PDF.
        </div>
      </CardContent>
    </Card>
  )
}
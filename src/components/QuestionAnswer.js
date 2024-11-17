import React, {useState} from 'react';
import TextHighlighter from './TextHighlighter';

export default function QuestionAnswer ({ article, dataset, dataset_id}) {
    const { context, question, answer } = dataset;
    const {pseudonymized_body} = article
    const [highlightedAnswer, setHighlightedAnswer] = useState(answer);
    const [highlightedContext, setHighlightedContext] = useState(context);
  
    // Callback to update the highlighted answer
    const handleAnswerHighlightChange = (newHighlightedText) => {
      setHighlightedAnswer(newHighlightedText);
    };
  
    // Callback to update the highlighted context
    const handleContextHighlightChange = (newHighlightedText) => {
      setHighlightedContext(newHighlightedText);
    };
  
    return (
        <div>
            <h4>Question</h4>
            <p>{question}</p>
            <h4>Context</h4>
            <p>{highlightedContext}</p>
            <TextHighlighter
                inputText={pseudonymized_body}
                defaultText={context}
                onHighlightChange={handleContextHighlightChange} // Pass callback
            />
            <h4>Answer:</h4>
            {console.log(highlightedAnswer, answer, highlightedAnswer!=answer)}
            <p>{answer}</p>
            <TextHighlighter
                inputText={context}
                defaultText={answer}
                onHighlightChange={handleAnswerHighlightChange} // Pass callback
            />
        </div>
    );
};

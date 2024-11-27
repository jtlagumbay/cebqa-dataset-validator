import React, {useState, useEffect, useCallback} from 'react';
import TextHighlighter from './TextHighlighter';

export default function QuestionAnswer ({ article, dataset, handleDatasetChange}) {
    const { context, question, answer, answer_start, answer_end, context_start, context_end } = dataset;
    const {pseudonymized_body} = article
    const [updatedDataset, setUpdatedDataset] = useState(dataset)

    
    // Callback to update the highlighted answer
    const handleAnswerHighlightChange = useCallback(({text, start_index, end_index}) => {
        // console.log(start_index)
        setUpdatedDataset(prevState => ({
            ...prevState,
            "answer": text,
            "answer_start": start_index,
            "answer_end": end_index,
        }));
    }, []);
  
    // Callback to update the highlighted context
    const handleContextHighlightChange = useCallback(({text, start_index, end_index}) => {
        // console.log(start_index)
        setUpdatedDataset(prevState => ({
            ...prevState,
            "context": text,
            "context_start": start_index,
            "context_end": end_index,
        }));
    }, []);

    const handleQuestionChange = (e) => {
        const newQuestion = e.target.value;
        setUpdatedDataset(prevState => ({
            ...prevState,
            "question": newQuestion,
        }));
    };

    const handleUnusableChange = (e) => {
        setUpdatedDataset(prevState => ({
            ...prevState,
            "unusable": !prevState.unusable,
        }));
    };
    useEffect(() => {
        // console.log("Updated dataset:", updatedDataset); // Check updatedDataset here
        handleDatasetChange(updatedDataset);
    }, [updatedDataset]); 
  
    return (
        <div>
            <h4>Question</h4>
            <p><strong>Original: </strong>{question}</p>
            {/* Editable input for the question */}
            <input 
                type="text" 
                value={updatedDataset.question} 
                onChange={handleQuestionChange} 
                className="form-control" 
                placeholder="Question"
            />
            <h4 className="mt-2">Context</h4>
            <p><strong>Original: </strong>{context}</p>
            <p><strong>Final: </strong>{updatedDataset.context}</p>
            <p><strong>Original: </strong>{context_start}:{context_end}</p>
            <p><strong>Final: </strong>{updatedDataset.context_start}:{updatedDataset.context_end}</p>

            <TextHighlighter
                inputText={pseudonymized_body}
                defaultText={context}
                onHighlightChange={handleContextHighlightChange}
                defaultStartIndex={context_start}
                defaultEndIndex={context_end}
            />
            <h4>Answer:</h4>
            <p><strong>Original: </strong>{answer}</p>
            <p><strong>Final: </strong>{updatedDataset.answer}</p>
            <p><strong>Original: </strong>{answer_start}:{answer_end}</p>
            <p><strong>Final: </strong>{updatedDataset.answer_start}:{updatedDataset.answer_end}</p>
            <TextHighlighter
                key={updatedDataset.context}
                inputText={updatedDataset.context}
                defaultText={answer}
                onHighlightChange={handleAnswerHighlightChange}
                defaultStartIndex={answer_start}
                defaultEndIndex={answer_end}
            />

            <h4>!!! UNUSABLE QUESTION.</h4>
            <div className="form-check">
                <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="usableCheck" 
                    checked={updatedDataset.unusable}
                    onChange={(e) => {handleUnusableChange(e)}}
                />
                <label className="form-check-label" htmlFor="usableCheck">
                <strong>Check this box only if the question, context, and answer are completely unrelated to the article.</strong> If any component (Question, Context, or Answer) is incorrect but can be corrected, please make the necessary adjustments instead and leave the box unchecked.
                </label>
            </div>


        </div>
    );
};

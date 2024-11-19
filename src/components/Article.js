// BlogPost.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TextCompare from './TextCompare';
import QuestionAnswer from './QuestionAnswer';
import Accordion from 'react-bootstrap/Accordion';
import { supabase } from '../utils/supabaseClient';

export default function Article (){
    const { id } = useParams(); // Extract the 'id' parameter from the route
    const [article, setArticle] = useState({
      "id": 0,
      "url": "",
      "title": "",
      "author": "",
      "date": "",
      "body": "",
      "pseudonymized_body": "",
      "pseudonymized_title": "",
      "updated_on":""
  });
  const [dataset, setDataset] = useState([])

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };


  // Fetch article information
  const fetchArticle = async () => {
    // Fetch Article Info
    const { data, error } = await supabase
      .from('articles') // Replace with your table name
      .select('*')
      .eq('id', id);

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setArticle(data[0])
    }
  };

      // Fetch article information
  const fetchQuestions = async () => {
    // Fetch Article Info
    const { data, error } = await supabase
      .from('questions') // Replace with your table name
      .select('*')
      .eq('article_id', id);

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      // console.log(data)
      setDataset(data)
    }
  };

    useEffect(() => {
      fetchArticle();
      fetchQuestions()
    }, []);

    return (
        <div>
            <h1>{article.pseudonymized_title}</h1>
            <p>Article ID: {article.id}</p>
            <p>Article Link: <a href={article.url} target="_blank">{article.url}</a></p>

            <div>
              <button
                className="btn btn-primary mb-3"
                type="button"
                onClick={toggleCollapse}
                aria-expanded={isOpen}
                aria-controls="collapseTextCompare"
              >
                {isOpen ? 'Hide' : 'Show'} Article
              </button>
              <div
                className={`collapse ${isOpen ? 'show' : ''}`}
                id="collapseTextCompare"
              >
                <TextCompare
                  text1={article.body}
                  text2={article.pseudonymized_body}
                  title="Pseudonymized Article"
                />
              </div>
            </div>
            <br />
            <Accordion defaultActiveKey="0">
            {
                dataset.map((item, index) => (
                    <Accordion.Item eventKey={index}>
                        <Accordion.Header>Question #{item.id}: {item.question}</Accordion.Header>
                        <Accordion.Body>
                        <QuestionAnswer
                            key={article.id}
                            article={article}
                            dataset={item}
                        />
                        </Accordion.Body>
                    </Accordion.Item>
                ))
            }
            </Accordion>

        
        </div>
    );
};

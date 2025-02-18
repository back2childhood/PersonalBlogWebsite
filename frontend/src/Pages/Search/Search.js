import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Card, ErrorText, ExpertLink, GridContainer, HomeWrapper, Title } from './Style'

const Search = () => {
    const [experts, setExperts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const params = useParams()

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const response = await fetch("http://localhost:8080/search/" + keywords, {  // Ensure correct API endpoint
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to fetch expert');
                }
                const data = await response.json();
                setExperts(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchExperts();
    }, []);

    return (
        <HomeWrapper>
            <Title>Experts: " {params.keywords} "</Title>
            {error && <ErrorText>{error}</ErrorText>}
            <GridContainer>
                {experts.map((expert) => (
                    <Card key={expert.id}>
                        <ExpertLink onClick={() => navigate(`/detail/${expert.id}`)}>
                            {expert.name}
                        </ExpertLink>
                        <p>{expert.intro.substring(0, 100)}...</p>
                    </Card>
                ))}
            </GridContainer>
        </HomeWrapper>
    );
};

export default Search;

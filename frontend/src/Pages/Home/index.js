// React Home Page Component
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeWrapper, Title, GridContainer, ErrorText, Card, ExpertLink } from './Style';

const Home = () => {
    const [experts, setExperts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchExperts = async () => {
    //         try {
    //             const response = await fetch("http://localhost:8080/experts", {  // Ensure correct API endpoint
    //                 method: "GET",
    //                 headers: { "Content-Type": "application/json" }
    //             });
    //             console.log(response);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch expert');
    //             }
    //             const data = await response.json();
    //             setExperts(data);
    //         } catch (err) {
    //             setError(err.message);
    //         }
    //     };

    //     fetchExperts();
    // }, []);

    return (
        <HomeWrapper>
            <Title>Experts</Title>
            {error && <ErrorText>{error}</ErrorText>}
            <GridContainer>
                {/* {experts.map((expert) => (
                    <Card key={expert.id}>
                        <ExpertLink onClick={() => navigate(`/detail/${expert.id}`)}>
                            {expert.name}
                        </ExpertLink>
                        <p>{expert.intro.substring(0, 100)}...</p>
                    </Card>
                ))} */}
            </GridContainer>
        </HomeWrapper>
    );
};

export default Home;

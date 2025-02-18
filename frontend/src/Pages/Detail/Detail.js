import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { HomeWrapper, Card, ErrorText, Title } from "./Style";


const Detail = () => {

    const params = useParams()
    // console.log(params.id.toString());

    const [expert, setExpert] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchExpert = async () => {
            try {
                const response = await fetch("http://localhost:8080/detail/" + params.id, {  // Ensure correct API endpoint
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                // console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to fetch experts');
                }
                const data = await response.json();
                setExpert(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchExpert();
    }, []);

    // const filteredExperts = experts.filter(expert =>
    //     expert.name.toLowerCase().includes(search.toLowerCase())
    // );

    return (
        <HomeWrapper>
            {error && <ErrorText>{error}</ErrorText>}
            <Title>{expert.name}</Title>
            <Card key={expert.id}>
                {/* {expert.name} */}
                <p>{expert.intro}</p>
            </Card>
        </HomeWrapper>
    );
}

export default Detail;
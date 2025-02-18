import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../apis/axiosConfig';
import { AddWrapper, Button, Input, Introput, Title } from './Style';

const Add = () => {
    const [name, setName] = useState('');
    const [intro, setIntro] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // console.log(name + " " + intro + " " + price);
        e.preventDefault();
        setError('');

        try {
            // const response = await fetch(api.post("/add", { name: name, intro: intro, price: price }));

            const response = await fetch("http://localhost:8080/add", {  // Ensure correct API endpoint
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, intro, price })
            });
            console.log(response);

            if (!response.ok) {
                setError('Failed to add expert. Please try again.');
                return;
            }

            alert('Expert added successfully!');
            navigate('/experts'); // 提交成功后返回首页
        } catch (err) {
            setError('Error: ' + err.message);
        }
    };

    return (
        <AddWrapper>
            <Title>Add New Expert</Title>
            <form onSubmit={handleSubmit}>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <Introput value={intro} onChange={(e) => setIntro(e.target.value)} placeholder="Intro" required />
                <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
                <Button type="submit">Submit</Button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </AddWrapper>
    );
};

export default Add;

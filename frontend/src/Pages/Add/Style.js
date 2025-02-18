import styled from 'styled-components';

export const AddWrapper = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
  font-family: 'Arial', sans-serif;
`;

export const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const Introput = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  height: 200px; 
  resize: vertical;
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  font-size: 16px;
  color: white;
  background: #ec6149;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;
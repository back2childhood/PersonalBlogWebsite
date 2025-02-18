import styled from 'styled-components';

export const HomeWrapper = styled.div`
  max-width: 1200px;
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

export const ErrorText = styled.p`
  color: red;
  text-align: center;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  padding: 20px 0;
`;

export const Card = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background 0.3s;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    background: #f1f1f1;
  }
`;

export const ExpertLink = styled.a`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  cursor: pointer;
  display: block;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  font-size: 16px;
  color: white;
  background: #007bff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;
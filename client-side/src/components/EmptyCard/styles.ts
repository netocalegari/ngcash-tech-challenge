import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  margin-bottom: 2rem;
  margin-left: 16rem;

  background-color: #F8F9FA;

  border-left: 4px solid #E9ECEF;
  border-radius: 4px;

  height: 5.5rem;

  div:first-child {
    width: 20.5rem;
    height: 0.8rem;

    background-color: #E9ECEF;

    margin-left: 1rem;
  }
`;

const SmallDiv = styled.div`
  width: 10rem;
  height: 0.8rem;

  background-color: #E9ECEF;

  margin-left: 1rem;
`;


export {Container, SmallDiv};
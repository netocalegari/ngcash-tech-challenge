import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  margin-bottom: 2rem;
  margin-left: 16rem;

  background-color: #f8f9fa;

  border-left: 4px solid #e9ecef;
  border-radius: 4px;

  height: 5.5rem;

  div:first-child {
    width: 20.5rem;
    height: 0.8rem;

    background-color: #e9ecef;

    margin-left: 1rem;
  }
`;

const SmallDiv = styled.div`
  width: 10rem;
  height: 0.8rem;

  background-color: #e9ecef;

  margin-left: 1rem;
`;

export { Container, SmallDiv };

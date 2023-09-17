import styled from "@emotion/styled";

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #000;
  margin: 0 5px;
  animation: dotAnimation 1s infinite alternate;
  
  @keyframes dotAnimation {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
`;
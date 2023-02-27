import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  .welcome-box {
    margin: 3rem 0;
    padding-bottom: 0.9rem;
    border-bottom: 0.5px solid black;
  }
`;

const Home = () => {
  const [getvalue, setgetvalue] = useState("");
  // react-redux section
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Container>
      <Wrapper>
        {isLoggedIn && (
          <div className="welcome-box">
            <h5>Welcome to Mail Box Client</h5>
          </div>
        )}
        {!isLoggedIn && (
          <div className="alert alert-danger display-6 my-4">
            login required to access the mails
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;

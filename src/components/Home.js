import styled from "styled-components";
import Header from "./Header";
const Home = (props) => {
  return (
    
    <Container>
      <Header />
      <Section>
        <h5>
          <a>Hiring in a hurry? - </a>
        </h5>
        <p>
          Find talanted pros in record time with Upwork and keep business
          moving.
        </p>
      </Section>

    </Container>
  );
};

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;
// eslint-disable-next-line
const Content = styled.div`
  max-width: 1128px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: border-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default Home;

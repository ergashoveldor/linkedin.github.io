import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LogOutAPI } from '../actions';
import Header from './Header';
import Leftside from './Leftside';
import Main from './Main';
import Rightside from './Rightside';

const Home = (props) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header />
      <Section>
        {/* test uchun */}
        <button onClick={() => props.LogOut(navigate)}>Chiqish</button>
        {/* test uchun */}
        <h5>
          <a>Hiring in a hurry? - </a>
        </h5>
        <p>
          Find talanted pros in record time with Upwork and keep business
          moving.
        </p>
      </Section>
      <Layout>
        <Leftside />
        <Main />
        <Rightside />
      </Layout>
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

const Layout = styled.div`
  display: grid;
  grid-template-areas: 'leftside main rightside';
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  grid-template-rows: auto;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  LogOut: (navigate) => dispatch(LogOutAPI(navigate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

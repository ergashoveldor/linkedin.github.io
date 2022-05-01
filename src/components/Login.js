import styled from 'styled-components';

const Login = (props) => {
  return (
    <Container>
      <Nav>
        <a href='/'>
          <img src="/images/login-logo.svg" alt='' />
        </a>
        <div>
          <Join>Join now</Join>
          <Signin>Sign in</Signin>
        </div>
      </Nav>
    </Container>
  )
};

const Container = styled.div`
  padding: 0;
`;


const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  font-weight: bold;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0,0,0,0.9);
    text-decoration: none;
  }
`;

const Signin = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);

  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    text-decoration: none;
  }
  border: 0;
  cursor: pointer;
  text-decoration: none;
  height: 40px;
`;


export default Login;
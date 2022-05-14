import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { LogOutAPI } from '../actions';


const Header = (props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src="/images/home-logo.svg" alt="" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder='Search' />
          </div>
          <SearchIcon>
            <img src="/images/search-icon.svg" alt="" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className='active'>
              <a href="">
                <img src="/images/nav-home.svg" alt="" />
                <span>Home</span>
              </a>
            </NavList>
            <NavList>
              <a href="">
                <img src="/images/nav-network.svg" alt="" />
                <span>My Network</span>
              </a>
            </NavList>
            <NavList>
              <a href="">
                <img src="/images/nav-jobs.svg" alt="" />
                <span>Jobs</span>
              </a>
            </NavList>
            <NavList>
              <a href="">
                <img src="/images/nav-messaging.svg" alt="" />
                <span>Messaging</span>
              </a>
            </NavList>
            <NavList>
              <a href="">
                <img src="/images/nav-notifications.svg" alt="" />
                <span>Notifications</span>
              </a>
            </NavList>

            <User>
              <a href="">
                {props.user && props.user.photoURL ? 
                <img src={props.user.photoURL}/> : 
                <img src="/images/user.svg" alt="" />}
                <span>
                  Me
                </span>
              </a>
              <button onClick={() => props.LogOut(navigate)}>Sign Out</button>
            </User>

            <Work>
              <a href="
              ">
                <img src="/images/nav-work.svg" alt="" />
                <span>Work
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>


    </Container>
  )
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  top: 0;
  padding: 0 24px;
  position: fixed;
  width: 100vw;
  z-index: 100;
`;


const Content = styled.div`
  display: flex;
  align-items:  center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;  
      vertical-align: text-top;
      outline: none;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.15s;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: white;
    width: 100%;

  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;

  .active {
    span:after {
      content: '';
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0,0,0,0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
    min-height: 42px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }
  
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }

  &:hover, &:active {
    a {
      span {
        color: rgba(0,0,0,0.9);
      }
    }
  }
`;

const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }

  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    border: none;
    overflow: hidden;
    transform: scale(1);
    transition: transform .2s ease-in-out;
    
  }

  span {
    display: flex;
    align-items: center;
  }

  
  button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      border: none;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
      cursor: pointer;
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0,0,0,0.08);
`;


const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};  

const mapDispatchToProps = (dispatch) => ({
    LogOut: (navigate) => dispatch(LogOutAPI(navigate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);


import styled from "styled-components";
import themaIcon from "../assets/icons/themaIcon.svg";
import search from "../assets/icons/search.svg";
import "../utils.css";
export default function Header() {
  return (
    <Wrapper className="container">
      <Heading>Менеджер заказов</Heading>
      <InputWrapper>
        <img src={search} alt="Поиск" />
        <Input placeholder="⌘+Л поиск по имени" type="text" />
      </InputWrapper>
      <Button>
        <img src={themaIcon} alt="Изменить тему" />
      </Button>
      <Button>Выйти</Button>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  background-color: rgba(255, 255, 255, 0.08);
  padding-top: 8px;
  padding-bottom: 8px;
`;
const InputWrapper = styled.div`
  border-radius: 8px;
  margin-left: auto;
  border: 1px solid rgba(255, 255, 255, 0.16);
  padding: 7px 8px 7px 36px;
  position: relative;
  width: 100%;
  max-width: 260px;
  min-width: 175px;
  background-color: #1a1a1a;
  & img {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
const Input = styled.input`
  width: 100%;
  background-color: transparent;
  color: white;
  &::placeholder {
    color: rgba(255, 255, 255, 0.64);
  }
`;
const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  height: 24px;
  font-size: 11px;
  line-height: 16px;
  color: white;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h1`
  font-size: 18px;
  font-weight: 500;
`;

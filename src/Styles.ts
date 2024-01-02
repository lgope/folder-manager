import styled from 'styled-components';

export const Input = styled.input`
  width: 95%;
  height: 45px;
  color: #5e5e5e;
  display: block;
  font-size: 15px;
  padding: 10px 15px;
  outline: none;
  border: 1px solid #dedede;
  border-radius: 5px;
  margin-bottom: 15px;
`;

export const FolderLi = styled.li`
  padding: 10px 0px 5px 14px;
  margin-bottom: -10px;
  min-width: 250px;

  &:last-child {
    margin-bottom: 0;
  }

  h5 {
    margin-top: 5px;
    margin-left: 20px;
    font-size: 18px;
    font-weight: 400;
    color: #8e8e8e;
  }
`;

export const Icon = styled.i`
  font-size: 35px;
  color: ${(props) => (props.color ? props.color : '#5e5e5e')};
  cursor: pointer;
`;

export const Button = styled.button`
  color: #5e5e5e;
  font-size: 15px;
  font-weight: 500;
  outline: none;
  margin: 0 5px;
  padding: 10px 35px;
  border: 2px solid #5e5e5e;
  border-radius: 8px;
  background: ${props => (props.color ? props.color : 'transparent')};
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;


import styled from "styled-components";
import usePagination from "../hooks/usePagination";
import { AiOutlineEllipsis } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Navigation = styled.nav``;

const Button = styled.button`
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  border: 0;
  margin: 0;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: normal;
  background-color: ${({ selected }) => (selected ? "#36dafa" : "#fff")};
  cursor: pointer;
  border-radius: 100%;
  width: 48px;
  height: 48px;

  &:hover {
    background-color: #ccc;
    color: #fff;
  }
  &:active {
    opacity: 0.8;
  }
`;

const Item = styled.li``;

const ItemList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  ${Item} + ${Item}{
    margin-left: 8px;
  }
`;

const Pagination = ({
  count,
  page,
  onPageChange,
  disabled,
  siblingCount,
  boundaryCount,
}) => {
  const { items } = usePagination(
    count,
    page,
    onPageChange,
    disabled,
    siblingCount,
    boundaryCount
  );

  const getLabel = (item) => {
    if (typeof item === "number") return item;
    else if (item.indexOf("ellipsis") > -1) return <AiOutlineEllipsis />;
    else if (item.indexOf("prev") > -1) return <GrFormPrevious />;
    else if (item.indexOf("next") > -1) return <GrFormNext />;
  };

  return (
    <Navigation>
      <ItemList>
        {items.map(({ key, disabled, selected, onClick, item }) => (
          <Item key={key}>
            <Button disabled={disabled} selected={selected} onClick={onClick}>
              {getLabel(item)}
            </Button>
          </Item>
        ))}
      </ItemList>
    </Navigation>
  );
};

export default Pagination;

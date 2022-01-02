import styled from "styled-components";

export default function Filter({ items, selectedItem, onSelectItem }) {
  return (
    <Container>
      {items?.map((item) => (
        <FilterItem
          onClick={() => onSelectItem(item)}
          key={item.value}
          active={selectedItem?.value === item?.value}
        >
          {item.value}
        </FilterItem>
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin: 1rem 0;
`;

const FilterItem = styled.span`
  display: inline-block;
  padding: 2px 5px;
  border: 2px solid white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  color: ${(props) =>
    props.active ? props.theme.colors.white : props.theme.colors.black};
  background: ${(props) =>
    props.active
      ? props.theme.colors.accent.blue
      : props.theme.colors.secondary};

  :hover {
    background-color: ${(props) => props.theme.colors.accent.blue};
    color: ${(props) => props.theme.colors.white};
  }
`;

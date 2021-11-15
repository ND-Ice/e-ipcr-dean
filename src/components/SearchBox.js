import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router";

const searchedItems = [
  { title: "Joshua Dela Cruz", id: "494ssv2244" },
  { title: "Rhael Dela Cruz", id: "494ss224b4" },
  { title: "John Louie Dela Cruz", id: "494s4s2244" },
  { title: "Ezekiel Dela Cruz", id: "494ss2r244" },
  { title: "Dj Remix Dela Cruz", id: "494ss32244" },
];

export default function SearchBox({ ...otherProps }) {
  const [searching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getFilteredItem(searchedItems, searchText);
  }, [searchText]);

  const handleChange = (e) => setSearchText(e.target.value);
  const getFilteredItem = (arr, searchText) => {
    return setFilteredItems(
      arr.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  return (
    <Container>
      <SearchContainer>
        <Search
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          {...otherProps}
        />
        <SearchIconContainer>
          {!searching && <FiSearch className="search-icon" />}
          {searching && <Spinner animation="border" variant="light" />}
        </SearchIconContainer>
      </SearchContainer>

      {searchText && filteredItems && (
        <AutoCompleteContainer>
          {filteredItems.map((item) => (
            <SearchItem
              key={item.id}
              onClick={() => history.push(`/dashboard/faculties/${item.id}`)}
            >
              {item.title}
            </SearchItem>
          ))}
        </AutoCompleteContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const SearchContainer = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 0.5rem;
  display: flex;
  overflow: hidden;
`;

const Search = styled.input`
  padding: 0.5rem 1.5rem;
  background: none;
  border: none;
  outline: none;
  flex: 1;
`;

const SearchIconContainer = styled.div`
  width: 60px;
  height: 60px;
  display: inline-grid;
  place-items: center;
  background: ${(props) => props.theme.colors.accent.blue};
  cursor: pointer;

  .search-icon {
    width: 28px;
    height: 28px;
    color: ${(props) => props.theme.colors.white};
  }
`;

const AutoCompleteContainer = styled.ul`
  list-style: none;
  margin-top: 4px;
  background: ${(props) => props.theme.colors.secondary};
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: calc(100% - 60px);
`;

const SearchItem = styled.li`
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    background: ${(props) => props.theme.colors.accent.blue};
    color: ${(props) => props.theme.colors.white};
  }
`;

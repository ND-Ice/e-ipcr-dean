import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

import templateApi from "../api/template";
import { TemplateCard } from "../components/Cards";

export default function Template({ history }) {
  const [templates, setTemplates] = useState([]);

  const currentYear = new Date().getFullYear();
  const filteredTemplates = templates?.filter(
    (template) => parseInt(template?.targetYear) === currentYear
  );

  useEffect(() => {
    getTemplates();
  });

  const getTemplates = async () => {
    try {
      const templates = await templateApi.getTemplates();
      return setTemplates(templates.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreate = () => history.push("/dashboard/create-template");
  return (
    <Container>
      <Header>
        <h4 className="m-0">Templates</h4>
        <Button onClick={handleCreate}>Create</Button>
      </Header>
      <div className="mt-2">
        {filteredTemplates?.map((template) => (
          <TemplateCard template={template} />
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem;
`;

const Header = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

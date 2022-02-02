import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";

import templateApi from "../api/template";
import { TemplateCard } from "../components/Cards";
import {
  ReuseTemplate,
  TemplatedDeleteConfirmation,
} from "../components/Modals";
import { Loader } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getTemplate, templatesReceived } from "../store/template";

export default function Template({ history }) {
  const dispatch = useDispatch();
  const { list } = useSelector(getTemplate);
  const [showTemplates, setShowTemplates] = useState(false);
  const [template, setTemplate] = useState({});
  const [showDeleteTemplate, setShowDeleteTemplate] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();

  const filteredTemplates = list?.filter(
    (template) => parseInt(template?.targetYear) === currentYear
  );

  useEffect(() => {
    getTemplates();
  }, []);

  const getTemplates = async () => {
    try {
      setLoading(true);
      const templates = await templateApi.getTemplates();
      setLoading(false);
      return dispatch(templatesReceived(templates.data));
    } catch (error) {
      setLoading(false);
      return console.log(error);
    }
  };
  const handleCreate = () => history.push("/dashboard/create-template");

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Header>
            <h4 className="m-0">Templates</h4>
            <Button onClick={handleCreate}>Create</Button>
          </Header>
          <div className="mt-2">
            {filteredTemplates?.map((template) => (
              <TemplateCard
                key={template?._id}
                template={template}
                onDelete={() => {
                  setTemplate(template);
                  return setShowDeleteTemplate(true);
                }}
                onRecycle={() => {
                  setTemplate(template);
                  return setShowTemplates(true);
                }}
              />
            ))}
          </div>
        </Container>
      )}

      <Modal
        size="lg"
        show={showTemplates}
        onHide={() => setShowTemplates(false)}
      >
        <ReuseTemplate template={template} open={setShowTemplates} />
      </Modal>

      <Modal
        show={showDeleteTemplate}
        onHide={() => setShowDeleteTemplate(false)}
      >
        <TemplatedDeleteConfirmation
          template={template}
          open={setShowDeleteTemplate}
        />
      </Modal>
    </>
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

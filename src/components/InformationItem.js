import { Icons } from ".";
import styled from "styled-components";

export default function InformationItem(props) {
  const { children, icon } = props;
  return (
    <CardText>
      <p>
        {icon && (
          <Icons
            size={40}
            icon={icon}
            backgroundColor="#16A34A"
            iconColor="#ffffff"
          />
        )}
        <span className="mt-2 d-inline-flex">{children}</span>
      </p>
    </CardText>
  );
}

const CardText = styled.div`
  display: flex;
  align-items: center;
`;

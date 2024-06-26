import styled from "styled-components";
import Skeleton from "./components/Skeleton";
import { useEffect, useState } from "react";

const Base = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 12px;
  row-gap: 24px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
  border-radius: 4px;
`;

const ImageWrapper = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 24px;
`;

const Description = styled.p`
  margin: 8px 0 0 0;
  padding: 0;
  font-size: 16px;
`;

const PlaceHolder = () => {
  return (
    <Container>
      <ImageWrapper>
        <Skeleton width={320} height={320} />
      </ImageWrapper>
      <Info>
        <Skeleton width={150} height={29} rounded />
        <div style={{ height: "8px" }} />
        <Skeleton width={200} height={19} rounded />
      </Info>
    </Container>
  );
};

const Item = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg" />
      </ImageWrapper>
      <Info>
        <Title>Cat taking a nap</Title>
        <Description>zzzzzzzzzzzzzzzzzzzz</Description>
      </Info>
    </Container>
  );
};

function SkeletionApp() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Base>
      {loading
        ? Array.from({ length: 25 }).map((_, idx) => <PlaceHolder key={idx} />)
        : Array.from({ length: 25 }).map((_, idx) => <Item key={idx} />)}
    </Base>
  );
}

export default SkeletionApp;

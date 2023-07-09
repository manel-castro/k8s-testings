"use client";

import Link from "next/link";
import { Button } from "../../components/button.styled";
import { Container } from "../../components/container.styled";
import { Description, Title } from "./components/text.styled";

export const HeroSection = ({
  title1 = "Invest better",
  title2 = "togethesr",
  description = "Get investment ideas from 30M users and invest in 3,000+ assets on a trusted and friendly platform",
  button = "Start investing",
  buttonLink = "#",
  videoSrc = "//marketing.etorostatic.com/cache1/hp/v_251/videos/cover-hp-06.mp4",
}) => {
  return (
    <Container
      style={{
        backgroundColor: "#000021",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          padding: 15,

          zIndex: 2,
        }}
      >
        <Title $color="white">{title1}</Title>
        <Title style={{}} $color="white" $large>
          {title2}
        </Title>
        <Description style={{ marginTop: 20 }} $color="white">
          {description}
        </Description>
        <Link href={buttonLink}>
          <Button style={{ marginTop: 20 }}>{button}</Button>
        </Link>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          height: 300,
          width: "100%",
          zIndex: 1,
          backgroundImage:
            "linear-gradient(to bottom, transparent, #000021 50%)",
        }}
      >
        {" "}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          height: "100%",
        }}
      >
        <video
          data-poster="//marketing.etorostatic.com/cache1/hp/v_251/images/hp-2022/cover-hp-06.jpg"
          data-src="//marketing.etorostatic.com/cache1/hp/v_251/videos/cover-hp-06.mp4"
          data-ll-status="loaded"
          poster="//marketing.etorostatic.com/cache1/hp/v_251/images/hp-2022/cover-hp-06.jpg"
          src={videoSrc}
          style={{ height: "100%", objectFit: "cover" }}
        ></video>
      </div>
    </Container>
  );
};

import styled from "styled-components";

export const Container = styled.div<{ $large?: boolean; $color?: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  /* height: 100vh; */
`;

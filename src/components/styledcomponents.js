import styled from "styled-components";
export const TabScroll = styled.div`
  /* padding-left: 32px; */
  overflow-x: auto;
  overflow-y: hidden;
  height: fit-content;
  /* padding-top: 4px; */
  padding-bottom: 4px;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background: #f2f6f8;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #dde2e5;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #dde2e5;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
`;
export const TabsContainer = styled.div`
  /* margin-top: 12px; */
  /* margin-bottom: 12px; */
  --count: ${(props) => props.$count || 0};
  --active: ${(props) => props.$active || 0};
  width: 700px;
  --tab-width: 150px;
  display: grid;
  font-weight: 600;

  /* height: 50px; */
  padding-bottom: 1rem;
  /* border-bottom: solid 1px #c8cbd9; */
  grid-template-columns: repeat(var(--count), minmax(0, 1fr));
  position: relative;
  isolation: isolate;
  &::after {
    content: "";
    border-bottom: solid 3px #1c1d22;
    position: absolute;
    transition: all 0.2s ease-in-out;
    inset: 0;
    --width: calc(100% / var(--count));
    width: var(--width);
    border-radius: inherit;
    margin-left: calc(var(--active) * var(--width));
    z-index: -1;
  }
`;

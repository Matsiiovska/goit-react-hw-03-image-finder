import styled from "@emotion/styled";

export const GalleryItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
  /*border: 1px solid gray;
  border-radius: 2px;*/
`;
export const Img = styled.img`
 border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12); 
 width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
  transform: scale(1.03);
  cursor: zoom-in;
}
`;


